import {Observable} from './Observable'
import {LineClicked} from './Event'

export class Line extends Observable {
    sliderLine: Element

    constructor() {
        super();
    }
    drawHorizontalLine(node: Element) {
        node.innerHTML = `<div class="slider__line"></div>`;
        this.sliderLine = node.querySelector('.slider__line');
        this.sliderLine.classList.add('slider__line_horizontal');
    }
    drawVerticalLine(node: Element) {
        node.innerHTML = `<div class="slider__line"></div>`;
        this.sliderLine = node.querySelector('.slider__line');
        this.sliderLine.classList.add('slider__line_vertical');
    }

    addLineClickOption() {
        const self = this;
        this.sliderLine.addEventListener('click', function(event) {
            let position = event.clientX - self.sliderLine.getBoundingClientRect().left;
            const lineClicked = new LineClicked(position);
            self.notifyObservers(lineClicked);
        })
    }
}