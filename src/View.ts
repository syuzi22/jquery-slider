import {Observable} from './Observable'

export class View extends Observable {
    private node: Element

    show(node: Element) {
        this.node = node
        node.innerHTML = `<div class="slider__line">
        <div class="slider__thumb"><div class="slider__current-value"></div></div>
        </div>
        <div class="slider__minmax">
        <span class = "slider__min">0</span>
        <span class = "slider__max">100</span>
        </div>`;
    }
    changeValue() {

    }
    setOrientation(orientation) {
        if(orientation) {
            this.node.querySelector('.slider__line').classList.add('slider__line_vertical');
            this.node.querySelector('.slider__thumb').classList.add('slider__thumb_vertical');
        }else {
            this.node.querySelector('.slider__line').classList.add('slider__line_horizontal');
            this.node.querySelector('.slider__thumb').classList.add('slider__thumb_horizontal');
        }
    }

    addThumbMovementHorizontal(node) {
        let line = node.querySelector('.slider__line');
        let thumb = node.querySelector('.slider__thumb');

        thumb.onmousedown = function(event) {
          event.preventDefault(); // предотвратить запуск выделения (действие браузера)
          let shiftX = event.clientX - thumb.getBoundingClientRect().left;
          // shiftY здесь не нужен, слайдер двигается только по горизонтали

            ////////////////////////////////////////////
            let thumbWidth = thumb.getBoundingClientRect().right - thumb.getBoundingClientRect().left;
            let sliderWidth = line.getBoundingClientRect().right - line.getBoundingClientRect().left - thumbWidth;
            // console.log(sliderWidth);
            // console.log(line.offsetWidth)
            let gridWidth = parseInt(node.querySelector('.slider__max').textContent) - parseInt(node.querySelector('.slider__min').textContent)
            // console.log(gridWidth);
            let point = (sliderWidth / gridWidth );
            // console.log(point);
            //////////////////////////////////////////

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);

          function onMouseMove(event) {

            ////////////////////////////////////
            let thumbCurrent = thumb.getBoundingClientRect().left - line.getBoundingClientRect().left;
            console.log(thumbCurrent);
            let value = Math.round(thumbCurrent / point);
            // console.log(value);

            let valueDiv = node.querySelector('.slider__current-value');
            valueDiv.textContent = value;
            ///////////////////////////////////////



            let newLeft = event.clientX - shiftX - line.getBoundingClientRect().left;
            // курсор вышел из слайдера => оставить бегунок в его границах.
            if (newLeft < 0) {
              newLeft = 0;
            }
            let rightEdge = line.offsetWidth - thumb.offsetWidth;
            if (newLeft > rightEdge) {
              newLeft = rightEdge;
            }
            thumb.style.left = newLeft + 'px';
          }

          function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
          }

        };
        thumb.ondragstart = function() {
          return false;
        };
    }






    // addThumbMovementVertical(node) {
    //     let thumb = node.querySelector('.slider__thumb');

    //     thumb.onmousedown = function(event) {
    //       event.preventDefault();

    //       let shiftY = event.clientY - thumb.getBoundingClientRect().top;

    //       document.addEventListener('mousemove', onMouseMove);
    //       document.addEventListener('mouseup', onMouseUp);

    //       function onMouseMove(event) {
    //         let newTop = event.clientY - shiftY - node.getBoundingClientRect().top;

    //         // курсор вышел из слайдера => оставить бегунок в его границах.
    //         if (newTop < 0) {
    //             newTop = 0;
    //         }
    //         let bottomEdge = node.offsetHeight - thumb.offsetHeight;
    //         if (newTop > bottomEdge) {
    //             newTop = bottomEdge;
    //         }

    //         thumb.style.top = newTop + 'px';
    //       }

    //       function onMouseUp() {
    //         document.removeEventListener('mouseup', onMouseUp);
    //         document.removeEventListener('mousemove', onMouseMove);
    //       }

    //     };

    //     thumb.ondragstart = function() {
    //       return false;
    //     };
    // }
}