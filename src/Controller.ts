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
        this.view.show(this.model.node);
        if (options.orientation === 'vertical' ) {
            this.view.setOrientation(options.orientation);
            this.view.addThumbMovementVertical(this.model.node);
        }else {
            this.view.setOrientation();
            this.view.addThumbMovementHorizontal(this.model.node);
        }
    }
}
