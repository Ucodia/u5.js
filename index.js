export default function (sketch, element) {
  sketch(this);

  // default settings

  this.container = element;
  this.canvas = null;
  this.context = null;
  this.width = 0;
  this.height = 0;
  this.fps = 60;
  this.frameCount = 0;

  // DOM

  this.createCanvas = function (width = 100, height = 100) {
    this.width = width;
    this.height = height;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d");
    this.container.append(this.canvas);
  };

  this.remove = function () {
    if (this.canvas) {
      this.canvas.remove();
    }
  };

  // drawing

  this.clear = function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  this.background = function (color) {
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.width, this.height);
  };

  this.stroke = function (color) {
    this.context.strokeStyle = color;
  };

  this.noStroke = function () {
    this.stroke("transparent");
  };

  this.fill = function (color) {
    this.context.fillStyle = color;
  };

  this.noFill = function () {
    this.fill("transparent");
  };

  this.rect = function (x, y, w, h) {
    this.context.fillRect(x, y, w, h);
    this.context.strokeRect(x, y, w, h);
  };

  this.ellipse = function (x, y, rx, ry) {
    ry = ry || rx;
    this.context.beginPath();
    this.context.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
    this.context.fill();
    this.context.stroke();
  };

  this.line = function (x1, y1, x2, y2) {
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
  };

  this.triangle = function (x1, y1, x2, y2, x3, y3) {
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.lineTo(x3, y3);
    this.context.closePath();
    this.context.fill();
    this.context.stroke();
  };

  // math

  this.PI = Math.PI;

  this.TWO_PI = Math.PI * 2;

  this.map = function (n, start1, stop1, start2, stop2) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  };

  this.constrain = function (n, low, high) {
    return Math.min(Math.max(n, low), high);
  };

  // animation

  this.frameRate = function (fps) {
    this.fps = fps;
  };

  this.setup();

  let then = performance.now();
  const animate = () => {
    requestAnimationFrame(animate);
    const now = performance.now();
    const deltaTime = now - then;
    const interval = 1000 / this.fps;
    if (deltaTime > interval) {
      then = now - (deltaTime % interval);
      this.frameCount++;
      this.draw();
    }
  };
  animate();
}