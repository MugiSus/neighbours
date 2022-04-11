let particles = [];
let divisionBlocks = {};
let neigboursDistance = 150; // neibours distance

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
            Math.trunc(this.x / (neigboursDistance * 2)) - (this.x / (neigboursDistance * 2) % 1 < 0.5),
            Math.trunc(this.y / (neigboursDistance * 2)) - (this.y / (neigboursDistance * 2) % 1 < 0.5)
        ];
        
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        new Set([
            ...addParticleInDivisionBlock(blockX, blockY, this),
            ...addParticleInDivisionBlock(blockX + 1, blockY, this),
            ...addParticleInDivisionBlock(blockX, blockY + 1, this),
            ...addParticleInDivisionBlock(blockX + 1, blockY + 1, this)
        ]).forEach(particle => {
            if (particle == this) return;

            let distance = ((this.x - particle.x) ** 2 + (this.y - particle.y) ** 2) ** 0.5;
            if (distance < neigboursDistance) {
                ctx.globalAlpha = 1 - distance / neigboursDistance;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(particle.x, particle.y);
                ctx.stroke();
            }
        });
        ctx.globalAlpha = 1;

        return this.x > -neigboursDistance && this.x < canvas.width + neigboursDistance && this.y > -neigboursDistance && this.y < canvas.height + neigboursDistance;
    }
}

function addParticleInDivisionBlock(x, y, particle) {
    ((divisionBlocks[x] ??= {})[y] ??= []).push(particle);
    return divisionBlocks[x][y];
}

function updateParticles() {
    divisionBlocks = {};
    ctx.fillStyle = '#ffffff88';
    particles = particles.filter(particle => particle.update(ctx));
}

function lineNeighbourParticles() {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    particles.forEach(particle => {
        particle.neigbours = 0;
        particles.forEach(particle2 => {
            if (particle !== particle2) {
                let distance = ((particle.x - particle2.x) ** 2 + (particle.y - particle2.y) ** 2) ** 0.5;
                if (distance < neigboursDistance) {
                    ctx.globalAlpha = 1 - distance / neigboursDistance;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particle2.x, particle2.y);
                    ctx.stroke();
                    particle.neigbours++;
                }
            }
        });
    });
    ctx.globalAlpha = 1;
}

function addParticlesRandomly() {
    if (Math.random() < 0.2) {
        let speed = Math.random() * 2 + 0.5;
        let rad = Math.random() * Math.PI * 2;
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, speed * Math.cos(rad), speed * Math.sin(rad)));
    }
}

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateParticles();
    // lineNeighbourParticles();
    addParticlesRandomly();
    requestAnimationFrame(main);
}

ctx.globalCompositeOperation = "lighter";
main();