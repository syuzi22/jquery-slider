import {Model} from './Model'
import {View} from './View'
import {Thumb} from './Thumb'
import {Options} from './Options'
import { ThumbChangedPosition, CalcedValue, AdjustedValue, CalcedSliderWidth } from './Event'

export class Controller {
    private model: Model
    private view: View
    private thumb: Thumb

    options: object
    node: Element

    constructor(model: Model, view: View, thumb: Thumb) {
        this.model = model;
        this.view = view;
        this.thumb = thumb;
    }

    init (options: Options, node: Element): void {
        this.options = options
        this.node = node

        this.model.addObserver(this)
        this.view.addObserver(this)
        this.thumb.addObserver(this)

        this.view.createShell(node);
        this.view.drawLine(options.orientation);
        this.view.showMinMax(options.min, options.max);


        this.thumb.create();
        this.thumb.showHorizontal();
        this.thumb.addHorizontalMovement();
        this.thumb.showFrom();

    }
    onEvent (obj: object) {
        if (obj instanceof CalcedSliderWidth) {
            this.model.updateSliderWidth(obj.value);
        }else if (obj instanceof ThumbChangedPosition) {
            this.model.calcValue(obj.position);
            this.model.calcAdjustedValue();
        }else if (obj instanceof CalcedValue) {
            // this.model.calcAdjustedValue();
            this.thumb.setValue(obj.value);
            $(this.node).trigger('slider.valueCalced', [obj.value])
        }else if (obj instanceof AdjustedValue) {
            this.thumb.setAdjustedValue(obj.value);
        }
    }

    updateValue(value: number) {
        this.model.updateValue(value)
    }



}
