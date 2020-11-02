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
export class ThumbFromHorChangedPosition extends SliderEvent{
    position: number
    constructor(pos: number) {
        super();
        this.position = pos;
    }
}
////////////////
export class ThumbToHorChangedPosition extends SliderEvent{
    position: number
    constructor(pos: number) {
        super();
        this.position = pos;
    }
}
//////////////
export class ThumbFromVerChangedPosition extends SliderEvent{
    position: number
    constructor(pos: number) {
        super();
        this.position = pos;
    }
}
////////////////
export class ThumbToVerChangedPosition extends SliderEvent{
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
/////////////////
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

//произошел клик по шкале

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



// рассчитан шаг для вида слайдера Items

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