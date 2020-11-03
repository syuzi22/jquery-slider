interface JQuery {
    slider(settings: object) : JQuery;
}

$(() => {

    const mySliderSimple = $('.slider__simple').slider({
        type: 'double',
        min: 0,
        max: 100,
        from: 20,
        to: 80,
        step: 5,
        hideGrid: true,
        hideMinMax: true
    });

    const mySliderSingle = $('.slider__single').slider({
        type: 'single',
        min: 20,
        max: 80,
        from: 40, // if single, this parameter is ignored
        to: 60,
        step: 5,
    });

    const mySliderRange = $('.slider__range').slider({
        type: 'double',
        min: 10,
        max: 90,
        from: 20,
        to: 80,
        step: 2,
    });

    const mySliderItems = $('.slider__items').slider({
        type: 'items',
        items: ['junior', 'middle', 'senior'],
    });

    const inputSingle = document.querySelector('.slider-input-single') as HTMLInputElement;
    const inputFrom = document.querySelector('.slider-input-from') as HTMLInputElement;
    const inputTo = document.querySelector('.slider-input-to') as HTMLInputElement;
    const inputMin = document.querySelector('.slider-min') as HTMLInputElement;
    const inputMax = document.querySelector('.slider-max') as HTMLInputElement;
    const inputStep = document.querySelector('.slider-step') as HTMLInputElement;

    const mySliderMulti = $('.slider__multi')
    .on('slider.valueCalced', function (event, value) {
        inputSingle.value = value;
    })
    .on('slider.valueFromCalced', function (event, value) {
        inputFrom.value = value;
    })
    .on('slider.valueToCalced', function (event, value) {
        inputTo.value = value;
    })
    .on('slider.step', function (event, value) {
        inputStep.value = value;
    })
    .on('slider.min', function (event, value) {
        inputMin.value = value;
    })
    .on('slider.max', function (event, value) {
        inputMax.value = value;
    })
    .slider({
        type: 'single',
        min: 0,
        max: 100,
        from: 20, // if single, this parameter is ignored
        to: 80,
        step: 10,
        items: ['junior', 'middle', 'senior'],
        orientation: 'vertical',
    });

    inputSingle.onkeypress = function(event) {
        const value = parseInt(inputSingle.value)
        if (isNaN(value)) {
            return;
        }
        if (event.code === 'Enter'){
            event.preventDefault();
            mySliderMulti.data('slider').update(value);
        }
    };

    inputFrom.onkeypress = function(event) {
        const value = parseInt(inputFrom.value)
        if (isNaN(value)) {
            return;
        }
        if (event.code === 'Enter'){
            event.preventDefault();
            mySliderMulti.data('slider').updateFrom(value);
        }
    };

    inputTo.onkeypress = function(event) {
        const value = parseInt(inputTo.value)
        if (isNaN(value)) {
            return;
        }
        if (event.code === 'Enter'){
            event.preventDefault();
            mySliderMulti.data('slider').updateTo(value);
        }
    };

    inputStep.onkeypress = function(event) {
        const value = parseInt(inputStep.value)
        if (isNaN(value)) {
            return;
        }
        if (event.code === 'Enter'){
            event.preventDefault();
            mySliderMulti.data('slider').changeStep(value);
        }
    }

    inputMin.onkeypress = function(event) {
        const value = parseInt(inputMin.value)
        if (isNaN(value)) {
            return;
        }
        if (event.code === 'Enter'){
            event.preventDefault();
            mySliderMulti.data('slider').changeMin(value);
        }
    }

    inputMax.onkeypress = function(event) {
        const value = parseInt(inputMax.value)
        if (isNaN(value)) {
            return;
        }
        if (event.code === 'Enter'){
            event.preventDefault();
            mySliderMulti.data('slider').changeMax(value);
        }
    }

    const singleBut = document.getElementById('button__single');
    const doubleBut = document.getElementById('button__double');
    const itemsBut = document.getElementById('button__items');

    singleBut.onclick = function() {
        mySliderMulti.data('slider').changeView('single');
        inputFrom.value = '';
        inputTo.value = '';
    }
    doubleBut.onclick = function(event) {
        mySliderMulti.data('slider').changeView('double');
        inputSingle.value = '';
    }
    itemsBut.onclick = function() {
        mySliderMulti.data('slider').changeView('items');
        inputFrom.value = '';
        inputTo.value = '';
        inputSingle.value = '';
        inputMin.value = '';
        inputMax.value = '';
        inputStep.value = '';
    }

    const hideValue = document.getElementById('hidevalue');
    const hideGrid = document.getElementById('hidegrid');
    const hideMinMax = document.getElementById('hideminmax');

    hideValue.oninput = function() {
        if ((<HTMLInputElement>hideValue).checked) {
            mySliderMulti.data('slider').hideValue(true);
        } else {
            mySliderMulti.data('slider').hideValue(false);
        }
    }

    hideGrid.oninput = function() {
        if ((<HTMLInputElement>hideGrid).checked) {
            mySliderMulti.data('slider').hideGrid(true);
        } else {
            mySliderMulti.data('slider').hideGrid(false);
        }
    }

    hideMinMax.oninput = function() {
        if ((<HTMLInputElement>hideMinMax).checked) {
            mySliderMulti.data('slider').hideMinMax(true);
        } else {
            mySliderMulti.data('slider').hideMinMax(false);
        }
    }

    const horizontalBut = document.getElementById('button__hor');
    const verticalBut = document.getElementById('button__ver');

    horizontalBut.onclick = function() {
        mySliderMulti.data('slider').changeOrientation('horizontal');
    }

    verticalBut.onclick = function() {
        mySliderMulti.data('slider').changeOrientation('vertical');
    }
})