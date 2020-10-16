import {Observable} from './Observable'
import { ThumbFromChangedPosition, ThumbToChangedPosition, CalcedSliderWidth } from './Event'

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
            thumbFrom.dataset.down = true;
        };

        thumbFrom.onpointermove = function (event) {
            if (!thumbFrom.dataset.down) {
                return;
            }
            let newLeft = event.clientX - shiftX1 - line.getBoundingClientRect().left;
            if (newLeft < 0) {newLeft = 0;}
            let thumbToPos = line.getBoundingClientRect().right - thumbTo.getBoundingClientRect().left;
            let rightEdge = line.offsetWidth - thumbFrom.offsetWidth - thumbToPos;
            if (newLeft > rightEdge) {newLeft = rightEdge;}

            const thumbFromChangedPos = new ThumbFromChangedPosition(newLeft);
            self.notifyObservers(thumbFromChangedPos);
        };

        thumbFrom.onpointerup = function(event) {
            thumbFrom.dataset.down = false;
        }

        thumbFrom.ondragstart = () => false;

        thumbTo.onpointerdown = function (event) {
            event.preventDefault();
            shiftX2 = event.clientX - thumbTo.getBoundingClientRect().left;
            thumbTo.setPointerCapture(event.pointerId);
            thumbTo.dataset.down = true;
        };

        thumbTo.onpointermove = function (event) {
            if (!thumbTo.dataset.down) {
                return;
            }
            let newLeft = event.clientX - shiftX2 - line.getBoundingClientRect().left;
            let thumbFromPos = thumbFrom.getBoundingClientRect().right - line.getBoundingClientRect().left;
            if (newLeft < thumbFromPos) {newLeft = thumbFromPos;}
            let rightEdge = line.offsetWidth - thumbTo.offsetWidth;
            if (newLeft > rightEdge) {newLeft = rightEdge;}

            const thumbToChangedPos = new ThumbToChangedPosition(newLeft);
            self.notifyObservers(thumbToChangedPos);
        };

        thumbTo.onpointerup = function(event) {
            thumbTo.dataset.down = false;
        }

        thumbTo.ondragstart = () => false;
    }

    moveThumbFromOn(position: number) {
        this.thumbFrom.style.left = position + 'px';
    }
    moveThumbToOn(position: number) {
        this.thumbTo.style.left = position + 'px';
    }
}
