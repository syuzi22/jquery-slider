import {Observable} from './Observable'
import {ItemClicked} from './Event'

export class Items extends Observable {
    line: HTMLElement;

    constructor(node: HTMLElement) {
        super();
        this.line = node;
    }

    addItemsToLine(items: array, step: number) {
        const self = this;
        let count = 0;
        for (let i = 0; i < items.length; i++) {
            let item = document.createElement('div');
            item.classList.add('slider__item');
            item.innerHTML = `<div class ="slider__item-name">${items[i]}</div>`;
            item.style.left = count + 'px';
            this.line.appendChild(item);
            item.onpointerdown = this.itemClickHandler.bind(self);
            count += step;
        }
    }
    itemClickHandler(event) {
        let target = event.target;
        let elems = target.parentElement.children;
        for (let i = 0; i < elems.length; i++) {
            if (elems[i].classList.contains('slider__item')) {
                elems[i].classList.remove('slider__item_selected');
            }
            if (elems[i].firstElementChild && elems[i].firstElementChild.classList.contains('slider__item-name')) {
                elems[i].firstElementChild.classList.remove('slider__item-name_selected');
            }
        }
        let pos = event.clientX - this.line.getBoundingClientRect().left;
        const itemClicked = new ItemClicked(pos);
        this.notifyObservers(itemClicked);

        target.classList.add('slider__item_selected');
        target.firstElementChild.classList.add('slider__item-name_selected');
    }
}