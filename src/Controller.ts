import {Model} from './Model'
import {View} from './View'

export class Controller {
    private model: Model
    private view: View
    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
    }
    onEvent (options) {
        // console.log(options);
        this.view.show(this.model.node);
        if (options.orientation === 'vertical' ) {
            this.view.setOrientation(options.orientation);
        }else {
            this.view.setOrientation();
        }
    }
}
