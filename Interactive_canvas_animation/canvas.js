var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')
// c.fillStyle = 'rgb(255, 0, 0, .5)'
// c.fillRect(53, 53, 50, 50)
// c.fillStyle = 'rgb(0, 255, 0, .5)'
// c.fillRect(60, 60, 50, 50)
// c.fillStyle = 'rgb(0, 0, 255, .5)'
// c.fillRect(65, 65, 50, 50)

// // line

// c.moveTo(300, 50)
// c.lineTo(50, 60)
// c.strokeStyle = 'blue'
// c.stroke()

// for (var i = 0; i < 100; i++) {
//   var x = Math.random() * window.innerWidth
//   var y = Math.random() * window.innerHeight
//   var z = Math.random()*50
//   c.beginPath()
//   c.arc(x, y, 30, 0, Math.PI * 2, false)
//   c.strokeStyle = 'rgb(60, 50, 70)'
//   c.stroke()
// }
var maxRadius = 40
var mouse = {
  x: undefined,
  y: undefined
}
var colorArray = [
  '#008275',
  '#04BDAF',
  '#F2D984',
  '#F28C29',
  '#F25A38'
]

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x
  mouse.y = event.y
})

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  init()
})
function Circle (x, y, dx, dy, radius) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius
  this.minRadius = radius
  this.color = colorArray[Math.floor((Math.random() * colorArray.length))]
  this.draw = function () {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }
  this.update = function () {
    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx
    }
    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy
    }
    this.x += this.dx
    this.y += this.dy

    // interact
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < maxRadius) {
        this.radius += 1
      }
}
    else if (this.radius > this.minRadius) {
      this.radius -= 1
    }

    this.draw()
  }
}
var circleArray = []
function init () {
  circleArray = []
  for (var i = 0; i < 1000; i++) {
    var radius = Math.random() * 5 + 1
    var x = Math.random() * (window.innerWidth - radius * 2) + radius
    var y = Math.random() * (window.innerHeight - radius * 2) + radius
    var dx = (Math.random() - 0.5) * 5
    var dy = (Math.random() - 0.5) * 5
    circleArray.push(new Circle(x, y, dx, dy, radius))
  }
}

function animate () {
  window.requestAnimationFrame(animate)
  c.clearRect(0, 0, window.innerWidth, window.innerHeight)
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update()
  }
}
animate()
init()
