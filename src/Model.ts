import {Observable} from './Observable'
import { CalcedValue, calcedAdjustedValue } from './Event'

export class Model extends Observable {
    private sliderWidth: number;
    private value: number = 0;
    private adjustedValue: number = 0;
    options: object;

    constructor(options: object) {
        super();
        this.options = options;
        this.value = this.options.from;
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

    calcValue(position?: number) {
        if (position) {
            this.value = Math.round(((position * (this.options.max - this.options.min)) / this.sliderWidth) / this.options.step) * this.options.step;
        } else {
            this.value = Math.ceil(this.options.from / this.options.step) * this.options.step;
        }
        const calcedValue = new CalcedValue(this.value);
        this.notifyObservers(calcedValue)
        this.calcAdjustedValue();
    }

    calcAdjustedValue() {
        this.adjustedValue = Math.round(this.value * ((this.sliderWidth / (this.options.max - this.options.min)) * this.options.step) / this.options.step);
        const adjustedValueCalced = new calcedAdjustedValue(this.adjustedValue);
        this.notifyObservers(adjustedValueCalced);
    }

    updateValue(value: number) {
        const that = this;
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
        this.value = Math.round(value / this.options.step) * this.options.step;
        if (this.value > this.options.max) {
            this.value = this.options.min;
        }else if (this.value < this.options.min) {
            this.value = this.options.min;
        }
        const calcedValue = new CalcedValue(this.value);
        this.timerId = setTimeout(function() {
            that.notifyObservers(calcedValue);
            that.calcAdjustedValue();
        }, 1000);
    }



    updateSliderWidth(val: number) {
        this.sliderWidth = val; //290
    }

    updateStep(value: number) {
        this.options.step = value;
    }





}