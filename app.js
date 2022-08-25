const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll("#jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");
const destroyBtn = document.querySelector("#jsDestroy");
const eraseBtn = document.querySelector("#jsErase");
const fileInput = document.querySelector("#file");

canvas.width = 600;
canvas.height = 600;

const CANVAS_SIZE = 600;

ctx.lineWidth = 2.5;
//초기값
let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(){
  if(filling === true){
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
  }
}

function handleCM(event){
  event.preventDefault();
}

function handleSaveClick(){
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "paintJS[🎨]";
  link.click();
}

function handleDestroyClick(){
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
}

function handleEraseClick(){
  ctx.strokeStyle = "white";
  filling = false;
  mode.innerText = "FILL";
}

function handleFileChange(event){
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function(){
  ctx.drawImage(image,0,0,CANVAS_SIZE,CANVAS_SIZE);
  fileInput.value = null;
  };
}


if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click",handleCanvasClick);
  canvas.addEventListener("contextmenu",handleCM);
}

colors.forEach(color => color.addEventListener("click",handleColorClick));
range.addEventListener("input",handleRangeChange);
mode.addEventListener("click",handleModeClick);
saveBtn.addEventListener("click",handleSaveClick);
destroyBtn.addEventListener("click", handleDestroyClick);
eraseBtn.addEventListener("click", handleEraseClick);
fileInput.addEventListener("change", handleFileChange);