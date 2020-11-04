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

    this.changeView = function (view: string) {
        this.each(function () {
            const node = this as HTMLElement;
            if (!controllers.has(node)) {
                return;
            }
            controllers.get(node).changeView(view);
        });
    }

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

    this.changeOrientation = function (value: string) {
        this.each(function () {
            const node = this as HTMLElement;
            if (!controllers.has(node)) {
                return;
            }
            controllers.get(node).changeOrientation(value);
        });
    };

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

    this.data('slider', this); // Save this instance for easy access from outside
    return this // jQuery object for chaining
}
