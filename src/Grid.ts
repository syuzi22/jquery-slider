import { Observable } from './Observable'
import { GridClicked_H, GridClicked_V } from './Event'

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
        if (this.grid.offsetWidth / amount <= 5) {
            amount = this.grid.offsetWidth / 5;
        }

        for (let i = 0; i <= amount; i++) {
            let label = document.createElement('span');
            label.classList.add('slider__gridlabel_hor');
            this.grid.appendChild(label);
        }

        const that = this;
        this.grid.addEventListener('click', function(event) {
            let pos = event.clientX - that.grid.getBoundingClientRect().left;
            const gridClicked_hor = new GridClicked_H(pos);
            that.notifyObservers(gridClicked_hor)
        })

    }

    drawLabels_V(amount: number) {
        this.grid.classList.add('slider__grid_ver')
        if (amount <= 0) {
            return;
        }
        if (this.grid.offsetHeight / amount <= 5) {
            amount = this.grid.offsetHeight / 5;
        }

        for (let i = 0; i <= amount; i++) {
            let label = document.createElement('span');
            label.classList.add('slider__gridlabel_ver');
            this.grid.appendChild(label);
        }

        const that = this;
        this.grid.addEventListener('click', function(event) {
            let pos = that.grid.getBoundingClientRect().bottom - event.clientY;
            const gridClicked_ver = new GridClicked_V(pos);
            that.notifyObservers(gridClicked_ver)
        })
    }
}