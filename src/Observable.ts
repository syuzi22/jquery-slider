import { Controller } from "./Controller";
import { SliderEvent } from "./Event";

export class Observable {
    observers: Controller[];

    constructor() {
        this.observers = [];
    }
    addObserver(observer: Controller) {
        this.observers.push(observer);
    }
    deleteObserver(observer: Controller) {
        this.observers = this.observers.filter((elem) => elem !== observer);
    }
    notifyObservers(data: SliderEvent) {
        this.observers.forEach((observer) => {
            observer.onEvent(data);
        });
    }
}