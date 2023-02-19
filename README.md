# u5.js

u5.js is a minimalist and lightweight canvas animation library. Its API is essentially a stripped down version of the popular [p5.js](https://github.com/processing/p5.js) library which features only what I needed for my own projects.

## Why does this library exists?

I have been using p5.js since 2016 and it is all over my website [ucodia.space](https://ucodia.space). Since then the JavaScript ecosystem has radically changed but the p5.js did not follow along. As a result the library is now over 800KB minified which is really heavy if all you need is to animate simple primitives on a HTML canvas. There is an [exisiting issue](https://github.com/processing/p5.js/issues/5740) in the p5.js GitHub repository, though it seems the way the library is built makes it impossible to enable tree-shaking while remaining backward compatible.

## Features

### Supported

- Instance mode with `new u5(sketch, element)`;
- `createCanvas()`
- `remove()`
- `clear()`
- `background()`
- `stroke()`
- `noStroke()`
- `fill()`
- `noFill()`
- `rect()`
- `ellipse()`
- `line()`
- `triangle()`
- `map()`
- `constrain()`
- `frameRate()`
- `frameCount`
- `PI`
- `TWO_PI`

### Plan to support

- `noLoop()`
- `mouseX / pmouseX / mouseY / pmouseY`
- `translate`
- `scale`

### No plan to support

- Global instance mode
- `colorMode()`

### Planned new features

- Auto-sizing canvas
- Out of the box support for SVG export (no animation)

## Example: setup and draw

Here is an equivalent to [p5.js setup and draw example](https://p5js.org/examples/structure-setup-and-draw.html).

```
const example = (sketch) => {
    let y = 100;

    sketch.setup = function() {
        sketch.createCanvas(720, 400);
        sketch.stroke(255);
        sketch.frameRate(30);
    }

    sketch.draw = function() {
        sketch.background(0);
        y = y - 1;
        if (y < 0) {
            y = height;
        }
        line(0, y, width, y);
    }
}

new u5(example, document.getElementById("container"));
```