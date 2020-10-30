import {Observable} from './Observable'
import { ThumbFromHorChangedPosition, ThumbToHorChangedPosition, ThumbFromVerChangedPosition, ThumbToVerChangedPosition, CalcedSliderWidth, CalcedSliderHeight } from './Event'

const PointerDownState = 'down';
const PointerUpState = 'up';

export class DoubleThumb extends Observable {
    thumbFrom:HTMLElement;
    thumbTo: HTMLElement;

    constructor(node1: HTMLElement, node2: HTMLElement) {
        super();
        this.thumbFrom = node1;
        this.thumbTo = node2;
    }

    drawHorizontal() {
        this.thumbFrom.classList.add('slider__thumbfrom_horizontal');
        this.thumbTo.classList.add('slider__thumbto_horizontal');
    }

    drawVertical() {
        this.thumbFrom.classList.add('slider__thumbfrom_vertical');
        this.thumbTo.classList.add('slider__thumbto_vertical');
    }

    addHorizontalMovement(node: HTMLElement) {
        const line = node;
        const self = this;
        const thumbFrom = this.thumbFrom;
        const thumbTo = this.thumbTo;

        const calcedSliderWidth = new CalcedSliderWidth(line.offsetWidth - thumbFrom.offsetWidth);
        self.notifyObservers(calcedSliderWidth);

        let shiftX1: number;
        let shiftX2: number;

        thumbFrom.onpointerdown = function (event) {
            event.preventDefault();
            shiftX1 = event.clientX - thumbFrom.getBoundingClientRect().left;
            thumbFrom.setPointerCapture(event.pointerId);
            thumbFrom.dataset.pointerState = PointerDownState;
        };

        thumbFrom.onpointermove = function (event) {
            if (thumbFrom.dataset.pointerState !== PointerDownState) {
                return;
            }
            let newLeft = event.clientX - shiftX1 - line.getBoundingClientRect().left;
            if (newLeft < 0) {newLeft = 0;}
            let thumbToPos = line.getBoundingClientRect().right - thumbTo.getBoundingClientRect().left;
            let rightEdge = line.offsetWidth - thumbFrom.offsetWidth - thumbToPos;
            if (newLeft > rightEdge) {newLeft = rightEdge;}

            const thumbFromHorChangedPos = new ThumbFromHorChangedPosition(newLeft);
            self.notifyObservers(thumbFromHorChangedPos);
        };

        thumbFrom.onpointerup = function(event) {
            thumbFrom.dataset.pointerState = PointerUpState;
        }

        thumbFrom.ondragstart = () => false;

        thumbTo.onpointerdown = function (event) {
            event.preventDefault();
            shiftX2 = event.clientX - thumbTo.getBoundingClientRect().left;
            thumbTo.setPointerCapture(event.pointerId);
            thumbTo.dataset.pointerState = PointerDownState;
        };

        thumbTo.onpointermove = function (event) {
            if (thumbTo.dataset.pointerState !== PointerDownState) {
                return;
            }
            let newLeft = event.clientX - shiftX2 - line.getBoundingClientRect().left;
            let thumbFromPos = thumbFrom.getBoundingClientRect().right - line.getBoundingClientRect().left;
            if (newLeft < thumbFromPos) {newLeft = thumbFromPos;}
            let rightEdge = line.offsetWidth - thumbTo.offsetWidth;
            if (newLeft > rightEdge) {newLeft = rightEdge;}

            const thumbToHorChangedPos = new ThumbToHorChangedPosition(newLeft);
            self.notifyObservers(thumbToHorChangedPos);
        };

        thumbTo.onpointerup = function(event) {
            thumbTo.dataset.pointerState = PointerUpState;
        }

        thumbTo.ondragstart = () => false;
    }


    addVerticalMovement(node: HTMLElement) {
        const line = node;
        const self = this;
        const thumbFrom = this.thumbFrom;
        const thumbTo = this.thumbTo;

        const calcedSliderHeight = new CalcedSliderHeight(line.offsetHeight - thumbFrom.offsetHeight);
        self.notifyObservers(calcedSliderHeight);

        let shiftY1: number;
        let shiftY2: number;

        thumbFrom.onpointerdown = function (event) {
            event.preventDefault();
            shiftY1 = thumbFrom.getBoundingClientRect().bottom - event.clientY;
            thumbFrom.setPointerCapture(event.pointerId);
            thumbFrom.dataset.pointerState = PointerDownState;
        };

        thumbFrom.onpointermove = function (event) {
            if (thumbFrom.dataset.pointerState !== PointerDownState) {
                return;
            }
            let newtop = line.getBoundingClientRect().bottom - event.clientY - shiftY1;
            if (newtop < 0) {newtop = 0;}

            let thumbToPos = line.getBoundingClientRect().bottom - thumbTo.getBoundingClientRect().bottom;

            let topEdge = thumbToPos - thumbTo.offsetHeight;
            if (newtop > topEdge) {newtop = topEdge;}

            const thumbFromVerChangedPos = new ThumbFromVerChangedPosition(newtop);
            self.notifyObservers(thumbFromVerChangedPos);
        };

        thumbFrom.onpointerup = function(event) {
            thumbFrom.dataset.pointerState = PointerUpState;
        }

        thumbFrom.ondragstart = () => false;

        thumbTo.onpointerdown = function (event) {
            event.preventDefault();
            shiftY2 = thumbTo.getBoundingClientRect().bottom - event.clientY;
            thumbTo.setPointerCapture(event.pointerId);
            thumbTo.dataset.pointerState = PointerDownState;
        };

        thumbTo.onpointermove = function (event) {
            if (thumbTo.dataset.pointerState !== PointerDownState) {
                return;
            }
            let newtop = line.getBoundingClientRect().bottom - event.clientY - shiftY2;

            let thumbFromPos = line.getBoundingClientRect().bottom - thumbFrom.getBoundingClientRect().top;

            if (newtop < thumbFromPos) {newtop = thumbFromPos;}

            let topEdge = line.offsetHeight - thumbTo.offsetHeight;
            if (newtop > topEdge) {newtop = topEdge;}

            const thumbToVerChangedPos = new ThumbToVerChangedPosition(newtop);
            self.notifyObservers(thumbToVerChangedPos);
        };

        thumbTo.onpointerup = function(event) {
            thumbTo.dataset.pointerState = PointerUpState;
        }

        thumbTo.ondragstart = () => false;
    }





    moveThumbFromOn_H(position: number) {
        this.thumbFrom.style.left = position + 'px';
    }
    moveThumbToOn_H(position: number) {
        this.thumbTo.style.left = position + 'px';
    }

    moveThumbFromOn_V(position: number) {
        this.thumbFrom.style.bottom = position + 'px';
    }
    moveThumbToOn_V(position: number) {
        this.thumbTo.style.bottom = position + 'px';
    }
}
