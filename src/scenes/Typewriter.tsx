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

    public *typewrite() {
        for (let i = 0; i < this.message().length; i++) {
            this.writtenText(this.message().slice(0, i + 1));
            yield* waitFor(this.generateTimeDelay(i + 1));
        }
    }

    /** Calculates the delay between key strokes, feel free to override. */
    protected generateTimeDelay(nextChar: number) {
        const char = this.message()[nextChar + 1] || "";
        const random = useRandom();
        if (char === " ") {
            return random.gauss(0.15, 0.025);
        } else if (".,'".includes(char)) {
            return random.gauss(0.2, 0.025);
        } else {
            return random.gauss(0.13, 0.025);
        }
    }

    private setTextboxWidth() {
        this.writtenText(this.message());
        this.width(this.width());
        this.writtenText("");
    }
}
