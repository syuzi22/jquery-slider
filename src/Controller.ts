import {
    Options,
    OptionsInterface,
    Type,
    SingleOptions,
    DoubleOptions,
    ItemsOptions
} from './Options'
import {Model} from './Model'
import { MainView } from './MainView'
import {Line} from './Line'
import {Thumb} from './Thumb'
import {DoubleThumb} from './DoubleThumb'
import {Items} from './Items'
import {Grid} from './Grid'
import {
    ThumbChangedPosition,
    ThumbFromChangedPosition,
    ThumbToChangedPosition,
    CalcedValue,
    CalcedFromValue,
    CalcedToValue,
    CalcedAdjustedValue,
    CalcedAdjustedFromValue,
    CalcedAdjustedToValue,
    CalcedSliderWidth,
    LineClicked,
    CalcedItemsStep,
    ItemClicked
} from './Event'

export class Controller {
    private model: Model
    private view: MainView
    private line: Line
    private thumb: Thumb
    private doubleThumb: DoubleThumb
    private itemsView: Items
    private grid: Grid
    options: OptionsInterface
    node: HTMLElement
    sliderWrap: HTMLElement

    constructor() {}

    init (options: Options, node: HTMLElement): void {
        this.options = options;
        this.node = node
        this.setBaseOptions();
        if (this.options.type === Type.Double) {
            this.createDouble();
        } else if (this.options.type === Type.Items) {
            this.createItems();
        } else {
            this.createSingle();
        }
    }

    setBaseOptions() {
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
        if (this.options.grid) {
            this.addGrid();
        }

    }

    addGrid() {
        this.view.renderGrid();
        this.grid = new Grid(this.view.getGridNode());
        this.grid.drawLabels((this.options.max - this.options.min) / this.options.step);
    }

    createSingle() {
        this.thumb = new Thumb(this.view.getThumbToNode());
        this.thumb.addObserver(this)
        this.thumb.drawHorizontal();
        this.thumb.addHorizontalMovement(this.view.getLineNode());
        this.model.calcValue();
        this.line.addLineClickOption();
        if (this.options.hideValue === true) {
            this.view.hideValue(true);
        }
    }

    createDouble() {
        this.doubleThumb = new DoubleThumb(this.view.getThumbFromNode(), this.view.getThumbToNode());
        this.doubleThumb.addObserver(this);
        this.doubleThumb.drawHorizontal();
        this.doubleThumb.addHorizontalMovement(this.view.getLineNode());
        this.model.calcFromValue();
        this.model.calcToValue();
        this.line.addLineClickOption();
        if (this.options.hideValue === true) {
            this.view.hideValue(true);
        }
    }

    createItems() {
        this.itemsView = new Items(this.view.getLineNode());
        this.itemsView.addObserver(this);
        this.view.getMaxNode().style.display = 'none';
        this.view.getMinNode().style.display = 'none';
        this.model.updateSliderWidth(this.line.getLineWidth());
        this.model.calcItemsStep(this.options.items.length - 1);
        this.line.updateProgressBarWidth(0);
    }

    //метод для получения сообщений от Model и View
    onEvent (obj: object) {
        //во View рассчитана ширина слайдера, сохраним ее в модели для последующего использования
        if (obj instanceof CalcedSliderWidth) {
            this.model.updateSliderWidth(obj.value);
        // клик по слайдеру, Model рассчитает какому значению он соответствует и куда переместить бегунок
        } else if (obj instanceof LineClicked) {
            if (obj.position < 0) {
                obj.position = 0;
            } else if (obj.position > this.view.getLineNode().offsetWidth - this.view.getThumbToNode().offsetWidth) {
                obj.position = this.view.getLineNode().offsetWidth - this.view.getThumbToNode().offsetWidth;
            }
            if (this.options.type === Type.Double) {
                let from = this.view.getThumbFromNode().getBoundingClientRect().left - this.view.getLineNode().getBoundingClientRect().left;
                let to = this.view.getThumbToNode().getBoundingClientRect().left - this.view.getLineNode().getBoundingClientRect().left;
                let middle = (to + from) / 2;
                if (from === to) {
                    if (obj.position > to) {
                        this.model.calcToValue(obj.position);
                    } else {
                        this.model.calcFromValue(obj.position);
                    }
                } else if (obj.position > middle || obj.position > to) {
                    this.model.calcToValue(obj.position);
                    return;
                } else if (obj.position < middle || obj.position < from) {
                    this.model.calcFromValue(obj.position);
                    return;
                }
            } else {
                this.model.calcValue(obj.position);
            }
        }
        ////////////////////////////SINGLE///////////////////////////////////////////////////////////////
        // изменилось положение бегунка во View, Model рассчитает значение для отображения и позицию с учетом шага
        else if (obj instanceof ThumbChangedPosition) {
            this.model.calcValue(obj.position);
        // рассчитано значение слайдера в Model, передаем его во View и установим trigger для внешнего кода
        } else if (obj instanceof CalcedValue) {
            this.view.setValue(this.view.getToNode(), obj.value);
            $(this.node).trigger('slider.valueCalced', [obj.value])
        // рассчитана позиция бегунка с учетом шага, передаем ее во View
        } else if (obj instanceof CalcedAdjustedValue) {
            this.thumb.moveThumbOn(obj.value);
            this.line.updateProgressBarWidth(obj.value)
        }
        ////////////////////////////DOUBLE///////////////////////////////////////////////////////////////
            else if (obj instanceof ThumbFromChangedPosition) {
            this.model.calcFromValue(obj.position);
        } else if (obj instanceof ThumbToChangedPosition) {
            this.model.calcToValue(obj.position);
        // рассчитано значение from в Model, передаем его во View и установим trigger для внешнего кода
        } else if (obj instanceof CalcedFromValue) {
            this.view.setValue(this.view.getFromNode(), obj.value);
            $(this.node).trigger('slider.valueFromCalced', [obj.value])
        } else if (obj instanceof CalcedToValue) {
            this.view.setValue(this.view.getToNode(), obj.value);
            $(this.node).trigger('slider.valueToCalced', [obj.value])
        } else if (obj instanceof CalcedAdjustedFromValue) {
            this.doubleThumb.moveThumbFromOn(obj.value);
            this.line.setProgressBarLeftPos(obj.value);
        } else if (obj instanceof CalcedAdjustedToValue) {
            this.doubleThumb.moveThumbToOn(obj.value);
            this.line.setProgressBarRightPos(obj.value)
        }
        ////////////////////////////ITEMS///////////////////////////////////////////////////////////////
            else if (obj instanceof CalcedItemsStep) {
            this.itemsView.addItemsToLine(this.options.items, obj.value);
        } else if (obj instanceof ItemClicked) {
            this.line.updateProgressBarWidth(obj.value);
        }
    }


    //методы API

    //метод смены вида слайдера
    changeView(view: string) {
        this.setBaseOptions.call(this);
        if (view === 'single') {
            this.options = new SingleOptions(this.options);
            this.createSingle.call(this);
        } else if (view === 'double') {
            this.options = new DoubleOptions(this.options);
            this.createDouble.call(this);
        } else if (view === 'items') {
            this.options = new ItemsOptions(this.options);
            this.createItems.call(this)
        }
    }

    //метод, чтобы извне передать значение и инициировать смену значения и положения бегунка
    updateValue(value: number) {
        this.model.updateValue(value)
    }

    updateValueFrom(value: number) {
        this.model.updateValueFrom(value)
    }

    updateValueTo(value: number) {
        this.model.updateValueTo(value)
    }

    //метод для скрытия значения над бегунком (единственным или "от" и "до")
    hideValue(hide: boolean) {
        if (hide === true) {
            this.options.hideValue = true;
            this.view.hideValue(true);
        } else {
            this.options.hideValue = false;
            this.view.hideValue(false);
        }
    }
}
