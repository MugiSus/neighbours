const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const resizeCanvas = (event) => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
};
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// const eventsQueue = [];
// const addQueueEvent = (event) => {
//     // event.preventDefault();
//     eventsQueue.push(event)
// };
// document.addEventListener('keydown', addQueueEvent);
// document.addEventListener('keyup', addQueueEvent);
// document.addEventListener('mousedown', addQueueEvent);
// document.addEventListener('mouseup', addQueueEvent);
// document.addEventListener('mousemove', addQueueEvent);
// document.addEventListener('wheel', addQueueEvent);

window.oncontextmenu = () => false;