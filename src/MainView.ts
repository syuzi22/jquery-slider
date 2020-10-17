interface VeiwInterface {
    render(): string;
}

export class MainView implements VeiwInterface {
    readonly node: HTMLElement;

    constructor(node: HTMLElement) {
        this.node = node
    }

    render(): string {
        return this.node.innerHTML = `
            <div class="slider__wrap">
                <div class="slider__line">
                        <div class="slider__progressbar">
                        </div>
                        <div class="slider__thumb-from">
                            <div class="slider__from"></div>
                        </div>
                        <div class="slider__thumb-to">
                            <div class="slider__to"></div>
                        </div>
                </div>
                <div class="slider__minmax">
                    <div class="slider__min"></div>
                    <div class="slider__max"></div>
                </div>
            </div>`;
    }

    ////////////////
    renderGrid() {
        let tmp = `<div class="slider__grid"></div>`;
        this.getLineNode().insertAdjacentHTML('afterend', tmp);
    }

    getGridNode(): HTMLElement {
        return this.node.querySelector('.slider__grid');
    }

    ////////////////////

    getLineNode() : HTMLElement {
        return this.node.querySelector('.slider__line');
    }

    getThumbFromNode() : HTMLElement {
        return this.node.querySelector('.slider__thumb-from');
    }

    getThumbToNode() : HTMLElement {
        return this.node.querySelector('.slider__thumb-to');
    }

    getFromNode() : HTMLElement {
        return this.node.querySelector('.slider__from');
    }

    getToNode() : HTMLElement {
        return this.node.querySelector('.slider__to');
    }

    getMinNode() : HTMLElement {
        return this.node.querySelector('.slider__min');
    }
    getMaxNode() : HTMLElement {
        return this.node.querySelector('.slider__max');
    }

    getProgressBarNode(): HTMLElement {
        return this.node.querySelector('.slider__progressbar');
    }



    setValue(node: HTMLElement, value) {
        node.textContent = value;
    }

    setMin(value) : void {
        let node = this.getMinNode();
        node.textContent = value;
    }

    setMax(value) : void {
        let node = this.getMaxNode();
        node.textContent = value;
    }

    ///////
    hideValue(value: boolean) {
        if (value === true) {
            this.getFromNode().style.display = 'none';
            this.getToNode().style.display = 'none';
        } else {
            this.getFromNode().style.display = 'block';
            this.getToNode().style.display = 'block';
        }

    }
    /////////
}