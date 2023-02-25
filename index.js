export default function u5(sketch, element) {
  sketch(this);

  // internal state

  let hasMouseMoved = false;

  // default settings

  this.container = element;
  this.canvas = null;
  this.context = null;
  this.width = 0;
  this.height = 0;
  this.windowWidth = window.innerWidth;
  this.windowHeight = window.innerHeight;
  this.mouseX = 0;
  this.pmouseX = 0;
  this.mouseY = 0;
  this.pmouseY = 0;
  this.fps = 60;
  this.frameCount = 0;
  this.deltaTime = 0;

  // DOM

  this.createCanvas = function (width = 100, height = 100) {
    this.width = width;
    this.height = height;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d");
    this.container.append(this.canvas);

    // default styling
    this.fill("white");
    this.stroke("black");

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
  };

  this.resizeCanvas = function (width, height) {
    const fillStyle = this.context.fillStyle;
    const strokeStyle = this.context.strokeStyle;

    this.width = width;
    this.height = height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.fill(fillStyle);
    this.stroke(strokeStyle);
  };

  // drawing

  this.clear = function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  this.background = function (color) {
    const fillStyle = this.context.fillStyle;
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.width, this.height);
    this.fill(fillStyle);
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

  this.square = function (x, y, w) {
    this.rect(x, y, w, w);
  };

  this.ellipse = function (x, y, rx, ry) {
    ry = ry || rx;
    this.context.beginPath();
    this.context.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
    this.context.fill();
    this.context.stroke();
  };

  this.circle = function (x, y, r) {
    this.ellipse(x, y, r, r);
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

  this.QUARTER_PI = Math.PI / 4;
  this.HALF_PI = Math.PI / 2;
  this.PI = Math.PI;
  this.TWO_PI = Math.PI * 2;
  this.TAU = this.TWO_PI;

  this.map = function (n, start1, stop1, start2, stop2) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  };

  this.constrain = function (n, low, high) {
    return Math.min(Math.max(n, low), high);
  };

  // window events

  const handleResize = (e) => {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    if (typeof this.windowResized === "function") {
      this.windowResized(e);
    }
  };

  const handleMouseMove = (e) => {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;

    if (!hasMouseMoved) {
      hasMouseMoved = true;
      this.pmouseX = this.mouseX;
      this.pmouseY = this.mouseY;
    }

    if (typeof this.mouseMoved === "function") {
      this.mouseMoved(e);
    }
  };

  this.remove = function () {
    if (!this.canvas) {
      return;
    }

    window.removeEventListener("resize", handleResize);
    window.removeEventListener("mousemove", handleMouseMove);
    this.canvas.remove();
  };

  // animation

  this.frameRate = function (fps) {
    this.fps = fps;
  };

  this.setup();

  let then = performance.now();
  const animate = () => {
    window.requestAnimationFrame(animate);
    const now = performance.now();
    this.deltaTime = now - then;
    const interval = 1000 / this.fps;
    if (this.deltaTime > interval) {
      then = now - (this.deltaTime % interval);
      this.frameCount++;
      this.draw();
      this.pmouseX = this.mouseX;
      this.pmouseY = this.mouseY;
    }
  };
  animate();
}
