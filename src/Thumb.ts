import {Observable} from './Observable'
import { ThumbChangedPosition, CalcedSliderWidth } from './Event'

export class Thumb extends Observable {
    thumb:HTMLElement;

    constructor(node: HTMLElement) {
        super();
        this.thumb = node;
    }

    drawHorizontal() {
        this.thumb.classList.add('slider__thumbto_horizontal');
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
            thumb.dataset.down = true;
        };

        thumb.onpointermove = function (event) {
            if (!thumb.dataset.down) {
                return;
            }
            let newLeft = event.clientX - shiftX - line.getBoundingClientRect().left;
            if (newLeft < 0) {newLeft = 0;}
            let rightEdge = line.offsetWidth - thumb.offsetWidth;
            if (newLeft > rightEdge) {newLeft = rightEdge;}

            const thumbFromChangedPos = new ThumbChangedPosition(newLeft);
            self.notifyObservers(thumbFromChangedPos);
        };

        thumb.onpointerup = function(event) {
            thumb.dataset.down = false;
        }

        thumb.ondragstart = () => false;
    }

    moveThumbOn(position: number) {
        this.thumb.style.left = position + 'px';
    }
}
