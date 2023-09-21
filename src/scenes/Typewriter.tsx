// MIT License

// Copyright (c) 2023 Daniel Fernandes

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { Txt, TxtProps, initial, signal } from "@motion-canvas/2d";
import { SignalValue, SimpleSignal, createSignal, useRandom, waitFor } from "@motion-canvas/core";

export interface TypewriterProps extends TxtProps {
    message: SignalValue<string>;
    fixWidth: SignalValue<boolean>;
}

export class Typewriter extends Txt {
    @signal()
    public declare readonly message: SimpleSignal<string, this>;

    @initial(false)
    @signal()
    public declare readonly fixWidth: SimpleSignal<boolean, this>;

    private readonly writtenText = createSignal("");
    constructor(props?: TypewriterProps) {
        super({
            ...props,
        });

        this.text(this.writtenText);

        if (props.fixWidth) {
            // prevent moving text as it's being typed
            this.setTextboxWidth();
        }
    }

    public *typewrite(
        keystrokeDelay: (message: string, nextCharIndex: number) => number = generateTimeDelay
    ) {
        for (let i = 0; i < this.message().length; i++) {
            this.writtenText(this.message().slice(0, i + 1));
            const delay = keystrokeDelay(this.message(), i + i);
            yield* waitFor(delay);
        }
    }

    private setTextboxWidth() {
        this.writtenText(this.message());
        this.width(this.width());
        this.writtenText("");
    }
}

function generateTimeDelay(message: string, nextChar: number) {
    const char = message[nextChar + 1] || "";
    const random = useRandom();
    if (char === " ") {
        return random.gauss(0.15, 0.025);
    } else if (".,'".includes(char)) {
        return random.gauss(0.2, 0.025);
    } else {
        return random.gauss(0.13, 0.025);
    }
}
