import './style.css'
import { Model } from './Model'
import { View } from './View'
import {Thumb} from './Thumb'
import {Controller} from './Controller'
import {Options, OptionsInterface} from './Options'


$.fn.slider = function (settings: object) : JQuery {
    const options = new Options(settings);

    this.each(function () {
        const node = this;
        const model = new Model();
        const view = new View();
        const thumb = new Thumb(node);
        const controller = new Controller(model, view, thumb);
        controller.init(options, node);
        controller.testFunc();
    })

    // Public API
    // this.update = function (settings) {
    //     console.log(settings);
    // }

    // Save this instance for easy access from outside
    this.data('slider', this);

    return this // jQuery object for chaining
}
/////////////////////////////////////////////////////////////////
// Usage
$(document).ready(() => {
    var mySlider = $('.slider').slider({
        type: 'single',
        // orientation: 'vertical'
    });
    // mySlider.on('slider.onValueChange', (newValue, oldValue) => {
    //     console.log(`slider value changed from ${oldValue} ${newValue}`)
    // })
    // mySlider.data('slider').update({
    //     orientation: 'horizontal'
    // });
})
