const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const resizeCanvas = () => {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * ratio;
  canvas.height = canvas.clientHeight * ratio;
  ctx.scale(ratio, ratio);
};
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// const eventsQueue = [];
// const pushEventsQueue = (event) => {
//     // event.preventDefault();
//     eventsQueue.push(event)
// };
// document.addEventListener('keydown', pushEventsQueue);
// document.addEventListener('keyup', pushEventsQueue);
// document.addEventListener('mousedown', pushEventsQueue);
// document.addEventListener('mouseup', pushEventsQueue);
// document.addEventListener('mousemove', pushEventsQueue);
// document.addEventListener('wheel', pushEventsQueue);

window.oncontextmenu = () => false;
