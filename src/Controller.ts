import {Model} from './Model'
import {View} from './View'
import {Thumb} from './Thumb'
import {Options} from './Options'

export class Controller {
    private model: Model
    private view: View
    private thumb: Thumb

    constructor(model: Model, view: View, thumb: Thumb) {
        this.model = model;
        this.view = view;
        this.thumb = thumb;
        this.data;
    }

    init (options: Options, node: Element): void {
        this.model.addObserver(this)
        this.view.addObserver(this)
        this.thumb.addObserver(this)

        this.view.createShell(node);
        this.view.drawLine(options.orientation);
        this.view.showMinMax(options.min, options.max);


        this.thumb.create();
        this.thumb.showHorizontal();
        this.thumb.addHorizontalMovement();

        // this.view.drawThumb(options.orientation);
        // this.view.addThumbMovement(options.orientation);
        // this.view.showFrom(options.from);
    }

    onEvent (data: object) {
        console.log('onevent', data)
        this.data = data;
        let newLeft = data.newLeft;
        console.log('newLeft', newLeft)

    }

    testFunc() {
        console.log('testfunc', this.data)
    }


}
