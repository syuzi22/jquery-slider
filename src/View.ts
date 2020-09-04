import {Observable} from './Observable'

export class View extends Observable {
    private node: Element

    show(node: Element) {
        this.node = node
        let sliderLine = '<div class="slider__line"></div>';
        node.innerHTML = sliderLine;
    }
    setOrientation(orientation) {
        if(orientation) {
            this.node.querySelector('.slider__line').classList.add('slider__line_vertical');
        }else {
            this.node.querySelector('.slider__line').classList.add('slider__line_horizontal');
        }
    }
}