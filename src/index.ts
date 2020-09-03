import './style.css'

class Observable {
    constructor() {
        this.observers = [];
    }
    addObserver(obj) {
        this.observers.push(obj);
    }
    deleteObserver(obj) {
        this.observers = this.observers.filter((observer) => observer !== obj);
    }
    notifyObservers(data) {
        this.observers.forEach((observer) => {
            observer.onEvent(data);
        });
    }
}

class Model extends Observable {
    init(options) {
        this.options = options;
        this.notifyObservers(options);
    }
}

class View extends Observable {
    show(node) {
        let sliderLine = '<div class="slider__line"></div>';
        node.innerHTML = sliderLine;
    }
    setOrientation(orientation) {
        if(orientation) {
            slider.querySelector('.slider__line').classList.add('slider__line_vertical');
        }else {
            slider.querySelector('.slider__line').classList.add('slider__line_horizontal');
        }
    }
}

class Controller{
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
    onEvent (options) {
        console.log(options);
        this.view.show(options.node);
        if (options.orientation === 'vertical' ) {
            this.view.setOrientation(options.orientation);
        }else {
            this.view.setOrientation();
        }
    }
}

let model = new Model();
let view = new View();
let controller = new Controller(model, view);

model.addObserver(controller);


let slider = document.querySelector('.slider');
let settings = {
    node: slider,
    orientation: 'vertical'
}
model.init(settings);

