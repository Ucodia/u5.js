export default function u5(sketch, element) {
  sketch(this);

  // internal state

  let frameHandle = null;
  let hasMouseMoved = false;
  let hasSetupRun = false;
  let isLooping = false;
  const pixelDensity = Math.ceil(window.devicePixelRatio) || 1;

  // default settings

  this.container = element;
  this.canvas = null;
  this.context = null;
  this.width = 0;
  this.height = 0;
  this.windowWidth = window.innerWidth;
  this.windowHeight = window.innerHeight;
  this.mouseIsPressed = false;
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
    this.canvas.width = this.width * pixelDensity;
    this.canvas.height = this.height * pixelDensity;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.context = this.canvas.getContext("2d");
    this.context.scale(pixelDensity, pixelDensity);
    this.container.append(this.canvas);

    // default styling
    this.fill("white");
    this.stroke("black");

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("dblclick", handleDoubleClick);
  };

  this.resizeCanvas = function (width, height) {
    const fillStyle = this.context.fillStyle;
    const strokeStyle = this.context.strokeStyle;

    this.width = width;
    this.height = height;
    this.canvas.width = this.width * pixelDensity;
    this.canvas.height = this.height * pixelDensity;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.context.scale(pixelDensity, pixelDensity);

    this.fill(fillStyle);
    this.stroke(strokeStyle);
  };

  // structure

  this.loop = function () {
    isLooping = true;
    if (hasSetupRun) {
      animate();
    }
  };

  this.noLoop = function () {
    isLooping = false;
  };

  // transforms

  this.rotate = function (r) {
    this.context.rotate(r);
  };

  this.translate = function (x, y) {
    this.context.translate(x, y);
  };

  this.scale = function (x, y) {
    y = y || x;
    this.context.scale(x, y);
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

  this.strokeWeight = function (weight) {
    if (weight <= 0) {
      this.noStroke();
    } else {
      this.context.lineWidth = weight;
    }
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

  this.ellipse = function (x, y, w, h) {
    h = h || w;
    this.context.beginPath();
    this.context.ellipse(x, y, w / 2, h / 2, 0, 0, 2 * Math.PI);
    this.context.fill();
    this.context.stroke();
  };

  this.circle = function (x, y, d) {
    this.ellipse(x, y, d, d);
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

  const handleMouseDown = (e) => {
    this.mouseIsPressed = true;

    if (typeof this.mousePressed === "function") {
      this.mousePressed(e);
    }
  };

  const handleMouseUp = (e) => {
    this.mouseIsPressed = false;

    if (typeof this.mouseReleased === "function") {
      this.mouseReleased(e);
    }
  };

  const handleDoubleClick = (e) => {
    if (typeof this.doubleClicked === "function") {
      this.doubleClicked(e);
    }
  };

  this.remove = function () {
    if (!this.canvas) {
      return;
    }

    window.cancelAnimationFrame(frameHandle);
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mousedown", handleMouseDown);
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("dblclick", handleDoubleClick);
    this.canvas.remove();
  };

  // animation

  this.frameRate = function (fps) {
    this.fps = fps;
  };

  // initialization

  if (typeof this.setup !== "function") {
    return;
  }
  if (typeof this.draw === "function") {
    isLooping = true;
  }

  this.setup();
  hasSetupRun = true;

  let then = performance.now();
  const animate = () => {
    if (!isLooping) {
      return;
    }

    frameHandle = window.requestAnimationFrame(animate);
    const now = performance.now();
    this.deltaTime = now - then;
    const interval = 1000 / this.fps;
    if (this.deltaTime > interval) {
      then = now - (this.deltaTime % interval);
      this.frameCount++;

      this.context.save();
      this.draw();
      this.context.restore();

      this.pmouseX = this.mouseX;
      this.pmouseY = this.mouseY;
    }
  };
  animate();
}
