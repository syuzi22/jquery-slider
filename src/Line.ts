import {Observable} from './Observable'
import {LineClicked} from './Event'

export class Line extends Observable {
    sliderLine: HTMLElement

    constructor(node: HTMLElement) {
        super();
        this.sliderLine = node;
    }
    drawHorizontalLine() {
        this.sliderLine.classList.add('slider__line_horizontal');
    }
    drawVerticalLine() {
        this.sliderLine.classList.add('slider__line_vertical');
    }

    addLineClickOption() {
        const that = this;
        this.sliderLine.addEventListener('click', function(event) {
            let position = event.clientX - that.sliderLine.getBoundingClientRect().left;
            const lineClicked = new LineClicked(position);
            that.notifyObservers(lineClicked);
        })
    }

    drawProgressBar(progressBarNode: HTMLElement, position: number) {
        progressBarNode.style.width = position + 'px';
    }
}