export default (sketch) => {
  let y = 100;

  sketch.setup = function () {
    sketch.createCanvas(500, 500);
    sketch.stroke("white");
    sketch.frameRate(30);
  };

  sketch.draw = function () {
    sketch.background("black");
    y = y - 1;
    if (y < 0) {
      y = sketch.height;
    }
    sketch.line(0, y, sketch.width, y);
  };
};
