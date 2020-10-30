import {Observable} from './Observable'
import { ThumbHorChangedPosition, ThumbVerChangedPosition, CalcedSliderWidth, CalcedSliderHeight } from './Event'

const PointerDownState = 'down';
const PointerUpState = 'up';

export class Thumb extends Observable {
    thumb:HTMLElement;

    constructor(node: HTMLElement) {
        super();
        this.thumb = node;
    }

    drawHorizontal() {
        this.thumb.classList.add('slider__thumbto_horizontal');
    }

    drawVertical() {
        this.thumb.classList.add('slider__thumbto_vertical');
    }

    addHorizontalMovement(node: HTMLElement) {
        const line = node;
        const self = this;
        const thumb = this.thumb;

        const calcedSliderWidth = new CalcedSliderWidth(line.offsetWidth - thumb.offsetWidth);
        self.notifyObservers(calcedSliderWidth);

        let shiftX: number;

        thumb.onpointerdown = function (event) {
            event.preventDefault();
            shiftX = event.clientX - thumb.getBoundingClientRect().left;
            thumb.setPointerCapture(event.pointerId);
            thumb.dataset.pointerState = PointerDownState;
        };

        thumb.onpointermove = function (event) {
            if (thumb.dataset.pointerState !== PointerDownState) {
                return;
            }
            let newLeft = event.clientX - shiftX - line.getBoundingClientRect().left;
            if (newLeft < 0) {newLeft = 0;}
            let rightEdge = line.offsetWidth - thumb.offsetWidth;
            if (newLeft > rightEdge) {newLeft = rightEdge;}

            const thumbChangedPos = new ThumbHorChangedPosition(newLeft);
            self.notifyObservers(thumbChangedPos);
        };

        thumb.onpointerup = function(event) {
            thumb.dataset.pointerState = PointerUpState;
        }

        thumb.ondragstart = () => false;
    }

    moveThumbOn_H(position: number) {
        this.thumb.style.left = position + 'px';
    }

    addVerticalMovement(node: HTMLElement) {
        const line = node;
        const self = this;
        const thumb = this.thumb;

        const calcedSliderHeight = new CalcedSliderHeight(line.offsetHeight - thumb.offsetHeight);
        self.notifyObservers(calcedSliderHeight);
        let shiftY: number;

        thumb.onpointerdown = function (event) {
            event.preventDefault();
            shiftY = thumb.getBoundingClientRect().bottom - event.clientY;

            thumb.setPointerCapture(event.pointerId);
            thumb.dataset.pointerState = PointerDownState;
        };

        thumb.onpointermove = function (event) {
            if (thumb.dataset.pointerState !== PointerDownState) {
                return;
            }
            let newtop = line.getBoundingClientRect().bottom - event.clientY - shiftY;

            if (newtop < 0) {newtop = 0;}
            let topEdge = line.offsetHeight - thumb.offsetHeight;
            if (newtop > topEdge) {newtop = topEdge;}

            const thumbChangedPos = new ThumbVerChangedPosition(newtop);
            self.notifyObservers(thumbChangedPos);
        };

        thumb.onpointerup = function(event) {
            thumb.dataset.pointerState = PointerUpState;
        }

        thumb.ondragstart = () => false;
    }

    moveThumbOn_V(position: number) {
        this.thumb.style.bottom = position + 'px';
    }
}
