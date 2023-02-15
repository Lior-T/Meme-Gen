



function init() {
  var imgs = document.querySelectorAll('img')
  console.log(imgs)
  imgs.forEach(img => {
    console.log("1")

    img.addEventListener('click', (event) => {
      console.log("1")
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

onclick = (event) => { };
function drawImg() {
  const elImg = document.querySelector('img')
  // Naive approach:
  // there is a risk that image is not loaded yet and nothing will be drawn on canvas
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height) // Draws the specified image
}


init()