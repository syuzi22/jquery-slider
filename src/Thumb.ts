import {Observable} from './Observable'
import { ThumbChangedPosition, CalcedSliderWidth, MouseUpMessage } from './Event'

export class Thumb extends Observable {
    thumb:HTMLElement;

    constructor(node: HTMLElement) {
        super();
        this.thumb = node;
    }

    drawHorizontal() {
        this.thumb.classList.add('slider__thumb_horizontal');
    }

    drawVertical() {
        this.thumb.classList.add('slider__thumb_vertical');
    }

    addHorizontalMovement(node: HTMLElement) {
        const self = this;
        const thumb = this.thumb;
        const line = node;

        const calcedSliderWidth = new CalcedSliderWidth(line.offsetWidth - thumb.offsetWidth);
        self.notifyObservers(calcedSliderWidth);

        thumb.onmousedown = function(event) {
            event.preventDefault();
            let shiftX = event.clientX - thumb.getBoundingClientRect().left;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            function onMouseMove(event) {
                let newLeft = event.clientX - shiftX - line.getBoundingClientRect().left;
                if (newLeft < 0) { newLeft = 0; }
                let rightEdge = line.offsetWidth - thumb.offsetWidth;
                if (newLeft > rightEdge) { newLeft = rightEdge; }

                const thumbChangedPos = new ThumbChangedPosition(newLeft);
                self.notifyObservers(thumbChangedPos);
            }
            function onMouseUp() {
                const mouseUp = new MouseUpMessage();
                self.notifyObservers(mouseUp);

                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
            }
        thumb.ondragstart = function() { return false; };
      };
    }

    moveThumbOn(position) {
        this.thumb.style.left = position + 'px';
    }

}




















  // addThumbMovement(orientation) {
  //   const self = this;
  //   let line = this.sliderNode.querySelector('.slider__line');
  //   let thumb = this.sliderNode.querySelector('.slider__thumb');

  //   if (orientation === 'vertical') {
  //         thumb.onmousedown = function(event) {
  //         event.preventDefault();

  //         let shiftY = event.clientY - thumb.getBoundingClientRect().top;

  //         document.addEventListener('mousemove', onMouseMove);
  //         document.addEventListener('mouseup', onMouseUp);

  //         function onMouseMove(event) {
  //           let newTop = event.clientY - shiftY - line.getBoundingClientRect().top;

  //           // курсор вышел из слайдера => оставить бегунок в его границах.
  //           if (newTop < 0) {
  //               newTop = 0;
  //           }
  //           let bottomEdge = line.offsetHeight - thumb.offsetHeight;
  //           if (newTop > bottomEdge) {
  //               newTop = bottomEdge;
  //           }
  //           thumb.style.top = newTop + 'px';
  //         }

  //         function onMouseUp() {
  //           document.removeEventListener('mouseup', onMouseUp);
  //           document.removeEventListener('mousemove', onMouseMove);
  //         }

  //       };

  //       thumb.ondragstart = function() {
  //         return false;
  //       };
  //   }