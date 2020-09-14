import './style.css'
import { Model } from './Model'
import { View } from './View'
import {Controller} from './Controller'
import {Options, OptionsInterface} from './Options'


$.fn.slider = function (settings: object) {
    const options = new Options(settings);

    this.each(function () {
        const node = this
        console.log(node)
        let options = new Options(settings);
        console.log(options);
        let model = new Model();
        let view = new View();
        let controller = new Controller(model, view);
        model.addObserver(controller);
        view.addObserver(controller);
        model.init(options, node);
    })

    // Public API
    this.update = function (settings) {
        console.log(settings);
    }

    // Save this instance for easy access from outside
    this.data('slider', this);

    return this // jQuery object for chaining
}

$(document).ready(() => {
    var mySlider = $('.slider').slider({
        orientation: 'horizontal'
    });
    mySlider.data('slider').update({
        orientation: 'horizontal'
    });
})
