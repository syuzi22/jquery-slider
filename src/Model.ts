import {Observable} from './Observable'
import { CalcedValue, CalcedFromValue, CalcedToValue, CalcedAdjustedValue, CalcedAdjustedFromValue, CalcedAdjustedToValue, CalcedItemsStep } from './Event'
import { Options, OptionsInterface } from './Options';

export class Model extends Observable {
    private sliderWidth: number;
    private value: number = 0;
    private fromValue: number = 0;
    private toValue: number = 0;
    private adjustedValue: number = 0;
    private adjustedFromValue: number = 0;
    private adjustedToValue: number = 0;
    private itemsStep: number = 0;
    timerId: number;
    options: OptionsInterface;

    constructor(options: OptionsInterface) {
        super();
        this.options = options;
    }

    updateSliderWidth(val: number) {
        this.sliderWidth = val;
    }

    ////////////////////////////SINGLE///////////////////////////////////////////////////////////////
    /**
     * Calculates numeric value matching the current thumb offset.
     * @param position Offset of the slider thumb relative to the slider start position, in pixels.
     */
    calcValue(position?: number) {
        if (position === undefined) {
            this.value = this.options.step * Math.ceil(this.options.to / this.options.step);
        } else {
            this.value = this.options.min + Math.round(((position * (this.options.max - this.options.min)) / this.sliderWidth) / this.options.step) * this.options.step;
        }

        if (this.value > this.options.max) {
            this.value = this.options.max;
        } else if (this.value < this.options.min) {
            this.value = this.options.min;
        }

        const calcedValue = new CalcedValue(this.value);
        this.notifyObservers(calcedValue)
        this.calcAdjustedValue();
    }

    /**
     * According to this.value, calculates an offset relative to the slider start position, in pixels
     */
    calcAdjustedValue() {
        const oneInPxl = this.sliderWidth / (this.options.max - this.options.min);
        const diff = this.value - this.options.min;
        this.adjustedValue = Math.round((diff * oneInPxl * this.options.step) / this.options.step);
        const adjustedValueCalced = new CalcedAdjustedValue(this.adjustedValue);
        this.notifyObservers(adjustedValueCalced);
    }

    ////////////////////////////DOUBLE////////////////////////////////////////////////////////////////////////////////////////
    calcFromValue(position?: number) {
        if (position === undefined) {
            // this.fromValue = Math.ceil(this.options.from / this.options.step) * this.options.step;
            this.fromValue = this.options.from;
        } else {
            this.fromValue = this.options.min + Math.round(((position * (this.options.max - this.options.min)) / this.sliderWidth) / this.options.step) * this.options.step;
        }
        this.fromValue = Math.max(this.options.min, this.fromValue);
        const calcedFromValue = new CalcedFromValue(this.fromValue);
        console.log('calc from value ', this.fromValue)
        this.notifyObservers(calcedFromValue)
        this.calcAdjustedFromValue();
    }

    calcToValue(position?: number) {
        if (position === undefined) {
            // this.toValue = Math.ceil(this.options.to / this.options.step) * this.options.step;
            this.toValue = this.options.to;
        } else {
            this.toValue = this.options.min + Math.round(((position * (this.options.max - this.options.min)) / this.sliderWidth) / this.options.step) * this.options.step;
        }
        // this.toValue must be a power of this.options.step
        this.toValue =
        this.toValue = Math.min(this.toValue, this.options.max);
        console.log("calc to value", this.toValue);
        const calcedToValue = new CalcedToValue(this.toValue);
        this.notifyObservers(calcedToValue)
        this.calcAdjustedToValue();
    }

    calcAdjustedFromValue() {
        let oneInPxl = this.sliderWidth / (this.options.max - this.options.min);
        let diff = this.fromValue - this.options.min;
        this.adjustedFromValue = Math.round((diff * oneInPxl * this.options.step) / this.options.step);
        const adjustedFromValueCalced = new CalcedAdjustedFromValue(this.adjustedFromValue);
        this.notifyObservers(adjustedFromValueCalced);
    }

    calcAdjustedToValue() {
        let oneInPxl = this.sliderWidth / (this.options.max - this.options.min);
        let diff = this.toValue - this.options.min;
        this.adjustedToValue = Math.round((diff * oneInPxl * this.options.step) / this.options.step);
        const adjustedToValueCalced = new CalcedAdjustedToValue(this.adjustedToValue);
        this.notifyObservers(adjustedToValueCalced);
    }

    ////////////////////////////ITEMS////////////////////////////////////////////////////////////////////////////////////////
    calcItemsStep(itemsNum: number) {
        this.itemsStep = this.sliderWidth / itemsNum
        const calcedItemsStep = new CalcedItemsStep(this.itemsStep);
        this.notifyObservers(calcedItemsStep);
    }

    ////////////////////////API///////////////////////////////////////////////
    updateValue(value: number) {
        const that = this;
        if (this.timerId) {
            window.clearTimeout(this.timerId);
        }
        this.value = Math.round(value / this.options.step) * this.options.step;
        if (this.value > this.options.max) {
            this.value = this.options.min;
        } else if (this.value < this.options.min) {
            this.value = this.options.min;
        }
        const calcedValue = new CalcedValue(this.value);
        this.timerId = window.setTimeout(function() {
            that.notifyObservers(calcedValue);
            that.calcAdjustedValue();
        }, 1000);
    }

    updateValueFrom(value: number) {
        const that = this;
        if (this.timerId) {
            window.clearTimeout(this.timerId);
        }
        this.fromValue = Math.round(value / this.options.step) * this.options.step;
        if (this.fromValue > this.toValue) {
            this.fromValue =  this.toValue;
        } else if (this.fromValue < this.options.min) {
            this.fromValue = this.options.min;
        }
        const calcedFromValue = new CalcedFromValue(this.fromValue);
        this.timerId = window.setTimeout(function() {
            that.notifyObservers(calcedFromValue);
            that.calcAdjustedFromValue();
        }, 1000);
    }

    updateValueTo(value: number) {
        const that = this;
        if (this.timerId) {
            window.clearTimeout(this.timerId);
        }
        this.toValue = Math.round(value / this.options.step) * this.options.step;
        if (this.toValue < this.fromValue) {
            this.toValue  =  this.fromValue;
        } else
        if (this.toValue > this.options.max) {
            this.toValue = this.options.max;
        }
        const calcedToValue = new CalcedToValue(this.toValue);
        this.timerId = window.setTimeout(function() {
            that.notifyObservers(calcedToValue);
            that.calcAdjustedToValue();
        }, 1000);
    }
}