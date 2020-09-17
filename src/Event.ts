class SliderEvent {
    constructor() {
    }
}

export class CalcedSliderWidth extends SliderEvent {
    value: number;
    constructor(value: number) {
        super();
        this.value = value;
    }
}

export class ThumbChangedPosition extends SliderEvent{
    position: string|number
    constructor(pos: string | number) {
        super();
        this.position = pos;
    }
}


export class CalcedValue extends SliderEvent{
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}

export class AdjustedValue extends SliderEvent {
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}

export class LineClicked extends SliderEvent {
    position: number
    constructor(val: number) {
        super();
        this.position = val;
    }
}