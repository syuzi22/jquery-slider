import {Observable} from './Observable'

export class Grid extends Observable {
    grid: HTMLElement
    minNode: HTMLElement
    constructor(node: HTMLElement, minNode: HTMLElement) {
        super();
        this.grid = node;
        this.minNode = minNode;
    }

    drawLabels(amount: number) {
        for (let i = 0; i <= amount; i++) {
            let label = document.createElement('span');
            label.classList.add('slider__gridlabel');
            if (i % 10 === 0) {
                label.classList.add('slider__gridlabel_num');
            }
            this.grid.appendChild(label);
        }
    }
}