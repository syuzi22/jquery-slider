import {Observable} from './Observable'

export class Thumb extends Observable {
    sliderNode: Element;
    selfNode: Element;

    constructor(node: Element) {
        super();
        this.sliderNode = node;
        this.selfNode = document.createElement('div');
        this.selfNode.classList.add('slider__thumb');
    }

    create() {
        let line = this.sliderNode.querySelector('.slider__line');
        line.appendChild(this.selfNode);
    }

    showVertical() {
        this.selfNode.classList.add('slider__thumb_vertical');
    }

    showHorizontal() {
        this.selfNode.classList.add('slider__thumb_horizontal');
    }

    addHorizontalMovement() {
        const self = this;
        let thumb = this.selfNode;
        let line = this.sliderNode.querySelector('.slider__line');
        let sliderWidth = line.offsetWidth - thumb.offsetWidth;
        this.notifyObservers({
            'sliderWidth': sliderWidth
        })

        thumb.onmousedown = function(event) {
            event.preventDefault(); // предотвратить запуск выделения (действие браузера)
            let shiftX = event.clientX - thumb.getBoundingClientRect().left;
            // shiftY здесь не нужен, слайдер двигается только по горизонтали
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            function onMouseMove(event) {
                let newLeft = event.clientX - shiftX - line.getBoundingClientRect().left;

                // курсор вышел из слайдера => оставить бегунок в его границах.
                if (newLeft < 0) {
                    newLeft = 0;
                }
                let rightEdge = sliderWidth;
                if (newLeft > rightEdge) {
                    newLeft = rightEdge;
                }
                self.notifyObservers({
                    'newLeft': newLeft
                })

                thumb.style.left = newLeft + 'px';
            }

            function onMouseUp() {
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
            }

        thumb.ondragstart = function() {
            return false;
        };

      };
    }
}