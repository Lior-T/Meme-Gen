let imageSrc;
let gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }];
let currentColor = "rgb(100,20,20)";
let linesArray = [];
let gSquare
let gStartPos
let gLastPos = { x: null, y: null }
let gLastDiff
let isDrawing = false;
let drawLineSize = 2;
let gElCanvas, ctx, isMouseDown;
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
const elCanvas = document.querySelector('canvas')

var gMeme = {
  selectedImgId: 5,
  // selectedLineIdx: 0,
  lines: [
    {
      txt: 'First Line',
      size: 20,
      align: 'center',
      color: 'red',
      x: elCanvas.width / 2,
      y: 50,
      font: 'impact',
      isDrag: false
    },
    {
      txt: 'Second Line',
      size: 30,
      align: 'center',
      color: 'white',
      x: elCanvas.width / 2,
      y: elCanvas.height * 0.75,
      font: 'impact',
      isDrag: false
    }
  ]
}


function drawCanvas(src) {
  const [firstLine, secondLine] = gMeme.lines
  firstLine.y = firstLine.y || 50
  firstLine.x = firstLine.x || elCanvas.width / 2
  secondLine.y = secondLine.y || elCanvas.height * 0.75
  secondLine.x = secondLine.x || elCanvas.width / 2


  let bgImg = new Image();
  bgImg.src = src;
  bgImg.onload = () => {
    ctx.drawImage(bgImg, 0, 0, gElCanvas.width, gElCanvas.height);
    const [firstLine, secondLine] = gMeme.lines
    // firstLine
    ctx.font = `${firstLine.size}px Arial`;
    ctx.fillStyle = firstLine.color;
    ctx.textAlign = firstLine.align
    ctx.fillText(firstLine.txt, firstLine.x, firstLine.y)
    drawArc(firstLine)



    // secondLine
    ctx.font = `${secondLine.size}px Arial`;
    ctx.fillStyle = secondLine.color;
    ctx.textAlign = secondLine.align;
    ctx.fillText(secondLine.txt, secondLine.x, secondLine.y)
    drawArc(secondLine)


    addTouchListeners()
    addMouseListeners()
  }
}

function init() {
  const imgs = document.querySelectorAll('img')
  const body = document.querySelector('body')
  const gallery = document.querySelector('div.row')
  gElCanvas = document.querySelector('canvas.main')
  ctx = gElCanvas.getContext('2d')
  // resizeCanvas()



  imgs.forEach(img => {
    img.addEventListener('click', (event) => {
      gallery.style.display = 'none'
      gElCanvas.style.display = 'block'
      imageSrc = event.target.src

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
  store(x, y, s, c)

}

function onMouseUp() {
  isMouseDown = false
}

function onMouseMove(evt) {

  if (isMouseDown) {
    var { x, y } = getMousePos(evt);
    ctx.lineTo(x, y)
    ctx.stroke();
    .02

  }
}


function onDelete() {
  drawCanvas(imageSrc)
}

document.getElementById('colorpicker').addEventListener('change', function () {
  currentColor = this.value;
});
document.getElementById('clear').addEventListener('click', init);
document.getElementById('save').addEventListener('click', save);
document.getElementById('load').addEventListener('click', load);
document.getElementById('clear').addEventListener('click', function () {
  localStorage.removeItem("savedCanvas");
  linesArray = [];
  console.log("Cache cleared!");
});

// DOWNLOAD CANVAS

function downloadCanvas(event) {
  const link = event.target
  link.href = elCanvas.toDataURL('image/png');
  link.download = 'image.png';
}

// SAVE FUNCTION

function save() {
  // localStorage.removeItem("savedCanvas");
  localStorage.setItem("savedCanvas", JSON.stringify(linesArray));
  console.log("Saved canvas!");
}

// LOAD FUNCTION

function load() {
  if (localStorage.getItem("savedCanvas") != null) {
    linesArray = JSON.parse(localStorage.savedCanvas);
    var lines = JSON.parse(localStorage.getItem("savedCanvas"));
    for (var i = 1; i < lines.length; i++) {
      ctx.beginPath();
      ctx.moveTo(linesArray[i - 1].x, linesArray[i - 1].y);
      ctx.lineWidth = linesArray[i].size;
      ctx.lineCap = "round";
      ctx.strokeStyle = linesArray[i].color;
      ctx.lineTo(linesArray[i].x, linesArray[i].y);
      ctx.stroke();
    }
    console.log("Canvas loaded.");
  }
  else {
    console.log("No canvas in memory!");
  }
}







function redraw() {
  for (var i = 1; i < linesArray.length; i++) {
    ctx.beginPath();
    ctx.moveTo(linesArray[i - 1].x, linesArray[i - 1].y);
    ctx.lineWidth = linesArray[i].size;
    ctx.lineCap = "round";
    ctx.strokeStyle = linesArray[i].color;
    ctx.lineTo(linesArray[i].x, linesArray[i].y);
    ctx.stroke();
  }
  drawCanvas(imageSrc)
}
function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDownSquare)
  gElCanvas.addEventListener('mousemove', onMoveSquare)
  gElCanvas.addEventListener('mouseup', onUpSquare)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDownSquare)
  gElCanvas.addEventListener('touchmove', onMoveSquare)
  gElCanvas.addEventListener('touchend', onUpSquare)
}

function removeListeners() {
  gElCanvas.removeEventListener('mousedown', onDownSquare)
  gElCanvas.removeEventListener('mousemove', onMoveSquare)
  gElCanvas.removeEventListener('mouseup', onUpSquare)
  gElCanvas.removeEventListener('touchstart', onDownSquare)
  gElCanvas.removeEventListenerv('touchmove', onMoveSquare)
  gElCanvas.removeEventListener('touchend', onUpSquare)
}

function renderSquare() {
  //Get the props we need from the square
  const { pos, color, size } = getSquare()
  //Draw the square
  drawArc(pos.x, pos.y, size, color)
}


function onDownSquare(ev) {
  // console.log('Down')
  // Get the ev pos from mouse or touch
  const pos = getEvPos(ev)
  // console.log('pos', pos)
  const draggedLine = isSquareClicked(pos)
  if (!draggedLine) return

  setSquareDrag(true, draggedLine)
  //Save the pos we start from
  gStartPos = pos
  document.body.style.cursor = 'grabbing'
}

function isSquareClicked(clickedPos) {
  const [firstLine, secondLine] = gMeme.lines
  // Calc the distance between two dots
  // console.log('distance', distance)
  //If its smaller then the radius of the square we are inside
  if (clickedPos.x >= firstLine.x - firstLine.width / 2 && clickedPos.x <= firstLine.x + firstLine.width / 2 &&
    clickedPos.y >= firstLine.y - firstLine.height && clickedPos.y <= firstLine.y + firstLine.height) {
    return firstLine
  }
  if (clickedPos.x >= secondLine.x - secondLine.width / 2 && clickedPos.x <= secondLine.x + secondLine.width / 2 &&
    clickedPos.y >= secondLine.y - secondLine.height && clickedPos.y <= secondLine.y + secondLine.height) {
    return secondLine
  }
}
function onMoveSquare(ev) {
  const draggedLine = gMeme.lines.find(line => line.isDrag)
  console.log({ draggedLine })
  if (!draggedLine) return

  const pos = getEvPos(ev)
  // Calc the delta , the diff we moved
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  moveSquare(dx, dy, draggedLine)
  drawCanvas(imageSrc)
  // Save the last pos , we remember where we`ve been and move accordingly
  gStartPos = pos
}

function onUpSquare() {
  // console.log('Up')
  setSquareDrag(false)
  document.body.style.cursor = 'grab'
}
function setSquareDrag(isDrag, line) {
  if (isDrag) {
    line.isDrag = true
    return
  }
  gMeme.lines[0].isDrag = false
  gMeme.lines[1].isDrag = false
}
function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
}
function moveSquare(dx, dy, line) {
  console.log({ line })
  line.x += dx
  line.y += dy

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

function drawArc(line) {
  const { x, y, size = 60, color = 'black', txt } = line
  const body = document.querySelector('body')
  const textEl = document.createElement('div')
  textEl.style.fontFamily = "Arial"
  textEl.style.fontSize = `${size}px`
  textEl.style.visibility = "hidden"
  textEl.style.position = "absolute"
  textEl.innerText = txt
  body.appendChild(textEl)
  const { width, height } = textEl.getBoundingClientRect()
  body.removeChild(textEl)

  line.width = width
  line.height = height

  const padding = size / 2
  ctx.beginPath()
  ctx.lineWidth = '6'
  ctx.rect(x - (width + padding) / 2, y - height / 1.5, width + padding, height)
  ctx.strokeStyle = 'white'
  ctx.stroke()
  ctx.fillStyle = 'transparent'
  ctx.fill()
}

function store(x, y, s, c) {
  var line = {
    "x": x,
    "y": y,
    "size": s,
    "color": c
  }
  linesArray.push(line);
}
function getSquare() {
  return gSquare
}
