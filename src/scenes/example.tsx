import { makeScene2D, Txt } from "@motion-canvas/2d";
import { createRef, createSignal, useRandom, waitFor } from "@motion-canvas/core";

const message = "We all have a story to tell.";
const textSignal = createSignal("");

export default makeScene2D(function* (view) {
    const textBox = createRef<Txt>();
    textSignal("");

    view.add(
        <>
            <Txt
                ref={textBox}
                text={textSignal}
                fill={"#000f"}
                fontFamily={"Raleway"}
                fontSize={56}
            />
        </>
    );

    // fix the width so the text doesn't move as it's being typed out
    setTextboxWidth(textBox(), message);

    yield* waitFor(0.5);

    for (let i = 0; i < message.length; i++) {
        textSignal(message.slice(0, i + 1));
        // delay the next character
        yield* waitFor(generateTimeDelay(message[i + 1] || ""));
    }

    yield* waitFor(0.5);
    yield* textBox().fill("#0000", 1);
    yield* waitFor(0.5);
});

function generateTimeDelay(char: string) {
    const random = useRandom();
    if (char === " ") {
        return random.gauss(0.15, 0.025);
    } else if (".,'".includes(char)) {
        return random.gauss(0.2, 0.025);
    } else {
        return random.gauss(0.13, 0.025);
    }
}

function setTextboxWidth(textbox: Txt, text: string) {
    textSignal(text);
    textbox.width(textbox.width());
    textSignal("");
}
