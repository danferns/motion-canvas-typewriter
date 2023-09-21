# Motion Canvas Typewriter

A typewriter component for Motion Canvas.

https://github.com/danferns/motion-canvas-typewriter/assets/57069381/67d7c77b-42f2-4ca5-825f-bffe162a82f7

## Installation

Just copy the [Typewriter.tsx](./src/scenes/Typewriter.tsx) file into your project.

## Documentation

`Typewriter` extends the `Txt` component and you can use all of `Txt`'s properties and methods, except for `text`. Instead, you will use `message` to set the text to be typed out.

### Props

-   `message` - The text to be typed out.
-   `fixWidth` - Sets the width of the textbox to the width of the message to prevent the centered text from moving around as the text is being typed out. Defaults to `false`.

### Methods

-   `typewrite()` - Starts the typewriter animation.
-   `protected generateTimeDelay()` - Override this method to change how the time delay is calculated. By default, it uses randomization to simulate a human typing.

## Example

The code for the demo video above can be found in [example.tsx](./src/scenes/example.tsx).

## License

MIT
