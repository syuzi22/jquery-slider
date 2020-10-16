import './style.css'
import {Controller} from './Controller'
import {Options} from './Options'

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

     ////////////////////////////////////////////
    this.changeView = function (view: string) {
        this.each(function () {
            const node = this as HTMLElement;
            if (!controllers.has(node)) {
                return;
            }
            controllers.get(node).changeView(view);
        });
    }
     ////////////////////////////////////////////

    this.update = function (value: number) {
        this.each(function () {
            const node = this as HTMLElement;
            if (!controllers.has(node)) {
                return;
            }
            controllers.get(node).updateValue(value);
        });
    };

    this.updateFrom = function (value: number) {
        this.each(function () {
            const node = this as HTMLElement;
            if (!controllers.has(node)) {
                return;
            }
            controllers.get(node).updateValueFrom(value);
        });
    };

    this.updateTo = function (value: number) {
        this.each(function () {
            const node = this as HTMLElement;
            if (!controllers.has(node)) {
                return;
            }
            controllers.get(node).updateValueTo(value);
        });
    };

    ///////////////////////////////

    this.hideValue = function (value: boolean) {
        this.each(function () {
            const node = this as HTMLElement;
            if (!controllers.has(node)) {
                return;
            }
            controllers.get(node).hideValue(value);
        });
    };

    this.data('slider', this); // Save this instance for easy access from outside
    return this // jQuery object for chaining
}

/////////////////////////////////////////////////////////////////
//создаю слайдер, как внешний пользователь\/

$(document).ready(() => {
    const input = document.querySelector('.slider-input') as HTMLInputElement;
    const inputFrom = document.querySelector('.slider-input-from') as HTMLInputElement;
    const inputTo = document.querySelector('.slider-input-to') as HTMLInputElement;


    const mySlider = $('.slider')
        .on('slider.valueCalced', function (event, value) {
            input.value = value;
        })
        .on('slider.valueFromCalced', function (event, value) {
            inputFrom.value = value;
        })
        .on('slider.valueToCalced', function (event, value) {
            inputTo.value = value;
        })
        .slider({
            type: 'double',
            min: 10,
            max: 90,
            from: 20, // если single, то этот параметр не учитывается
            to: 80,
            step: 1,
            items: ['junior', 'middle', 'senior'],
            // grid: false,
            // progressBar: true,
            // orientation: 'horizontal',
            // hide_min_max: false,
            // hideValue: true
        });


    input.oninput = function() {
        const value = parseInt(input.value)
        if (isNaN(value)) {
            return;
        }
        mySlider.data('slider').update(value);
    };

    inputFrom.oninput = function() {
        const value = parseInt(inputFrom.value)
        if (isNaN(value)) {
            return;
        }
        mySlider.data('slider').updateFrom(value);
    };

    inputTo.oninput = function() {
        const value = parseInt(inputTo.value)
        if (isNaN(value)) {
            return;
        }
        mySlider.data('slider').updateTo(value);
    };

     ////////////////////////////////////////////
    let singleBut = document.getElementById('button__single');
    let doubleBut = document.getElementById('button__double');
    let itemsBut = document.getElementById('button__items');
    let hideValue = document.getElementById('button__hidevalue');
    let showValue = document.getElementById('button__showvalue');

    singleBut.onclick = function() {
        mySlider.data('slider').changeView('single');
    }
    doubleBut.onclick = function(event) {
        mySlider.data('slider').changeView('double');
    }
    itemsBut.onclick = function() {
        mySlider.data('slider').changeView('items');
    }

    hideValue.onclick = function() {
        mySlider.data('slider').hideValue(true);
    }

    showValue.onclick = function() {
        mySlider.data('slider').hideValue(false);
    }
    /////////////////////////////////////////////




})