let tests = load_test_vars();
let cur_number = null;
let bar = null
let progress_number = 0;
let responses = {}

window.onload = function () {
    disable_next_button();
    for (let val of tests[1]) {
        console.log('a', tests[0][val])
    }
    console.log('returned test', tests);
    document.getElementById("input-text").addEventListener("keyup", function () {
        disable_next_button()
    });
    bar = new ProgressBar.Line("#progress-div", {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#1b95b1',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: {width: '100%', height: '100%'},
    from: {color: '#56a89f'},
    to: {color: '#307891'},
    step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
    }
});
    next()
};


function load_test_vars() {
    //var tests = d3.range(10);
    let tests = {
        1: gen_1(),
        2: gen_2(),
        3: gen_3(),
        4: gen_4(),
        5: gen_5(),
        6: gen_6(),
        7: gen_7(),
        8: gen_8(),
        9: gen_9(),
        10: gen_10()
    };
    let shuffled = d3.shuffle(Object.keys(tests)).map((f) => f)
    return [tests, shuffled]
}

function next() {
    responses[cur_number] = document.getElementById("input-text").value;
    console.log('number', cur_number);
    console.log('response', cur_number, responses[cur_number])
    cur_number = tests[1].shift();
    if (cur_number !== undefined) {
        document.getElementById('fcn-output').innerText = tests[0][cur_number]
        document.getElementById("input-text").value = "";
        progress_number = progress_number + 0.1;
        bar.animate(progress_number);  // Number from 0.0 to 1.0
        disable_next_button()
    } else {
        //TODO record response to db
        document.getElementById('fcn-output').innerText = "Thank you for taking the survey! <br/> Your response has been recorded."
    }


}

function disable_next_button() {
    let nameInput = document.getElementById('input-text').value;
    if (nameInput !== "") {
        document.getElementById('next-btn').removeAttribute("disabled");
    } else {
        document.getElementById('next-btn').setAttribute("disabled", null);
    }
}


//functions to generate d3 graphs
function gen_1() {
    return 1
}

function gen_2() {
    return 2
}

function gen_3() {
    return 3
}

function gen_4() {
    return 4
}

function gen_5() {
    return 5
}

function gen_6() {
    return 6
}

function gen_7() {
    return 7
}

function gen_8() {
    return 8
}

function gen_9() {
    return 9
}

function gen_10() {
    return 10
}