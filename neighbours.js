const url = new URL(window.location.href);
let areInfomationsEnabled = url.searchParams.get('infos') == 'true';
let isParticleAdditionEnabled = true;

let particles = [];
let divisionBlocks = {};
let neighboursRange = url.searchParams.get('range') * 1 || 150;
let equilibrium = 0.8;
let repulsionFactor = 0.2;
let attractionFactor = 0.2;

let neighbourTestCount = 0;

class Particle {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    update(ctx) {
        this.x += this.vx;
        this.y += this.vy;
        this.draw(ctx);
        
        let [blockX, blockY] = [
            Math.trunc(this.x / neighboursRange) - (this.x / neighboursRange % 1 < 0.5),
            Math.trunc(this.y / neighboursRange) - (this.y / neighboursRange % 1 < 0.5)
        ];
        
        new Set([
            ...addParticleInDivisionBlock(blockX, blockY, this),
            ...addParticleInDivisionBlock(blockX + 1, blockY, this),
            ...addParticleInDivisionBlock(blockX, blockY + 1, this),
            ...addParticleInDivisionBlock(blockX + 1, blockY + 1, this)
        ]).forEach(particle => {
            if (particle == this) return;
            neighbourTestCount++;
            let distance = ((this.x - particle.x) ** 2 + (this.y - particle.y) ** 2) ** 0.5 / neighboursRange;
            if (distance < 1) {
                ctx.globalAlpha = 1 - distance;
                ctx.lineWidth = distance ** 2 + 1;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(particle.x, particle.y);
                ctx.stroke();
                
                if (attractionFactor != 0 || repulsionFactor != 0) {
                    let direction = Math.atan2(particle.y - this.y, particle.x - this.x);
                    let strength = equilibrium > distance ? (equilibrium - distance) * -repulsionFactor : (distance - equilibrium) * attractionFactor;
                    this.vx += Math.cos(direction) * strength;
                    this.vy += Math.sin(direction) * strength;
                    particle.vx += Math.cos(direction) * -strength;
                    particle.vy += Math.sin(direction) * -strength;
                }

                ctx.globalAlpha = 1;
            }
        });
        
        return this.x > -neighboursRange && this.x < canvas.width + neighboursRange && this.y > -neighboursRange && this.y < canvas.height + neighboursRange;
    }
}

function addParticleInDivisionBlock(x, y, particle) {
    ((divisionBlocks[x] ??= {})[y] ??= []).push(particle);
    return divisionBlocks[x][y];
}

function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    neighbourTestCount = 0;
    divisionBlocks = {};
}

function updateParticles() {
    ctx.lineWidth = 1;
    ctx.fillStyle = '#ffffff66';
    ctx.strokeStyle = '#ffffff';
    ctx.globalAlpha = 1;
    particles = particles.filter(particle => particle.update(ctx));
}

function addParticlesRandomly() {
    if (Math.random() < 0.25) {
        let speed = Math.random() * 1.5 + 0.5;
        let rad = Math.random() * Math.PI * 2;
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, speed * Math.cos(rad), speed * Math.sin(rad)));
    }
}

function showDivisionInformations() {
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = '400 30px Inconsolata';
    for (let x in divisionBlocks) {
        for (let y in divisionBlocks[x]) {
            ctx.globalAlpha = divisionBlocks[x][y].length / 20 * 0.1;
            ctx.fillRect(x * neighboursRange, y * neighboursRange, neighboursRange, neighboursRange);
            ctx.globalAlpha = 0.08;
            ctx.fillText(divisionBlocks[x][y].length, (x * 1 + 0.5) * neighboursRange, (y * 1 + 0.5) * neighboursRange + 10);
        }
    }
}

function main() {
    reset();
    
    updateParticles();
    if (isParticleAdditionEnabled) addParticlesRandomly();
    if (areInfomationsEnabled) showDivisionInformations();

    updateSimulationInfos(); // user-input.js

    requestAnimationFrame(main);
}

ctx.globalCompositeOperation = "lighter";

main();