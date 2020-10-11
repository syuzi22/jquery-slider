import {Model} from './Model'
import {Line} from './Line'
import {Thumb} from './Thumb'
import {DoubleThumb} from './DoubleThumb'
import {Options} from './Options'
// TODO import {*} from './Event' // ?
import { ThumbChangedPosition, ThumbFromChangedPosition, ThumbToChangedPosition, CalcedValue, CalcedFromValue, CalcedToValue, calcedAdjustedValue, calcedAdjustedFromValue, calcedAdjustedToValue, CalcedSliderWidth, LineClicked, MouseUpMessage } from './Event'
import { MainView } from './MainView'

export class Controller {
    private model: Model
    private line: Line
    private thumb: Thumb
    private doubleThumb: DoubleThumb
    private view: MainView

    options: object
    node: HTMLElement
    sliderWrap: HTMLElement

    constructor() {}

    init (options: Options, node: HTMLElement): void {
        this.options = options
        this.node = node
        this.model = new Model(this.options);
        this.model.addObserver(this)
        this.view = new MainView(this.node);
        this.view.render();
        this.line = new Line(this.view.getLineNode());
        this.line.addObserver(this)
        this.line.drawHorizontalLine();
        this.line.addProgressBar(this.view.getProgressBarNode());
        this.view.setMin(this.options.min);
        this.view.setMax(this.options.max);

                ////////////////////////////SINGLE///////////////////////////////////////////////////////////////
                this.thumb = new Thumb(this.view.getThumbToNode());
                this.thumb.addObserver(this)
                this.thumb.drawHorizontal();
                this.thumb.addHorizontalMovement(this.view.getLineNode());
                this.model.calcValue();
                this.line.addLineClickOption();
                ////////////////////////////SINGLE///////////////////////////////////////////////////////////////

                ////////////////////////////DOUBLE///////////////////////////////////////////////////////////////
                // this.doubleThumb = new DoubleThumb(this.view.getThumbFromNode(), this.view.getThumbToNode());
                // this.doubleThumb.addObserver(this);
                // this.doubleThumb.drawHorizontal();
                // this.doubleThumb.addHorizontalMovement(this.view.getLineNode());

                // this.model.calcFromValue();
                // this.model.calcToValue();
                ////////////////////////////DOUBLE///////////////////////////////////////////////////////////////
    }


    //метод для получения сообщений от Model и View
    onEvent (obj: object) {

        //во View рассчитана ширина слайдера, сохраним ее в модели для последующего использования
        if (obj instanceof CalcedSliderWidth) {
            this.model.updateSliderWidth(obj.value);

                ////////////////////////////SINGLE///////////////////////////////////////////////////////////////
                // изменилось положение бегунка во View, Model рассчитает значение для отображения и позицию с учетом шага
                } else if (obj instanceof ThumbChangedPosition) {
                    this.model.calcValue(obj.position);
                // рассчитано значение слайдера в Model, передаем его во View и установим trigger для внешнего кода
                } else if (obj instanceof CalcedValue) {
                    this.view.setValue(this.view.getToNode(), obj.value);
                    $(this.node).trigger('slider.valueCalced', [obj.value])
                // рассчитана позиция бегунка с учетом шага, передаем ее во View
                } else if (obj instanceof calcedAdjustedValue) {
                    this.thumb.moveThumbOn(obj.value);
                    this.line.updateProgressBarWidth(obj.value)
                // клик по слайдеру, Model рассчитает какому значению он соответствует и куда переместить бегунок
                } else if (obj instanceof LineClicked) {
                    this.model.calcValue(obj.position);
                }
                ////////////////////////////SINGLE///////////////////////////////////////////////////////////////

                ////////////////////////////DOUBLE///////////////////////////////////////////////////////////////
                // } else if (obj instanceof ThumbFromChangedPosition) {
                //     this.model.calcFromValue(obj.position);
                // } else if (obj instanceof ThumbToChangedPosition) {
                //     this.model.calcToValue(obj.position);
                // } else if (obj instanceof CalcedFromValue) {
                //     this.view.setValue(this.view.getFromNode(), obj.value);
                // } else if (obj instanceof CalcedToValue) {
                //     this.view.setValue(this.view.getToNode(), obj.value);
                // } else if (obj instanceof calcedAdjustedFromValue) {
                //     this.doubleThumb.moveThumbFromOn(obj.value);
                //     this.line.setProgressBarLeftPos(obj.value);
                // } else if (obj instanceof calcedAdjustedToValue) {
                //     this.doubleThumb.moveThumbToOn(obj.value);
                //     this.line.setProgressBarRightPos(obj.value)
                // }
                ////////////////////////////DOUBLE///////////////////////////////////////////////////////////////

    }


    //методы API

    //метод, чтобы извне передать значение и инициировать смену значения и положения бегунка
    updateValue(value: number) {
        this.model.updateValue(value)
    }
    //метод для скрытия значения над бегунком (единственным или "от")
    hideValue(hide: boolean) {
        if (hide) {
            this.view.hideFrom(this.view.getFromNode());
        }
    }
    //метод для смены шага
    changeStep(step: number) {
        this.model.updateStep(parseInt(step, 10));
        // this.model.calcValue();
    }

}
