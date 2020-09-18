//уведомление о новом событии в слайдере
class SliderEvent {
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

//бегунок изменил положение вследствие перетаскивания его мышью
export class ThumbChangedPosition extends SliderEvent{
    position: number
    constructor(pos: number) {
        super();
        this.position = pos;
    }
}

//рассчитано текущее значение слайдера для отображения пользователям над бегунком
export class CalcedValue extends SliderEvent{
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}

//на основе текущего значения рассчитано положение, которое должен занять бегунок
export class calcedAdjustedValue extends SliderEvent {
    value: number
    constructor(val: number) {
        super();
        this.value = val;
    }
}

//произошел клик по слайдеру
export class LineClicked extends SliderEvent {
    position: number
    constructor(val: number) {
        super();
        this.position = val;
    }
}

//отжата кнопка мыши
export class MouseUpMessage extends SliderEvent {
    constructor() {
        super();
    }
}