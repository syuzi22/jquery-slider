type Limit = string | number

export interface OptionsInterface {
    type?: string,
    min?: number,
    max?: number,
    from?: Limit,
    to?: Limit;
    step?: number;
    items?: object;
    grid?: boolean;
    progressBar?: boolean;
    orientation?: string;
    hide_min_max?: boolean;
    hide_from_to?: boolean;
}

export class Options {
    readonly type: string; //single or double
    readonly min: number; //slider min value
    readonly max: number; //slider max value
    readonly from: Limit; // start position for left or single handle
    readonly to: Limit; //start position for right handle
    readonly step: number; //sliders step
    readonly items: object; //grid items. Object {1: 'Junior', 2: 'Middle', 3: 'Senior'}
    readonly grid: boolean; //enable grid of values above the slider
    readonly progressBar: boolean; // enable progressBar
    readonly orientation: string; //horizontal or vertical
    readonly hide_min_max: boolean; //hides min and max labels
    readonly hide_from_to: boolean; //hides from and to label

    constructor(settings: OptionsInterface) {
        this.type = settings.type || 'single';
        this.min = settings.min || 0;
        this.max = settings.max || 100;
        this.from = settings.from || 0;
        this.to = settings.to || 50;
        this.step = settings.step || 1;
        this.items = settings.items || [1, 2, 3];
        this.grid = settings.grid || false;
        this.progressBar = settings.progressBar || true;
        this.orientation = settings.orientation || 'horizontal';
        this.hide_min_max = settings.hide_min_max || false;
        this.hide_from_to = settings.hide_from_to || false;
    }
}
