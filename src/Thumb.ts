import {Observable} from './Observable'
import { ThumbChangedPosition, CalcedSliderWidth } from './Event'

export class Thumb extends Observable {
    sliderNode: Element;
    selfNode: Element;

    constructor(node: Element) {
        super();
        this.sliderNode = node;
        this.selfNode = document.createElement('div');
        this.selfNode.classList.add('slider__thumb');
    }

    create() {
        let line = this.sliderNode.querySelector('.slider__line');
        line.appendChild(this.selfNode);
    }

    showVertical() {
        this.selfNode.classList.add('slider__thumb_vertical');
    }

    showHorizontal() {
        this.selfNode.classList.add('slider__thumb_horizontal');
    }

    addHorizontalMovement() {
        const self = this;
        const thumb = this.selfNode;
        const line = this.sliderNode.querySelector('.slider__line');
        const calcedSliderWidth = new CalcedSliderWidth(line.offsetWidth - thumb.offsetWidth);
        self.notifyObservers(calcedSliderWidth);



        thumb.onmousedown = function(event) {
            event.preventDefault();
            let shiftX = event.clientX - thumb.getBoundingClientRect().left;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            function onMouseMove(event) {
                let newLeft = event.clientX - shiftX - line.getBoundingClientRect().left;

                if (newLeft < 0) {
                    newLeft = 0;
                }
                let rightEdge = line.offsetWidth - thumb.offsetWidth;
                if (newLeft > rightEdge) {
                    newLeft = rightEdge;
                }

                const thumbChangedPos = new ThumbChangedPosition(newLeft);
                self.notifyObservers(thumbChangedPos);

                thumb.style.left = newLeft + 'px';
            }

            function onMouseUp() {

                thumb.style.left = self.adjusted + 'px';

                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
            }

        thumb.ondragstart = function() {
            return false;
        };

      };
    }

    showFrom() {
        let from = document.createElement('div');
        from.classList.add('slider__from');
        this.sliderNode.querySelector('.slider__thumb').append(from);
        from.textContent = 0;
    }
    setValue(value) {
        this.sliderNode.querySelector('.slider__from').textContent = value;
    }
    setAdjustedValue(value) {
        this.adjusted = value;
        this.selfNode.style.left = this.adjusted + 'px';
    }
}