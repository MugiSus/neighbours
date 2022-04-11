let particles = [];
let divisionBlocks = {};
let neigbours = 150; // neibours distance

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
        addParticleInDivisionBlock(Math.round(this.x / neigbours), Math.round(this.y / neigbours), this);
        return this.x > -neigbours && this.x < canvas.width + neigbours && this.y > -neigbours && this.y < canvas.height + neigbours;
    }
}

function addParticleInDivisionBlock(x, y, particle) {
    (divisionBlocks[x] ?? {})[y] = particle;
}

function updateParticles() {
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = 1;
    particles = particles.filter(particle => particle.update(ctx));
}

function lineNeighbourParticles() {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    particles.forEach(particle => {
        particles.forEach(particle2 => {
            if (particle !== particle2) {
                let distance = ((particle.x - particle2.x) ** 2 + (particle.y - particle2.y) ** 2) ** 0.5;
                if (distance < neigbours) {
                    ctx.globalAlpha = 1 - distance / neigbours;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particle2.x, particle2.y);
                    ctx.stroke();
                }
            }
        });
    });
    divisionBlocks = {};
}

function addParticlesRandomly() {
    if (Math.random() < 0.2) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 4 - 2, Math.random() * 4 - 2));
    }
}

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateParticles();
    lineNeighbourParticles();
    addParticlesRandomly();
    requestAnimationFrame(main);
}

main();