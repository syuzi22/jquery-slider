import {
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
    ThumbHorChangedPosition,
    ThumbVerChangedPosition,
    ThumbFromChangedPosition,
    ThumbToChangedPosition,
    CalcedValueHor,
    CalcedValueVer,
    CalcedFromValue,
    CalcedToValue,
    CalcedAdjustedValueHor,
    CalcedAdjustedValueVer,
    CalcedAdjustedFromValue,
    CalcedAdjustedToValue,
    CalcedSliderWidth,
    CalcedSliderHeight,
    LineClicked_H,
    LineClicked_V,
    CalcedItemsStep,
    ItemClicked,
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

    init (options: OptionsInterface, node: HTMLElement): void {
        this.options = options;
        this.node = node
        this.draw();

    }

    reInit(options: OptionsInterface, node: HTMLElement): void {
        while (this.node.firstChild) {
            this.node.removeChild(this.node.firstChild);
        }
        this.init(options, node);
    }

    private draw(): void {
        this.model = new Model(this.options);
        this.model.addObserver(this)
        this.view = new MainView(this.node);
        this.view.render();
        this.line = new Line(this.view.getLineNode());
        this.line.addObserver(this);
        this.line.addProgressBar(this.view.getProgressBarNode());


        if (this.options.orientation === 'vertical') {
            this.line.drawVerticalLine();
        } else {
            this.line.drawHorizontalLine();
        }


        if (this.options.type === Type.Double) {
            this.createDouble();
        } else if (this.options.type === Type.Items) {
            this.createItems();
        } else {
            this.createSingle();
        }

        $(this.node).trigger('slider.step', [this.options.step])
        $(this.node).trigger('slider.min', [this.options.min])
        $(this.node).trigger('slider.max', [this.options.max])

        if (this.options.hideValue === true) {
            this.view.hideValue(true);
        }
    }

    createSingle() {
        this.thumb = new Thumb(this.view.getThumbToNode());
        this.thumb.addObserver(this);
        this.grid = new Grid(this.view.getGridNode());
        this.view.setMin(this.options.min);
        this.view.setMax(this.options.max);


        if (this.options.orientation === 'vertical') {
            this.view.getWrapNode().classList.add('slider__wrap_ver');
            this.view.getMinMaxNode().classList.add('slider__minmax_ver');
            this.view.getToNode().classList.add('slider__to_ver');
            this.thumb.drawVertical();
            this.thumb.addVerticalMovement(this.view.getLineNode());
            this.line.addLineClickOption_V();
            this.grid.drawLabels_V((this.options.max - this.options.min) / this.options.step);
            this.model.calcValue_V();

        } else {
            this.thumb.drawHorizontal();
            this.thumb.addHorizontalMovement(this.view.getLineNode());
            this.line.addLineClickOption_H();
            this.grid.drawLabels_H((this.options.max - this.options.min) / this.options.step);
            this.model.calcValue_H();
        }
    }

    createDouble() {
        this.doubleThumb = new DoubleThumb(this.view.getThumbFromNode(), this.view.getThumbToNode());
        this.doubleThumb.addObserver(this);
        this.grid = new Grid(this.view.getGridNode());

        if (this.options.orientation === 'vertical') {
            console.log('VerticalDouble');
        } else {
            this.doubleThumb.drawHorizontal();
            this.doubleThumb.addHorizontalMovement(this.view.getLineNode());
            this.line.addLineClickOption_H();
            this.grid.drawLabels_H((this.options.max - this.options.min) / this.options.step);
            this.view.setMin(this.options.min);
            this.view.setMax(this.options.max);
        }
        this.model.calcFromValue();
        this.model.calcToValue();

    }

    createItems() {
        //тут пока не продумывала вертикаль///
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
        //во View рассчитана ширина или высота слайдера, сохраним ее в модели для последующего использования
        if (obj instanceof CalcedSliderWidth) {
            this.model.updateSliderWidth(obj.value);
        } else if (obj instanceof CalcedSliderHeight) {
            this.model.updateSliderHeight(obj.value);
        // клик по слайдеру, Model рассчитает какому значению он соответствует и куда переместить бегунок
        } else if (obj instanceof LineClicked_H) {
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
                this.model.calcValue_H(obj.position);
            }
        } else if (obj instanceof LineClicked_V) {
            if (obj.position < 0) {
                obj.position = 0;
            } else if (obj.position > this.view.getLineNode().offsetHeight) {
                obj.position = this.view.getLineNode().offsetHeight - this.view.getThumbToNode().offsetHeight;
            // }
            // if (this.options.type === Type.Double) {
            //     let from = this.view.getThumbFromNode().getBoundingClientRect().left - this.view.getLineNode().getBoundingClientRect().left;
            //     let to = this.view.getThumbToNode().getBoundingClientRect().left - this.view.getLineNode().getBoundingClientRect().left;
            //     let middle = (to + from) / 2;
            //     if (from === to) {
            //         if (obj.position > to) {
            //             this.model.calcToValue(obj.position);
            //         } else {
            //             this.model.calcFromValue(obj.position);
            //         }
            //     } else if (obj.position > middle || obj.position > to) {
            //         this.model.calcToValue(obj.position);
            //         return;
            //     } else if (obj.position < middle || obj.position < from) {
            //         this.model.calcFromValue(obj.position);
            //         return;
            //     }
            } else {
                this.model.calcValue_V(obj.position);
            }
        }
        ////////////////////////////SINGLE///////////////////////////////////////////////////////////////
        // изменилось положение бегунка во View, Model рассчитает значение для отображения и позицию с учетом шага
        else if (obj instanceof ThumbHorChangedPosition) {
            this.model.calcValue_H(obj.position);
        } else if (obj instanceof ThumbVerChangedPosition) {
            this.model.calcValue_V(obj.position);
        // рассчитано значение слайдера в Model, передаем его во View и установим trigger для внешнего кода
        } else if (obj instanceof CalcedValueHor) {
            this.view.setValue(this.view.getToNode(), obj.value);
            $(this.node).trigger('slider.valueCalced', [obj.value])
        } else if (obj instanceof CalcedValueVer) {
            this.view.setValue(this.view.getToNode(), obj.value);
            $(this.node).trigger('slider.valueCalced', [obj.value])
        // рассчитана позиция бегунка с учетом шага, передаем ее во View
        } else if (obj instanceof CalcedAdjustedValueHor) {
            this.thumb.moveThumbOn_H(obj.value);
            this.line.updateProgressBarWidth(obj.value)
        } else if (obj instanceof CalcedAdjustedValueVer) {
            this.thumb.moveThumbOn_V(obj.value);
            this.line.updateProgressBarHeight(obj.value)
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
            this.doubleThumb.moveThumbFromOn_H(obj.value);
            this.line.setProgressBarLeftPos(obj.value);
        } else if (obj instanceof CalcedAdjustedToValue) {
            this.doubleThumb.moveThumbToOn_H(obj.value);
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

    //изменить вид слайдера
    changeView(view: string) {
        if (view === 'single') {
            this.options = new SingleOptions(this.options);
        } else if (view === 'double') {
            this.options = new DoubleOptions(this.options);
        } else if (view === 'items') {
            this.options = new ItemsOptions(this.options);
        }
        this.draw.call(this);
    }

    //передать значение и изменить значение и положение бегунка
    updateValue(value: number) {
        this.model.updateValue(value)
    }
    updateValueFrom(value: number) {
        this.model.updateValueFrom(value)
    }
    updateValueTo(value: number) {
        this.model.updateValueTo(value)
    }


    //изменить шаг
    changeStep(value: number) {
        if (value <= 0) {
            throw RangeError('Value must be positive');
        }
        this.options.step = value;
        this.reInit(this.options, this.node);
    }

    //изменить минимум
    changeMin(value: number) {
        this.options.min = value;
        this.reInit(this.options, this.node);
    }

    //изменить максимум
    changeMax(value: number) {
        this.options.max = value;
        this.reInit(this.options, this.node);
    }

    //скрыть значение над бегунком (единственным или "от" и "до")
    hideValue(hide: boolean) {
        if (hide === true) {
            this.options.hideValue = true;
            this.view.hideValue(true);
        } else {
            this.options.hideValue = false;
            this.view.hideValue(false);
        }
    }

    //скрыть шкалу
    hideGrid(hide: boolean) {
        if (hide === true) {
            this.options.hideGrid = true;
            this.view.hideGrid(true);
        } else {
            this.options.hideGrid = false;
            this.view.hideGrid(false);
        }
    }

    //скрыть минимум, максимум
    hideMinMax(hide: boolean) {
        if (hide === true) {
            this.options.hideGrid = true;
            this.view.hideMinMax(true);
        } else {
            this.options.hideGrid = false;
            this.view.hideMinMax(false);
        }
    }
}
