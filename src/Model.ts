import {Observable} from './Observable'
import { CalcedValueHor, CalcedValueVer, CalcedFromValueHor, CalcedFromValueVer, CalcedToValueHor, CalcedToValueVer, CalcedAdjustedValueHor, CalcedAdjustedValueVer, CalcedAdjustedFromValueHor, CalcedAdjustedFromValueVer, CalcedAdjustedToValueHor, CalcedAdjustedToValueVer, CalcedItemsStep_H, CalcedItemsStep_V} from './Event'
import { Options, OptionsInterface } from './Options';

export class Model extends Observable {
    private sliderWidth: number;
    private sliderHeight: number;
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

    updateSliderHeight(val: number) {
        this.sliderHeight = val;
    }

    ////////////////////////////SINGLE///////////////////////////////////////////////////////////////
    /**
     * Calculates numeric value matching the current thumb offset.
     * @param position Offset of the slider thumb relative to the slider start position, in pixels.
     */
    calcValue_H(position?: number) {
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

        const calcedValueHor = new CalcedValueHor(this.value);
        this.notifyObservers(calcedValueHor)
        this.calcAdjustedValue_H();
    }


    calcValue_V(position?: number) {
        if (position === undefined) {
            this.value = this.options.step * Math.ceil(this.options.to / this.options.step);
        } else {
            this.value = this.options.min + Math.round(((position * (this.options.max - this.options.min)) / this.sliderHeight) / this.options.step) * this.options.step;
        }

        if (this.value > this.options.max) {
            this.value = this.options.max;
        } else if (this.value < this.options.min) {
            this.value = this.options.min;
        }

        const calcedValueVer = new CalcedValueVer(this.value);
        this.notifyObservers(calcedValueVer)
        this.calcAdjustedValue_V();
    }

    /**
     * According to this.value, calculates an offset relative to the slider start position, in pixels
     */
    calcAdjustedValue_H() {
        const oneInPxl = this.sliderWidth / (this.options.max - this.options.min);
        const diff = this.value - this.options.min;
        this.adjustedValue = Math.round((diff * oneInPxl * this.options.step) / this.options.step);
        const adjustedValueCalcedHor = new CalcedAdjustedValueHor(this.adjustedValue);
        this.notifyObservers(adjustedValueCalcedHor);
    }

    calcAdjustedValue_V() {
        const oneInPxl = this.sliderHeight / (this.options.max - this.options.min);
        const diff = this.value - this.options.min;
        this.adjustedValue = Math.round((diff * oneInPxl * this.options.step) / this.options.step);
        const adjustedValueCalcedVer = new CalcedAdjustedValueVer(this.adjustedValue);
        this.notifyObservers(adjustedValueCalcedVer);
    }


    ////////////////////////////DOUBLE////////////////////////////////////////////////////////////////////////////////////////
    calcFromValue_H(position?: number) {
        if (position === undefined) {
            // this.fromValue = Math.ceil(this.options.from / this.options.step) * this.options.step;
            this.fromValue = this.options.from;
        } else {
            this.fromValue = this.options.min + Math.round(((position * (this.options.max - this.options.min)) / this.sliderWidth) / this.options.step) * this.options.step;
        }
        this.fromValue = Math.max(this.options.min, this.fromValue);
        const calcedFromValueHor = new CalcedFromValueHor(this.fromValue);

        this.notifyObservers(calcedFromValueHor)
        this.calcAdjustedFromValue_H();
    }

    calcFromValue_V(position?: number) {
        if (position === undefined) {
            // this.fromValue = Math.ceil(this.options.from / this.options.step) * this.options.step;
            this.fromValue = this.options.from;
        } else {
            this.fromValue = this.options.min + Math.round(((position * (this.options.max - this.options.min)) / this.sliderHeight) / this.options.step) * this.options.step;
        }
        this.fromValue = Math.max(this.options.min, this.fromValue);
        const calcedFromValueVer = new CalcedFromValueVer(this.fromValue);

        this.notifyObservers(calcedFromValueVer)
        this.calcAdjustedFromValue_V();
    }

    calcToValue_H(position?: number) {
        if (position === undefined) {
            // this.toValue = Math.ceil(this.options.to / this.options.step) * this.options.step;
            this.toValue = this.options.to;
        } else {
            this.toValue = this.options.min + Math.round(((position * (this.options.max - this.options.min)) / this.sliderWidth) / this.options.step) * this.options.step;
        }
        // this.toValue must be a power of this.options.step

        this.toValue = Math.min(this.toValue, this.options.max);

        const calcedToValueHor = new CalcedToValueHor(this.toValue);
        this.notifyObservers(calcedToValueHor)
        this.calcAdjustedToValue_H();
    }

    calcToValue_V(position?: number) {
        if (position === undefined) {
            // this.toValue = Math.ceil(this.options.to / this.options.step) * this.options.step;
            this.toValue = this.options.to;
        } else {
            this.toValue = this.options.min + Math.round(((position * (this.options.max - this.options.min)) / this.sliderHeight) / this.options.step) * this.options.step;
        }
        // this.toValue must be a power of this.options.step

        this.toValue = Math.min(this.toValue, this.options.max);

        const calcedToValueVer = new CalcedToValueVer(this.toValue);
        this.notifyObservers(calcedToValueVer)
        this.calcAdjustedToValue_V();
    }

    calcAdjustedFromValue_H() {
        let oneInPxl = this.sliderWidth / (this.options.max - this.options.min);
        let diff = this.fromValue - this.options.min;
        this.adjustedFromValue = Math.round((diff * oneInPxl * this.options.step) / this.options.step);
        const adjustedFromValueCalcedHor = new CalcedAdjustedFromValueHor(this.adjustedFromValue);
        this.notifyObservers(adjustedFromValueCalcedHor);
    }

    calcAdjustedFromValue_V() {
        let oneInPxl = this.sliderHeight / (this.options.max - this.options.min);
        let diff = this.fromValue - this.options.min;
        this.adjustedFromValue = Math.round((diff * oneInPxl * this.options.step) / this.options.step);
        const adjustedFromValueCalcedVer = new CalcedAdjustedFromValueVer(this.adjustedFromValue);
        this.notifyObservers(adjustedFromValueCalcedVer);
    }

    calcAdjustedToValue_H() {
        let oneInPxl = this.sliderWidth / (this.options.max - this.options.min);
        let diff = this.toValue - this.options.min;
        this.adjustedToValue = Math.round((diff * oneInPxl * this.options.step) / this.options.step);
        const adjustedToValueCalcedHor = new CalcedAdjustedToValueHor(this.adjustedToValue);
        this.notifyObservers(adjustedToValueCalcedHor);
    }

    calcAdjustedToValue_V() {
        let oneInPxl = this.sliderHeight / (this.options.max - this.options.min);
        let diff = this.toValue - this.options.min;
        this.adjustedToValue = Math.round((diff * oneInPxl * this.options.step) / this.options.step);
        const adjustedToValueCalcedVer = new CalcedAdjustedToValueVer(this.adjustedToValue);
        this.notifyObservers(adjustedToValueCalcedVer);
    }

    ////////////////////////////



    ////////////////////////////ITEMS////////////////////////////////////////////////////////////////////////////////////////
    calcItemsStep_H(itemsNum: number) {
        this.itemsStep = this.sliderWidth / itemsNum
        const calcedItemsStepHor = new CalcedItemsStep_H(this.itemsStep);
        this.notifyObservers(calcedItemsStepHor);
    }
    calcItemsStep_V(itemsNum: number) {
        this.itemsStep = this.sliderHeight / itemsNum
        const calcedItemsStepVer = new CalcedItemsStep_V(this.itemsStep);
        this.notifyObservers(calcedItemsStepVer);
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
        if (this.options.orientation === 'vertical') {
            const calcedValueVer = new CalcedValueVer(this.value);
            this.timerId = window.setTimeout(function() {
                that.notifyObservers(calcedValueVer)
                that.calcAdjustedValue_V();
            }, 1000);
        } else {
            const calcedValueHor = new CalcedValueHor(this.value);
            this.timerId = window.setTimeout(function() {
                that.notifyObservers(calcedValueHor)
                that.calcAdjustedValue_H();
            }, 1000);
        }
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
        if (this.options.orientation === 'vertical') {
            const calcedFromValueVer = new CalcedFromValueVer(this.fromValue);
            this.timerId = window.setTimeout(function() {
                that.notifyObservers(calcedFromValueVer);
                that.calcAdjustedFromValue_V();
            }, 1000);
        } else {
            const calcedFromValueHor = new CalcedFromValueHor(this.fromValue);
            this.timerId = window.setTimeout(function() {
                that.notifyObservers(calcedFromValueHor);
                that.calcAdjustedFromValue_H();
            }, 1000);
        }
    }

    updateValueTo(value: number) {
        const that = this;
        if (this.timerId) {
            window.clearTimeout(this.timerId);
        }
        this.toValue = Math.round(value / this.options.step) * this.options.step;
        if (this.toValue < this.fromValue) {
            this.toValue  =  this.fromValue;
        } else if (this.toValue > this.options.max) {
            this.toValue = this.options.max;
        }
        if (this.options.orientation === 'vertical') {
            const calcedToValueVer = new CalcedToValueVer(this.toValue);
            this.timerId = window.setTimeout(function() {
                that.notifyObservers(calcedToValueVer);
                that.calcAdjustedToValue_V();
            }, 1000);
        } else {
            const calcedToValueHor = new CalcedToValueHor(this.toValue);
            this.timerId = window.setTimeout(function() {
                that.notifyObservers(calcedToValueHor);
                that.calcAdjustedToValue_H();
            }, 1000);
        }

    }
}