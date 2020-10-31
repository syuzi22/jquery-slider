import {Observable} from './Observable'

export class Items extends Observable {
    line: HTMLElement;
    constructor(node: HTMLElement) {
        super();
        this.line = node;
    }

    addItemsToLine_H(items: Array<string>, step: number) {
        const self = this;
        let count = 0;
        for (let i = 0; i < items.length; i++) {
            let item = document.createElement('div');
            item.classList.add('slider__item_hor');
            item.innerHTML = `<div class ="slider__item-name_hor">${items[i]}</div>`;
            item.style.left = count + 'px';
            this.line.appendChild(item);
            item.onpointerdown = this.itemClickHandler_H.bind(self);
            count += step;
        }
    }

    addItemsToLine_V(items: Array<string>, step: number) {
        const self = this;
        let count = 0;
        for (let i = 0; i < items.length; i++) {
            let item = document.createElement('div');
            item.classList.add('slider__item_ver');
            item.innerHTML = `<div class ="slider__item-name_ver">${items[i]}</div>`;
            item.style.bottom = count + 'px';
            this.line.appendChild(item);
            item.onpointerdown = this.itemClickHandler_V.bind(self);
            count += step;
        }
    }

    itemClickHandler_H(event: MouseEvent) {
        let target = event.target as HTMLElement;
        let elems = target.parentElement.children;
        for (let i = 0; i < elems.length; i++) {
            if (elems[i].classList.contains('slider__item_hor')) {
                elems[i].classList.remove('slider__item_selected_hor');
            }
            if (elems[i].firstElementChild && elems[i].firstElementChild.classList.contains('slider__item-name_hor')) {
                elems[i].firstElementChild.classList.remove('slider__item-name_selected_hor');
            }
        }
        target.classList.add('slider__item_selected_hor');
        target.firstElementChild.classList.add('slider__item-name_selected_hor');
    }

    itemClickHandler_V(event: MouseEvent) {
        let target = event.target as HTMLElement;
        let elems = target.parentElement.children;
        for (let i = 0; i < elems.length; i++) {
            if (elems[i].classList.contains('slider__item_ver')) {
                elems[i].classList.remove('slider__item_selected_ver');
            }
            if (elems[i].firstElementChild && elems[i].firstElementChild.classList.contains('slider__item-name_ver')) {
                elems[i].firstElementChild.classList.remove('slider__item-name_selected_ver');
            }
        }
        target.classList.add('slider__item_selected_ver');
        target.firstElementChild.classList.add('slider__item-name_selected_ver');
    }
}