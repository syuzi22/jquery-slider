export class Observable {
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
        /*
        if (data.domEvent && data.eventTarget) {
            data.eventTarget.dispatchEvent(data.domEvent)
        }
        */
    }
}