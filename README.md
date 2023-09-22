# Motion Canvas Typewriter

A typewriter component for Motion Canvas.

https://github.com/danferns/motion-canvas-typewriter/assets/57069381/18e625f6-4635-42d6-87fa-49977b4e45f0

## Installation

Just copy the [Typewriter.tsx](./src/scenes/Typewriter.tsx) file into your project.

## Documentation

`Typewriter` extends the `Txt` component and you can use all of `Txt`'s properties and methods, except for `text`. Instead, you will use `message` to set the text to be typed out.

### Props

-   `message` - The text to be typed out.
-   `fixWidth` - Sets the width of the textbox to the width of the message to prevent the centered text from moving around as the text is being typed out. Defaults to `false`.

### Methods

-   `typewrite()` - Starts the typewriter animation.
    Optionally, you can pass the `duration` for which the typing animation should last for.
    By default, the typing speed is about 5-6 characters per second, with some randomness added to it.

## Example

The code for the demo video above can be found in [example.tsx](./src/scenes/example.tsx).

## License

MIT
