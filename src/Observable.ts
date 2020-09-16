import { Controller } from "./Controller";

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
    // TODO: accept Event class instead of any
    notifyObservers(data) {
        this.observers.forEach((observer) => {
            observer.onEvent(data);
        });
        /*
        if (data.domEvent && data.eventTarget) {
            data.eventTarget.dispatchEvent(data.domEvent)
        }
        */
    }
}