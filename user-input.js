[...document.getElementsByClassName('slider-container')].forEach(container => {
    container.getElementsByClassName("slider-value")[0].textContent = container.dataset.value;
    container.getElementsByClassName("slider-bar")[0].style.width = `${(container.dataset.value - container.dataset.min) / (container.dataset.max - container.dataset.min) * 100}%`;

    let eventFunction = (event) => {
        if (event.buttons == 1) {
            let ratio = event.offsetX / (event.currentTarget.offsetWidth - 1);
            let value = Math.round((ratio * (container.dataset.max - container.dataset.min) + container.dataset.min * 1) / container.dataset.step) * container.dataset.step;
            container.dataset.value = container.dataset.toFixed ? value.toFixed(container.dataset.toFixed) : value;
            container.getElementsByClassName("slider-value")[0].textContent = container.dataset.value;
            container.getElementsByClassName("slider-bar")[0].style.width = `${(container.dataset.value - container.dataset.min) / (container.dataset.max - container.dataset.min) * 100}%`;
            
            switch (container.id) {
                case "neighbours-range-slider-container": 
                    neighboursRange = value;
                    break;
                case "attraction-factor-slider-container":
                    attractionFactor = value;
                    break;
                case "repulsion-factor-slider-container":
                    repulsionFactor = value;
                    break;
                case "equilibrium-distance-slider-container":
                    equilibriumDistance = value;
                    break;
                case "particles-per-frame-slider-container":
                    particlesPerFrame = value;
                    break;
            }
        }
    }

    container.addEventListener("mousedown", eventFunction);
    container.addEventListener("mousemove", eventFunction);
})

document.getElementById('show-division-infos-container').addEventListener("mouseup", (event) => {
    areInfomationsEnabled ^= true;
    document.getElementById('show-division-infos-text').textContent = areInfomationsEnabled ? 'Hide division infos' : 'Show division infos';
});

let timeStamps = new Array();

function getFPS(frames) {
    let now = performance.now();
    timeStamps.push(now);
    if (timeStamps.length > frames)
        return 1000 / ((now - timeStamps.shift()) / frames);
    return 0;
}

function updateSimulationInfos() {
    document.getElementById('fps-value').textContent = getFPS(8).toFixed(3);
    document.getElementById('particles-value').textContent = particles.length;
    document.getElementById('neighbour-tested-value').textContent = neighbourTestCount;
}