import {Model} from './Model'
import {Line} from './Line'
import {Thumb} from './Thumb'
import {Options} from './Options'
import { ThumbChangedPosition, CalcedValue, calcedAdjustedValue, CalcedSliderWidth, LineClicked, MouseUpMessage } from './Event'
import { MainView } from './MainView'

export class Controller {
    private model: Model
    private line: Line
    private thumb: Thumb
    private view: MainView

    options: object
    node: HTMLElement
    sliderWrap: HTMLElement

    constructor() { }

    init (options: Options, node: HTMLElement): void {
        this.options = options
        this.node = node

        this.model = new Model(this.options);
        this.model.addObserver(this)

        this.view = new MainView(this.node);
        this.view.render();

        this.line = new Line(this.view.getLineNode());
        this.line.addObserver(this)

        this.thumb = new Thumb(this.view.getThumbNode());
        this.thumb.addObserver(this)

        this.line.drawHorizontalLine();
        this.line.addLineClickOption();

        this.view.setMin(this.options.min);
        this.view.setMax(this.options.max);

        this.thumb.drawHorizontal();
        this.thumb.addHorizontalMovement(this.view.getLineNode());

        this.model.calcValue();
    }


    //метод для получения сообщений от Model и View
    onEvent (obj: object) {

        //если во View рассчитана ширина слайдера, сохрани ее в модели для последующего использования
        if (obj instanceof CalcedSliderWidth) {
            this.model.updateSliderWidth(obj.value);

        //если изменилось положение бегунка во View при перетаскивании мышью, пусть Model рассчитает
        //значение слайдера для отображения и позицию, куда должен попасть бегунок с учетом шага слайдера,
        //когда пользователь отпустит кнопку мыши
        } else if (obj instanceof ThumbChangedPosition) {
            this.model.calcValue(obj.position);
            this.thumb.moveThumbOn(obj.position)
            this.line.drawProgressBar(this.view.getProgressBarNode(), obj.position);

        //если рассчитано значение слайдера в Model, передай его для отображения во View и установи trigger
        //для внешнего кода
        } else if (obj instanceof CalcedValue) {
            this.view.setValue(this.view.getFromNode(), obj.value);
            $(this.node).trigger('slider.valueCalced', [obj.value])

        //если в Model рассчитано какое положение должен занять бегунок, установи его во View
        } else if (obj instanceof calcedAdjustedValue) {
            this.view.setAdjustedValue(obj.value);
            this.thumb.moveThumbOn(obj.value)
            this.line.drawProgressBar(this.view.getProgressBarNode(), obj.value);

        //если произошел клик на линии слайдера во View, то в Model рассчитай какому значению он
        //соответствует и куда переместить бегунок
        } else if (obj instanceof LineClicked) {
            this.model.calcValue(obj.position);

        } else if (obj instanceof MouseUpMessage) {
            this.thumb.moveThumbOn(this.view.getAdjustedValue())
            this.line.drawProgressBar(this.view.getProgressBarNode(), this.view.getAdjustedValue());
        }
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
        this.model.calcValue();
    }

}
