document.getElementById('particles')

function updateSimulationInfos() {
    document.getElementById('particles').textContent = particles.length;
    document.getElementById('neighbour-tested').textContent = neighbourTestCount;
}