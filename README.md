[![npm version](https://badge.fury.io/js/u5js.svg)](https://badge.fury.io/js/u5js)

# u5.js

u5.js is a minimalist and lightweight canvas animation library. Its API is essentially a stripped down version of the popular [p5.js](https://github.com/processing/p5.js) library which focuses on 2D canvas animation.

## Why does this library exists?

I have been using and loving p5.js since 2014, it is all over my website [ucodia.space](https://ucodia.space), including the home page. Though the p5.js library was never built to be tree-shakeable and is now over 800KB, which is very large if all you need is to animate simple primitives.

There is an [exisiting issue](https://github.com/processing/p5.js/issues/5740) in the p5.js GitHub repository, though it seems the way the library is built makes it impossible to enable tree-shaking while remaining backward compatible.

As such I have decided to give a try at building a library with the same API which focuses only on 2D canvas animation.

## Feature support

### Environment

- `frameCount`
- `deltaTime`
- `frameRate()`
- `windowWidth`
- `windowHeight`
- `windowResized()`
- `width`
- `height`

### Color - Setting

- `background()`
- `clear()`
- `fill()`
- `noFill()`
- `noStroke()`
- `stroke()`

### Shape - 2D primitives

- `circle()`
- `ellipse()`
- `line()`
- `rect()`
- `square()`
- `triangle()`

### Constants

- `HALF_PI`
- `PI`
- `QUARTER_PI`
- `TAU`
- `TWO_PI`

### Structure

- `setup()`
- `draw()`
- `remove()`
- `u5()`

### Rendering

- `createCanvas()`
- `resizeCanvas()`

### Events - Mouse

- `mouseX`
- `mouseY`
- `pmouseX`
- `pmouseY`
- `mouseMoved()`

### Math

- `map()`
- `constrain()`

## Planned new features

- Auto-sizing canvas
- Out of the box support for SVG export (no animation)

## Example: setup and draw

Here is an equivalent to [p5.js setup and draw example](https://p5js.org/examples/structure-setup-and-draw.html).

```
const example = (sketch) => {
  let y = 100;

  sketch.setup = function () {
    sketch.createCanvas(720, 400);
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

new u5(example, document.getElementById("container"));
```
