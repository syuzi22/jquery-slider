import {Observable} from './Observable'
import { CalcedValue, AdjustedValue } from './Event'

export class Model extends Observable {
    private sliderWidth: number;
    private value: number = 0;
    private adjustedValue: number = 0;
    options: object;

    constructor(options: object) {
        super();
        this.options = options;
        // this.type = options.type;
        // this.min = options.min;
        // this.max = options.max;
        // this.from = options.from;
        // this.to = options.to;
        // this.step = options.step;
        // this.items = options.items;
        // this.grid = options.grid;
        // this.progressBar = options.progressBar;
        // this.orientation = options.orientation;
        // this.hide_min_max = options.hide_min_max;
        // this.hide_from_to = options.hide_from_to;
    }
    updateSliderWidth(val: number) {
        this.sliderWidth = val; //290
    }

    calcValue(position: number) {
        this.value = Math.round(((position * (this.options.max - this.options.min)) / this.sliderWidth) / this.options.step) * this.options.step;
        const calcedValue = new CalcedValue(this.value);
        this.notifyObservers(calcedValue)
    }

    calcAdjustedValue() {
        this.adjustedValue = Math.round(this.value * ((this.sliderWidth / (this.options.max - this.options.min)) * this.options.step) / this.options.step);
        const adjustedValue = new AdjustedValue(this.adjustedValue);
        this.notifyObservers(adjustedValue);
    }

    updateValue(value) {
        const that = this;
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
        this.value = Math.round(value / this.options.step) * this.options.step;
        if (this.value > this.options.max) {
            this.value = this.options.max;
        }
        const calcedValue = new CalcedValue(this.value);
        this.timerId = setTimeout(function() {
            that.notifyObservers(calcedValue);
            that.calcAdjustedValue();
        }, 1000);

    }





}