import { makeScene2D } from "@motion-canvas/2d";
import { all, createRef, waitFor } from "@motion-canvas/core";
import { Typewriter } from "./Typewriter";

const message1 = "We all have a story to tell.";
const message2 = "Whether we whisper or yell.";

export default makeScene2D(function* (view) {
    const typewriter1 = createRef<Typewriter>();
    const typewriter2 = createRef<Typewriter>();

    view.add(
        <>
            <Typewriter
                ref={typewriter1}
                message={message1}
                fixWidth={false}
                fill={"#000f"}
                fontFamily={"Raleway"}
                fontSize={56}
            />
            <Typewriter
                ref={typewriter2}
                message={message2}
                fixWidth={true}
                fill={"#000f"}
                fontFamily={"Raleway"}
                fontSize={56}
            />
        </>
    );

    yield* waitFor(0.5);

    // write in first message
    yield* typewriter1().typewrite();
    yield* waitFor(0.5);

    // make space for the new one
    yield* typewriter1().position.y(-56, 0.5);
    typewriter2().position.y(56);

    // write in the second message
    // yield* typewriter2().typewrite(customKeystrokeDelay);
    yield* typewriter2().typewrite();
    yield* waitFor(0.5);

    // bye bye
    yield* all(typewriter1().fill("#0000", 1), typewriter2().fill("#0000", 1));
    yield* waitFor(0.5);
});

// constant delay between keystrokes
function customKeystrokeDelay(message: string, nextCharIndex: number) {
    return 0.3;
}
