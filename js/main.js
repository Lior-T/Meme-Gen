let imageSrc;
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }];

let gLastPos = { x: null, y: null }
let gIsDrag
let gLastDiff
let isDrawing = false;
let gElCanvas, ctx, isMouseDown;
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']



function addListeners() {
  addMouseListeners()
  addTouchListeners()
  //Listen for resize ev
  window.addEventListener('resize', () => {
    resizeCanvas()
  })
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
}

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
  ctx.lineWidth = currentSize;
  ctx.lineCap = "round";
  ctx.strokeStyle = currentColor;

}

function onMouseUp() {
  isMouseDown = false
  // store()
}


function onMouseMove(evt) {

  if (isMouseDown) {
    var currentPosition = getMousePos(evt);
    ctx.lineTo(currentPosition.x, currentPosition.y)
    ctx.stroke();
    // store(currentPosition.x, currentPosition.y, currentSize, currentColor);
  }
}



function getEvPos(ev) {
  // Gets the offset pos , the default pos
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  // Check if its a touch ev
  if (TOUCH_EVS.includes(ev.type)) {
    //soo we will not trigger the mouse ev
    ev.preventDefault()
    //Gets the first touch point
    ev = ev.changedTouches[0]
    //Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}

function onDown(ev) {
  console.log('Down')
  // Get the ev pos from mouse or touch
  const pos = getEvPos(ev)
  // console.log('pos', pos)
  gIsDrag = true
  //Save the pos we start from
  // gStartPos = pos
  document.body.style.cursor = 'grabbing'
  gLastPos = pos
}

function onMove(ev) {
  // console.log('move')
  // console.log('ev',ev)
  if (!isDrawing) return
  const diff = Math.abs(ev.movementX) > Math.abs(ev.movementY) ? Math.abs(ev.movementX) : Math.abs(ev.movementY)
  let size = 10 * diff
  if (size > 100) size = 100
  if (size < 10) size = 10

  const pos = getEvPos(ev)

  // Save the last pos , we remember where we`ve been and move accordingly
  // gStartPos = pos
  // console.log('pos',pos)
  const { x, y } = pos
  //set color
  const color = gColor
  // The draw shape again in every move to new pos
  drawShape(x, y, size, color, diff)
  gLastPos = pos
  gLastDiff = diff
}

function onUp() {
  console.log('Up')
  gIsDrag = false
  document.body.style.cursor = 'grab'
}

function drawShape(x, y, size, color, diff) {

  drawLine(x, y, size, color, diff)

}
