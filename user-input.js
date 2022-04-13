document.getElementById('neighbours-range-container').addEventListener("mousemove", function (event) {
    if (event.buttons == 1) {
        let mouseRatio = event.offsetX / (event.currentTarget.offsetWidth - 1);
        neighboursRange = 40 + Math.round(mouseRatio * 360);
        document.getElementById('neighbours-range-value').textContent = neighboursRange;
        document.querySelector('#neighbours-range-container .range-bar').style.width = mouseRatio * 100 + '%';
    }
});

document.getElementById('show-division-infos-container').addEventListener("mouseup", function (event) {
    areInfomationsEnabled ^= true;
    document.getElementById('show-division-infos-text').textContent = areInfomationsEnabled ? 'Hide division infos' : 'Show division infos';
});

function updateSimulationInfos() {
    document.getElementById('particles-value').textContent = particles.length;
    document.getElementById('neighbour-tested-value').textContent = neighbourTestCount;
}