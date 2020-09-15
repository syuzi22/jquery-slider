import {Observable} from './Observable'

export class Model extends Observable {

    calcValue(options) {
        // options.sliderWidth
        // options.newLeft
        // options.max
        // options.min
        // options.step
        let length = options.max - options.min;
        let stepPixels = (options.sliderWidth / length) * options.step
        let value = (options.newLeft * length) / options.sliderWidth;
        value = Math.round(value / options.step) * options.step;
        return value;
    }

}