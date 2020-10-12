import './style.css'
import {Controller} from './Controller'
import {Options, OptionsInterface} from './Options'

$.fn.slider = function (settings: object) : JQuery {
    const options = new Options(settings);
    let controllers = new Map<HTMLElement, Controller>()

    this.each(function () {
        const node = this as HTMLElement;
        const controller = new Controller();
        controller.init(options, node);
        controllers.set(node, controller);
    })

    // Public API
    this.update = function (value: number) {
        this.each(function () {
            const node = this as HTMLElement;
            if (!controllers.has(node)) {
                return;
            }
            controllers.get(node).updateValue(value);
        });
    };

    this.hideFrom = function (value: boolean) {
        this.each(function () {
            const node = this as HTMLElement;
            if (!controllers.has(node)) {
                return;
            }
            controllers.get(node).hideValueFrom(value);
        });
    };

    this.hideTo = function (value: boolean) {
        this.each(function () {
            const node = this as HTMLElement;
            if (!controllers.has(node)) {
                return;
            }
            controllers.get(node).hideValueTo(value);
        });
    };

    this.changeStep = function (step: number) {
        this.each(function () {
            const node = this as HTMLElement;
            if (!controllers.has(node)) {
                return;
            }
            controllers.get(node).changeStep(step);
        });
    };


    this.data('slider', this); // Save this instance for easy access from outside
    return this // jQuery object for chaining
}

/////////////////////////////////////////////////////////////////
//создаю слайдер, как внешний пользователь\/

$(document).ready(() => {
    const input = document.querySelector('.slider-input') as HTMLInputElement;

    const mySlider = $('.slider')
        .on('slider.valueCalced', function (event, value) {
            input.value = value;
        })
        .slider({
            type: 'single',
            // min: 10,
            // max: 90,
            // from: 20, // если single, то этот параметр не учитывается
            // to: 80,
            // step: 20,
            items: ['junior', 'middle', 'senior'],
            // grid: false,
            // progressBar: true,
            // orientation: 'horizontal',
            // hide_min_max: false,
            // hide_from_to: false
        });


    input.oninput = function() {
        const value = parseInt(input.value)
        if (isNaN(value)) {
            return;
        }
        mySlider.data('slider').update(value);
    };

    mySlider.data('slider').hideFrom(false);
    mySlider.data('slider').hideTo(false);
    // mySlider.data('slider').changeStep(10);

})