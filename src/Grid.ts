import {Observable} from './Observable'

export class Grid extends Observable {
    grid: HTMLElement
    constructor(node: HTMLElement) {
        super();
        this.grid = node;
    }

    drawLabels_H(amount: number) {
        if (amount <= 0) {
            return;
        }
        for (let i = 0; i <= amount; i++) {
            let label = document.createElement('span');
            label.classList.add('slider__gridlabel_hor');
            this.grid.appendChild(label);
        }
    }

    drawLabels_V(amount: number) {
        this.grid.classList.add('slider__grid_ver')
        if (amount <= 0) {
            return;
        }
        for (let i = 0; i <= amount; i++) {
            let label = document.createElement('span');
            label.classList.add('slider__gridlabel_ver');
            this.grid.appendChild(label);
        }
    }
}