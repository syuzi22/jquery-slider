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

    // Public APIx

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

    //////////////

    this.changeStep = function (value: number) {
        this.each(function () {
            const node = this as HTMLElement;
            if (!controllers.has(node)) {
                return;
            }
            controllers.get(node).changeStep(value);
        });
    };

    this.changeMin = function (value: number) {
        this.each(function () {
            const node = this as HTMLElement;
            if (!controllers.has(node)) {
                return;
            }
            controllers.get(node).changeMin(value);
        });
    };

    this.changeMax = function (value: number) {
        this.each(function () {
            const node = this as HTMLElement;
            if (!controllers.has(node)) {
                return;
            }
            controllers.get(node).changeMax(value);
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

    this.hideGrid = function (value: boolean) {
        this.each(function () {
            const node = this as HTMLElement;
            if (!controllers.has(node)) {
                return;
            }
            controllers.get(node).hideGrid(value);
        });
    };

    this.hideMinMax = function (value: boolean) {
        this.each(function () {
            const node = this as HTMLElement;
            if (!controllers.has(node)) {
                return;
            }
            controllers.get(node).hideMinMax(value);
        });
    };
    ////////////////////////////////////


    this.data('slider', this); // Save this instance for easy access from outside
    return this // jQuery object for chaining
}








/////////////////////////////////////////////////////////////////
//создаю слайдер, как внешний пользователь\/

$(document).ready(() => {
    const input = document.querySelector('.slider-input') as HTMLInputElement;
    const inputFrom = document.querySelector('.slider-input-from') as HTMLInputElement;
    const inputTo = document.querySelector('.slider-input-to') as HTMLInputElement;
    const inputStep = document.querySelector('.slider-step') as HTMLInputElement;
    const inputMin = document.querySelector('.slider-min') as HTMLInputElement;
    const inputMax = document.querySelector('.slider-max') as HTMLInputElement;


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
        .on('slider.step', function (event, value) {
            inputStep.value = value;
        })
        .on('slider.min', function (event, value) {
            inputMin.value = value;
        })
        .on('slider.max', function (event, value) {
            inputMax.value = value;
        })
        .slider({
            type: 'double',
            min: 10,
            max: 90,
            from: 20, // если single, то этот параметр не учитывается
            to: 80,
            step: 10,
            items: ['junior', 'middle', 'senior'],
            orientation: 'vertical',
            hideGrid: false,
            hideValue: false,
            hideMinMax: false
        });


    /////////////////////
    input.oninput = function() {
        const value = parseInt(input.value)
        if (isNaN(value)) {
            return;
        }
        mySlider.data('slider').update(value);
    };
    //////////////////////////

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

    inputStep.onkeypress = function(event) {
        const value = parseInt(inputStep.value)
        if (isNaN(value)) {
            return;
        }
        if (event.code === 'Enter'){
            event.preventDefault();
            mySlider.data('slider').changeStep(value);
        }
    }

    inputMin.onkeypress = function(event) {
        const value = parseInt(inputMin.value)
        if (isNaN(value)) {
            return;
        }
        if (event.code === 'Enter'){
            event.preventDefault();
            mySlider.data('slider').changeMin(value);
        }
    }

    inputMax.onkeypress = function(event) {
        const value = parseInt(inputMax.value)
        if (isNaN(value)) {
            return;
        }
        if (event.code === 'Enter'){
            event.preventDefault();
            mySlider.data('slider').changeMax(value);
        }
    }


     ////////////////////////////////////////////
    let singleBut = document.getElementById('button__single');
    let doubleBut = document.getElementById('button__double');
    let itemsBut = document.getElementById('button__items');
    let hideValue = document.getElementById('hidevalue');
    let hideGrid = document.getElementById('hidegrid');
    let hideMinMax = document.getElementById('hideminmax');

    singleBut.onclick = function() {
        mySlider.data('slider').changeView('single');
    }
    doubleBut.onclick = function(event) {
        mySlider.data('slider').changeView('double');
    }
    itemsBut.onclick = function() {
        mySlider.data('slider').changeView('items');
    }

    hideValue.oninput = function() {
        if (hideValue.checked) {
            mySlider.data('slider').hideValue(true);
        } else {
            mySlider.data('slider').hideValue(false);
        }
    }

    hideGrid.oninput = function() {
        if (hideGrid.checked) {
            mySlider.data('slider').hideGrid(true);
        } else {
            mySlider.data('slider').hideGrid(false);
        }
    }

    hideMinMax.oninput = function() {
        if (hideMinMax.checked) {
            mySlider.data('slider').hideMinMax(true);
        } else {
            mySlider.data('slider').hideMinMax(false);
        }
    }
})