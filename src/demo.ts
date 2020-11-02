interface JQuery {
    slider(settings: object) : JQuery;
}

$(() => {
    const input = document.querySelector('.slider-input') as HTMLInputElement;
    const inputFrom = document.querySelector('.slider-input-from') as HTMLInputElement;
    const inputTo = document.querySelector('.slider-input-to') as HTMLInputElement;
    const inputStep = document.querySelector('.slider-step') as HTMLInputElement;
    const inputMin = document.querySelector('.slider-min') as HTMLInputElement;
    const inputMax = document.querySelector('.slider-max') as HTMLInputElement;

    const mySlider2 = $('.slider2').slider({
        type: 'items',
        min: 10,
        max: 90,
        from: 20, // если single, то этот параметр не учитывается
        to: 80,
        step: 10,
        items: ['junior', 'middle', 'senior'],
        orientation: 'vertical',
        hideGrid: false,
        hideValue: false,
        hideMinMax: false
    });

    mySlider2.data('slider').changeOrientation('horizontal');
    mySlider2.data('slider').changeMax(200);


    const mySlider = $('.slider')
        .on('slider.valueCalced', function (event, value) {
            input.value = value;
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
            type: 'double',
            min: 10,
            max: 90,
            from: 20, // если single, то этот параметр не учитывается
            to: 80,
            step: 10,
            items: ['junior', 'middle', 'senior'],
            // orientation: 'vertical',
            hideGrid: false,
            hideValue: false,
            hideMinMax: false
        });


    /////////////////////
    input.onkeypress = function(event) {
        const value = parseInt(input.value)
        if (isNaN(value)) {
            return;
        }
        if (event.code === 'Enter'){
            event.preventDefault();
            mySlider.data('slider').update(value);
        }
    };

    inputFrom.onkeypress = function(event) {
        const value = parseInt(inputFrom.value)
        if (isNaN(value)) {
            return;
        }
        if (event.code === 'Enter'){
            event.preventDefault();
            mySlider.data('slider').updateFrom(value);
        }
    };

    inputTo.onkeypress = function(event) {
        const value = parseInt(inputTo.value)
        if (isNaN(value)) {
            return;
        }
        if (event.code === 'Enter'){
            event.preventDefault();
            mySlider.data('slider').updateTo(value);
        }
    };

    inputStep.onkeypress = function(event) {
        const value = parseInt(inputStep.value)
        if (isNaN(value)) {
            return;
        }
        if (event.code === 'Enter'){
            event.preventDefault();
            mySlider.data('slider').changeStep(value);
        }
    }

    inputMin.onkeypress = function(event) {
        const value = parseInt(inputMin.value)
        if (isNaN(value)) {
            return;
        }
        if (event.code === 'Enter'){
            event.preventDefault();
            mySlider.data('slider').changeMin(value);
        }
    }

    inputMax.onkeypress = function(event) {
        const value = parseInt(inputMax.value)
        if (isNaN(value)) {
            return;
        }
        if (event.code === 'Enter'){
            event.preventDefault();
            mySlider.data('slider').changeMax(value);
        }
    }


     ////////////////////////////////////////////
    let singleBut = document.getElementById('button__single');
    let doubleBut = document.getElementById('button__double');
    let itemsBut = document.getElementById('button__items');
    let hideValue = document.getElementById('hidevalue');
    let hideGrid = document.getElementById('hidegrid');
    let hideMinMax = document.getElementById('hideminmax');
    let horizontalBut = document.getElementById('button__hor');
    let verticalBut = document.getElementById('button__ver');

    singleBut.onclick = function() {
        mySlider.data('slider').changeView('single');
    }
    doubleBut.onclick = function(event) {
        mySlider.data('slider').changeView('double');
    }
    itemsBut.onclick = function() {
        mySlider.data('slider').changeView('items');
    }

    horizontalBut.onclick = function() {
        mySlider.data('slider').changeOrientation('horizontal');
    }

    verticalBut.onclick = function() {
        mySlider.data('slider').changeOrientation('vertical');
    }

    hideValue.oninput = function() {
        if ((<HTMLInputElement>hideValue).checked) {
            mySlider.data('slider').hideValue(true);
        } else {
            mySlider.data('slider').hideValue(false);
        }
    }

    hideGrid.oninput = function() {
        if ((<HTMLInputElement>hideGrid).checked) {
            mySlider.data('slider').hideGrid(true);
        } else {
            mySlider.data('slider').hideGrid(false);
        }
    }

    hideMinMax.oninput = function() {
        if ((<HTMLInputElement>hideMinMax).checked) {
            mySlider.data('slider').hideMinMax(true);
        } else {
            mySlider.data('slider').hideMinMax(false);
        }
    }
})