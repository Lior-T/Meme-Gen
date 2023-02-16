let imageSrc;
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }];

let gLastPos = { x: null, y: null }
let gIsDrag
let gLastDiff
let isDrawing = false;
let drawLineSize = 2;
let gElCanvas, ctx, isMouseDown;
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

var gMeme = {
  selectedImgId: 5,
  // selectedLineIdx: 0,
  lines: [
    {
      txt: 'First Line',
      size: 20,
      align: 'center',
      color: 'red'
    },
    {
      txt: 'Second Line',
      size: 30,
      align: 'center',
      color: 'white'
    }
  ]
}


function drawCanvas(src) {

  let bgImg = new Image();
  bgImg.src = src;
  bgImg.onload = () => {
    ctx.drawImage(bgImg, 0, 0, gElCanvas.width, gElCanvas.height);
    const [firstLine, secondLine] = gMeme.lines

    // firstLine
    ctx.font = `${firstLine.size}px Arial`;
    ctx.fillStyle = firstLine.color;
    ctx.textAlign = firstLine.align;
    ctx.fillText(firstLine.txt, gElCanvas.width / 2, 50)

    // secondLine
    ctx.font = `${secondLine.size}px Arial`;
    ctx.fillStyle = secondLine.color;
    ctx.textAlign = secondLine.align;
    ctx.fillText(secondLine.txt, gElCanvas.width / 2, gElCanvas.height / 4 * 3)
  }
}

function init() {
  const imgs = document.querySelectorAll('img')
  const body = document.querySelector('body')
  const gallery = document.querySelector('div.row')
  gElCanvas = document.querySelector('canvas.main')
  ctx = gElCanvas.getContext('2d')

  imgs.forEach(img => {
    img.addEventListener('click', (event) => {
      gallery.style.display = 'none'
      gElCanvas.style.display = 'block'
      imageSrc = event.target.src
      const callback = () => {
        // const textEl = document.createElement('div')
        // textEl.style.fontFamily = "Arial"
        // textEl.style.fontSize = "30px"
        // textEl.style.visibility = "hidden"
        // textEl.style.position = "absolute"
        // textEl.innerText = "First line"
        // body.appendChild(textEl)
        // const { width, height } = textEl.getBoundingClientRect()
        // body.removeChild(textEl)


        // context.beginPath();
        // context.rect(94, 20, width, height);
        // context.stroke();
      }
      drawCanvas(imageSrc)
    });
  });
  //  document.querySelector('.main-canvas').onchange = function (e) {
  //   const img = new Image() // Create a new html img element
  //   img.src = imgs// Send a network req to get that image, define the img src
  //   // When the image ready draw it on the canvas
  //   img.onload = () => {
  //     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  //   }
  // }
}


const onTextChange = (event) => {
  gMeme.lines[event.target.name === "firstLine" ? 0 : 1].txt = event.target.value
  drawCanvas(imageSrc)
}

onclick = (event) => { };

init()

function setAlign(value) {
  // var btnTextRight = document.querySelector('.bi.bi-text-right')
  // btnTextRight
  console.log(value)
  gMeme.lines[0].align = value
  gMeme.lines[1].align = value
  drawCanvas(imageSrc)
}

function SizeTextUp(value) {
  gMeme.lines[0].size++
  gMeme.lines[1].size++
  drawCanvas(imageSrc)

}

function SizeTextDown(value) {
  gMeme.lines[0].size--
  gMeme.lines[1].size--
  drawCanvas(imageSrc)

}


function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
}
function toggleDraw() {
  const drawingIcon = document.querySelector(".draw-btn")
  drawingIcon.classList.toggle('active')
  isDrawing = !isDrawing
  if (isDrawing) {
    gElCanvas.addEventListener('mousedown', onMouseDown)
    gElCanvas.addEventListener('mousemove', onMouseMove)
    gElCanvas.addEventListener('mouseup', onMouseUp)
  } else {
    gElCanvas.removeEventListener('mousedown', onMouseDown)
    gElCanvas.removeEventListener('mousemove', onMouseMove)
    gElCanvas.removeEventListener('mouseup', onMouseUp)
  }
}

function getMousePos(evt) {
  var rect = gElCanvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function onMouseDown(evt) {
  var mousePos = getMousePos(evt);
  isMouseDown = true
  var currentPosition = getMousePos(gElCanvas, evt);
  ctx.moveTo(currentPosition.x, currentPosition.y)
  ctx.beginPath();
  ctx.lineWidth = drawLineSize;
  ctx.lineCap = "round";
  ctx.strokeStyle = currentColor;

}

function onMouseUp() {
  isMouseDown = false
}

function onMouseMove(evt) {

  if (isMouseDown) {
    var currentPosition = getMousePos(evt);
    ctx.lineTo(currentPosition.x, currentPosition.y)
    ctx.stroke();
  }
}