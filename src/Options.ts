export enum Type {
    Single = 'single',
    Double = 'double',
    Items = 'items',
}

export interface OptionsInterface {
    readonly type?: Type,
    min?: number,
    max?: number,
    from?: number,
    to?: number;
    step?: number;
    items?: string[];
    orientation?: string;
    hideGrid?: boolean;
    hideValue?: boolean;
    hideMinMax?: boolean;
}

export class Options implements OptionsInterface {
    readonly type: Type; //single or double
    readonly min: number; //slider min value
    readonly max: number; //slider max value
    readonly from: number; // start position for left or single handle
    readonly to: number; //start position for right handle
    readonly step: number; //sliders step
    readonly items: string[]; //grid items
    readonly hideGrid: boolean; //enable grid of values above the slider
    readonly orientation: string; //horizontal or vertical
    hideValue: boolean; //hides from and to label
    hideMinMax: boolean; //hides minimum and maximum

    constructor(settings: OptionsInterface) {
        this.type = settings.type || Type.Single;
        this.min = settings.min || 0;
        this.max = settings.max || 100;
        this.from = settings.from || 0;
        this.to = settings.to || 50;
        this.step = settings.step || 1;
        this.items = settings.items || [];
        this.orientation = settings.orientation || 'horizontal';
        this.hideGrid = settings.hideGrid || false;
        this.hideValue = settings.hideValue || false;
        this.hideMinMax = settings.hideMinMax || false;
    }
}

type ModifiableType = { -readonly [type in 'type']: Type; }

export class SingleOptions extends Options {
    constructor(options: OptionsInterface) {
        super(options);
        (<ModifiableType>this).type = Type.Single;
    }
}

export class DoubleOptions extends Options {
    constructor(options: OptionsInterface) {
        super(options);
        (<ModifiableType>this).type = Type.Double;
    }
}

export class ItemsOptions extends Options {
    constructor(options: OptionsInterface) {
        super(options);
        (<ModifiableType>this).type = Type.Items;
    }
}