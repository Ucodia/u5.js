export default (sketch) => {
  let t = 0;

  sketch.setup = function () {
    sketch.createCanvas(500, 500);
  };

  sketch.draw = function () {
    sketch.background("white");
    sketch.translate(sketch.width / 2, sketch.height / 2);
    sketch.stroke("darkgrey");
    sketch.strokeWeight(3);
    for (let i = 0; i < 100; i++) {
      sketch.line(x1(t + i), y1(t + i), x2(t + i) + 20, y2(t + i) + 20);
    }
    t += 0.15;
  };

  function x1(t) {
    return (
      Math.sin(t / 10) * 50 + Math.sin(t / 20) * 50 + Math.sin(t / 30) * 50
    );
  }

  function y1(t) {
    return (
      Math.cos(t / 10) * 50 + Math.cos(t / 20) * 50 + Math.cos(t / 30) * 50
    );
  }

  function x2(t) {
    return (
      Math.sin(t / 15) * 50 + Math.sin(t / 25) * 50 + Math.sin(t / 35) * 50
    );
  }

  function y2(t) {
    return (
      Math.cos(t / 15) * 50 + Math.cos(t / 25) * 50 + Math.cos(t / 35) * 50
    );
  }
};
