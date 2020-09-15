import {Observable} from './Observable'

export class View extends Observable {

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




  // drawThumb(orientation) {
  //   this.sliderLine.innerHTML = `<div class="slider__thumb"></div>`;
  //   if (orientation === 'vertical') {
  //     this.sliderNode.querySelector('.slider__thumb').classList.add('slider__thumb_vertical');
  //   }else {
  //     this.sliderNode.querySelector('.slider__thumb').classList.add('slider__thumb_horizontal');
  //   }
  // }

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
  //   }else {
  //     thumb.onmousedown = function(event) {
  //       event.preventDefault(); // предотвратить запуск выделения (действие браузера)
  //       let shiftX = event.clientX - thumb.getBoundingClientRect().left;
  //       // shiftY здесь не нужен, слайдер двигается только по горизонтали
  //       document.addEventListener('mousemove', onMouseMove);
  //       document.addEventListener('mouseup', onMouseUp);
  //       function onMouseMove(event) {
  //         let newLeft = event.clientX - shiftX - line.getBoundingClientRect().left;
  //         // курсор вышел из слайдера => оставить бегунок в его границах.
  //         if (newLeft < 0) {
  //           newLeft = 0;
  //         }
  //         let rightEdge = line.offsetWidth - thumb.offsetWidth;
  //         if (newLeft > rightEdge) {
  //           newLeft = rightEdge;
  //         }

  //         thumb.style.left = newLeft + 'px';
  //       }

  //       function onMouseUp() {
  //         document.removeEventListener('mouseup', onMouseUp);
  //         document.removeEventListener('mousemove', onMouseMove);
  //       }

  //     };

  //     thumb.ondragstart = function() {
  //       return false;
  //     };
  //   }
  // }


  // showFrom(value) {
  //   let from = document.createElement('div');
  //   from.classList.add('slider__from');
  //   this.from = from;
  //   this.from.textContent = value;
  //   this.sliderNode.querySelector('.slider__thumb').append(from);
  // }
}