//уведомление о новом событии в слайдере
export class SliderEvent {
    constructor() {
    }
}

//рассчитана ширина слайдера
export class CalcedSliderWidth extends SliderEvent {
    value: number;
    constructor(value: number) {
        super();
        this.value = value;
    }
}

//рассчитана высота слайдера
export class CalcedSliderHeight extends SliderEvent {
    value: number;
    constructor(value: number) {
        super();
        this.value = value;
    }
}

//бегунок изменил положение вследствие перетаскивания его мышью

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

//////////////
export class ThumbFromChangedPosition extends SliderEvent{
    position: number
    constructor(pos: number) {
        super();
        this.position = pos;
    }
}
////////////////
export class ThumbToChangedPosition extends SliderEvent{
    position: number
    constructor(pos: number) {
        super();
        this.position = pos;
    }
}


//рассчитано текущее значение слайдера для отображения пользователям над бегунком
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

////////////////
export class CalcedFromValue extends SliderEvent{
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}
/////////////////
export class CalcedToValue extends SliderEvent{
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}

//на основе текущего значения рассчитано положение, которое должен занять бегунок

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

export class CalcedAdjustedFromValue extends SliderEvent {
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}
export class CalcedAdjustedToValue extends SliderEvent {
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}


//произошел клик по слайдеру
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

// рассчитан шаг для вида слайдера Items

export class CalcedItemsStep extends SliderEvent {
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}
// клик по item

export class ItemClicked extends SliderEvent {
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}