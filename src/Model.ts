import {Observable} from './Observable'
import {Options} from './Options'

export class Model extends Observable {
    node: Element
    options: object

    init(options: object, node: Element) {
        this.options = options;
        this.node = node

        this.notifyObservers(options);
    }
}