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
                        <div class="slider__thumb">
                            <div class="slider__from"></div>
                        </div>
                    </div>
                </div>
                <div class="slider__minmax">
                    <div class="slider__min"></div>
                    <div class="slider__max"></div>
                </div>
            </div>`;
    }

    getLineNode() : HTMLElement {
        return this.node.querySelector('.slider__line');
    }

    getThumbNode() : HTMLElement {
        return this.node.querySelector('.slider__thumb');
    }

    getFromNode() : HTMLElement {
        return this.node.querySelector('.slider__from');
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

    hideFrom(node: HTMLElement) {
        node.style.display = 'none';
    }

    setMin(value) : void {
        let node = this.getMinNode();
        node.textContent = value;
    }

    setMax(value) : void {
        let node = this.getMaxNode();
        node.textContent = value;
    }

    setAdjustedValue(value) {
        this.adjusted = value;
    }

    getAdjustedValue() {
        return this.adjusted;
    }

}