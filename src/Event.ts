// new event notification
export class SliderEvent {
    constructor() {
    }
}

// calculated slider width
export class CalcedSliderWidth extends SliderEvent {
    value: number;
    constructor(value: number) {
        super();
        this.value = value;
    }
}

// calculated slider height
export class CalcedSliderHeight extends SliderEvent {
    value: number;
    constructor(value: number) {
        super();
        this.value = value;
    }
}

// thumb changed position

export class ThumbHorChangedPosition extends SliderEvent{
    position: number
    constructor(pos: number) {
        super();
        this.position = pos;
    }
}

export class ThumbVerChangedPosition extends SliderEvent{
    position: number
    constructor(pos: number) {
        super();
        this.position = pos;
    }
}

export class ThumbFromHorChangedPosition extends SliderEvent{
    position: number
    constructor(pos: number) {
        super();
        this.position = pos;
    }
}

export class ThumbToHorChangedPosition extends SliderEvent{
    position: number
    constructor(pos: number) {
        super();
        this.position = pos;
    }
}

export class ThumbFromVerChangedPosition extends SliderEvent{
    position: number
    constructor(pos: number) {
        super();
        this.position = pos;
    }
}

export class ThumbToVerChangedPosition extends SliderEvent{
    position: number
    constructor(pos: number) {
        super();
        this.position = pos;
    }
}

// calculated current value
export class CalcedValueHor extends SliderEvent{
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}

export class CalcedValueVer extends SliderEvent{
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}

export class CalcedFromValueHor extends SliderEvent{
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}

export class CalcedFromValueVer extends SliderEvent{
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}

export class CalcedToValueHor extends SliderEvent{
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}

export class CalcedToValueVer extends SliderEvent{
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}

// calculated position for thumb
export class CalcedAdjustedValueHor extends SliderEvent {
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}

export class CalcedAdjustedValueVer extends SliderEvent {
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}

export class CalcedAdjustedFromValueHor extends SliderEvent {
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}

export class CalcedAdjustedFromValueVer extends SliderEvent {
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}

export class CalcedAdjustedToValueHor extends SliderEvent {
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}

export class CalcedAdjustedToValueVer extends SliderEvent {
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}


// click on line
export class LineClicked_H extends SliderEvent {
    position: number
    constructor(val: number) {
        super();
        this.position = val;
    }
}

export class LineClicked_V extends SliderEvent {
    position: number
    constructor(val: number) {
        super();
        this.position = val;
    }
}

// click on grid
export class GridClicked_H extends SliderEvent {
    position: number
    constructor(val: number) {
        super();
        this.position = val;
    }
}

export class GridClicked_V extends SliderEvent {
    position: number
    constructor(val: number) {
        super();
        this.position = val;
    }
}

// calculated step for Items
export class CalcedItemsStep_H extends SliderEvent {
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}

export class CalcedItemsStep_V extends SliderEvent {
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}