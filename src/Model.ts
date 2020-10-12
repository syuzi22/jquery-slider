import {Observable} from './Observable'
import { CalcedValue, CalcedFromValue, CalcedToValue, calcedAdjustedValue, calcedAdjustedFromValue, calcedAdjustedToValue, CalcedItemsStep } from './Event'

export class Model extends Observable {
    private sliderWidth: number;
    private value: number = 0;
    private fromValue: number = 0;
    private toValue: number = 0;
    private adjustedValue: number = 0;
    private adjustedFromValue: number = 0;
    private adjustedToValue: number = 0;
    options: object;

    constructor(options: object) {
        super();
        this.options = options;
    }

    updateSliderWidth(val: number) {
        this.sliderWidth = val;
    }

    ////////////////////////////SINGLE///////////////////////////////////////////////////////////////
    calcValue(position?: number) {
        if (position < 0) {
            position = 0;
        } else if (position > this.sliderWidth) {
            position = this.sliderWidth;
        }
        if (position) {
            this.value = Math.round(((position * (this.options.max - this.options.min)) / this.sliderWidth) / this.options.step) * this.options.step;
        } else {
            this.value = Math.ceil(this.options.to / this.options.step) * this.options.step;
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
    ////////////////////////////SINGLE///////////////////////////////////////////////////////////////

    ////////////////////////////DOUBLE////////////////////////////////////////////////////////////////////////////////////////
    calcFromValue(position?: number) {
        if (position) {
            this.fromValue = Math.round(((position * (this.options.max - this.options.min)) / this.sliderWidth) / this.options.step) * this.options.step;
        } else {
            this.fromValue = Math.ceil(this.options.from / this.options.step) * this.options.step;
        }
        const calcedFromValue = new CalcedFromValue(this.fromValue);
        this.notifyObservers(calcedFromValue)
        this.calcAdjustedFromValue();
    }

    calcToValue(position?: number) {
        if (position) {
            this.toValue  = Math.round(((position * (this.options.max - this.options.min)) / this.sliderWidth) / this.options.step) * this.options.step;
        } else {
            this.toValue  = Math.ceil(this.options.to / this.options.step) * this.options.step;
        }
        const calcedToValue = new CalcedToValue(this.toValue);
        this.notifyObservers(calcedToValue)
        this.calcAdjustedToValue();
    }

    calcAdjustedFromValue() {
        this.adjustedFromValue = Math.round(this.fromValue * ((this.sliderWidth / (this.options.max - this.options.min)) * this.options.step) / this.options.step);
        const adjustedFromValueCalced = new calcedAdjustedFromValue(this.adjustedFromValue);
        this.notifyObservers(adjustedFromValueCalced);
    }

    calcAdjustedToValue() {
        this.adjustedToValue = Math.round(this.toValue * ((this.sliderWidth / (this.options.max - this.options.min)) * this.options.step) / this.options.step);
        const adjustedToValueCalced = new calcedAdjustedToValue(this.adjustedToValue);
        this.notifyObservers(adjustedToValueCalced);
    }

    ////////////////////////////DOUBLE////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////ITEMS////////////////////////////////////////////////////////////////////////////////////////
    calcItemsStep(itemsNum: number) {
        this.options.step = this.sliderWidth / itemsNum;
        const calcedItemsStep = new CalcedItemsStep(this.sliderWidth / itemsNum);
        this.notifyObservers(calcedItemsStep);
    }
    ////////////////////////////ITEMS////////////////////////////////////////////////////////////////////////////////////////


    //API
    // updateValue(value: number) {
    //     const that = this;
    //     if (this.timerId) {
    //         clearTimeout(this.timerId);
    //     }
    //     this.value = Math.round(value / this.options.step) * this.options.step;
    //     if (this.value > this.options.max) {
    //         this.value = this.options.min;
    //     }else if (this.value < this.options.min) {
    //         this.value = this.options.min;
    //     }
    //     const calcedValue = new CalcedValue(this.value);
    //     this.timerId = setTimeout(function() {
    //         that.notifyObservers(calcedValue);
    //         that.calcAdjustedValue();
    //     }, 1000);
    // }


    updateStep(value: number) {
        this.options.step = value;
    }


}