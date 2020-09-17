import {Observable} from './Observable'
import {LineClicked} from './Event'

export class View extends Observable {
  sliderNode: Element;
  sliderLine: Element;

  constructor() {
    super();
  }

  createShell(node: Element) {
    node.innerHTML = `<div class="slider__wrap"></div>`;
    this.sliderNode = node.querySelector('.slider__wrap');
  }

  drawLine(orientation) {
    this.sliderNode.innerHTML = `<div class="slider__line"></div>`;
    this.sliderLine = this.sliderNode.querySelector('.slider__line');
    if (orientation === 'vertical') {
      this.sliderLine.classList.add('slider__line_vertical');
    }else {
      this.sliderLine.classList.add('slider__line_horizontal');
    }
  }

  addLineClick() {
    const self = this;
    this.sliderLine.addEventListener('click', function(event) {
        let position = event.clientX - self.sliderLine.getBoundingClientRect().left;
        const lineClicked = new LineClicked(position);
        self.notifyObservers(lineClicked);
    })
  }

  showMinMax(minimum, maximum) {

    let div = document.createElement('div');
    div.classList.add('slider__minmax');

    let min = document.createElement('div');
    min.classList.add('slider__min');
    min.textContent = minimum;

    let max = document.createElement('div');
    max.classList.add('slider__max');
    max.textContent = maximum;

    div.append(min, max);
    this.sliderNode.append(div);
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


}