import './style.css'
import { Model } from './Model'
import { View } from './View'
import {Thumb} from './Thumb'
import {Controller} from './Controller'
import {Options, OptionsInterface} from './Options'
import { Observable } from './Observable'

$.fn.slider = function (settings: object) : JQuery {
    const options = new Options(settings);
    let controllers = new Map<HTMLElement, Controller>()

    this.each(function () {
        const node = this as HTMLElement;
        const model = new Model(options);
        const view = new View();
        const thumb = new Thumb(node);
        const controller = new Controller(model, view, thumb);
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

    // Save this instance for easy access from outside
    this.data('slider', this);

    return this // jQuery object for chaining
}
/////////////////////////////////////////////////////////////////
$(document).ready(() => {
    const input = document.querySelector('.slider-input') as HTMLInputElement;

    const mySlider = $('.slider').slider({
        type: 'single',
        // orientation: 'vertical'
    });

    // mySlider.data('slider').update({
    //     orientation: 'horizontal'
    // });

    mySlider.on('slider.valueCalced', function (event, value) {
        input.value = value;
    });

    input.oninput = function() {
        const value = parseInt(input.value)
        if (isNaN(value)) {
            return;
        }
        mySlider.data('slider').update(value);
    };
})