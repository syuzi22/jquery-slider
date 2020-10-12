import {Observable} from './Observable'
import {LineClicked} from './Event'

export class Line extends Observable {
    sliderLine: HTMLElement
    progressBarNode: HTMLElement
    progressBarNodeLeftPos: number
    progressBarNodeRightPos: number

    constructor(node: HTMLElement) {
        super();
        this.sliderLine = node;
    }
    drawHorizontalLine() {
        this.sliderLine.classList.add('slider__line_horizontal');
    }

    addLineClickOption() {
        const that = this;
        this.sliderLine.addEventListener('click', function(event) {
            let position = event.clientX - that.sliderLine.getBoundingClientRect().left;
            const lineClicked = new LineClicked(position);
            that.notifyObservers(lineClicked);
        })
    }

    addProgressBar(node: HTMLElement) {
        this.progressBarNode = node;
    }

    setProgressBarLeftPos(position: number) {
        this.progressBarNodeLeftPos = position;
        this.updateProgressBarWidth();
    }

    setProgressBarRightPos(position: number) {
        this.progressBarNodeRightPos = position;
        this.updateProgressBarWidth();
    }

    updateProgressBarWidth(position?: number) {
        if (position >= 0) {
            this.progressBarNode.style.width =  position + 'px';
        }else {
            this.progressBarNode.style.left = this.progressBarNodeLeftPos + 'px';
            this.progressBarNode.style.width = this.progressBarNodeRightPos - this.progressBarNodeLeftPos + 'px';
        }
    }

    getLineWidth() {
        return this.sliderLine.offsetWidth;
    }



}