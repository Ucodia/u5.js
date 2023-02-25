export default (sketch) => {
  sketch.setup = function () {
    sketch.createCanvas(500, 500);
    sketch.background("grey");
  };

  sketch.draw = function () {
    variableEllipse(
      sketch.mouseX,
      sketch.mouseY,
      sketch.pmouseX,
      sketch.pmouseY
    );
  };

  function variableEllipse(x, y, px, py) {
    let speed = Math.abs(x - px) + Math.abs(y - py);
    sketch.stroke(`rgb(${speed},${speed},${speed})`);
    sketch.ellipse(x, y, speed, speed);
  }
};
