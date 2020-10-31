import {Observable} from './Observable'
import { LineClicked_H, LineClicked_V } from './Event'

export class Line extends Observable {
    sliderLine: HTMLElement
    progressBarNode: HTMLElement
    progressBarNodeLeftPos: number
    progressBarNodeRightPos: number
    progressBarNodeTopPos: number
    progressBarNodeBottomPos: number


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

    addLineClickOption_H() {
        const that = this;
        this.sliderLine.addEventListener('click', function(event) {
            let position = event.clientX - that.sliderLine.getBoundingClientRect().left;
            const lineClicked = new LineClicked_H(position);
            that.notifyObservers(lineClicked);
        })
    }

    addLineClickOption_V() {
        const that = this;
        this.sliderLine.addEventListener('click', function(event) {
            let position = that.sliderLine.getBoundingClientRect().bottom - event.clientY;
            const lineClicked = new LineClicked_V(position);
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

    setProgressBarTopPos(position: number) {
        this.progressBarNodeTopPos = position;
        this.updateProgressBarHeight();
    }

    setProgressBarBottomPos(position: number) {
        this.progressBarNodeBottomPos = position;
        this.updateProgressBarHeight();
    }

    updateProgressBarHeight(position?: number) {
        if (position >= 0) {
            this.progressBarNode.style.height =  position + 'px';
            this.progressBarNode.style.marginTop =  this.getLineHeight() - position + 'px';
            console.log('marg', this.progressBarNode.style.marginTop)
            this.progressBarNode.style.borderBottomLeftRadius = '5px';
            this.progressBarNode.style.borderBottomRightRadius = '5px';

        }else {
            this.progressBarNode.style.height =  this.progressBarNodeTopPos - this.progressBarNodeBottomPos + 'px';
            this.progressBarNode.style.marginTop =  this.getLineHeight() - this.progressBarNodeTopPos  + 'px';
        }
    }

    getLineWidth() {
        return this.sliderLine.offsetWidth;
    }

    getLineHeight() {
        return this.sliderLine.offsetHeight;
    }
}