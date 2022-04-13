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
            
            console.log(container.id);
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

document.getElementById('infos-close-container').addEventListener("mouseup", (event) => {
    document.getElementById('simulation-infos-container').removeAttribute("open");
});

function updateSimulationInfos() {
    document.getElementById('particles-value').textContent = particles.length;
    document.getElementById('neighbour-tested-value').textContent = neighbourTestCount;
}