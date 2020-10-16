import {Observable} from './Observable'

export class Grid extends Observable {
    grid: HTMLElement
    constructor(node: HTMLElement) {
        super();
        this.grid = node;
    }

    drawLabels(amount: number) {
        for (let i = 0; i <= amount; i++) {
            let label = document.createElement('span');
            label.classList.add('slider__gridlabel');
            this.grid.appendChild(label);
        }
    }
}