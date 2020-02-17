let tests = load_test_vars();
let cur_number = null;
let bar = null;
let progress_number = 0;
let responses = {
    1: {'truth': undefined, 'guess': undefined, 'data': undefined, 'markers': undefined},
    2: {'truth': undefined, 'guess': undefined, 'data': undefined, 'markers': undefined},
    3: {'truth': undefined, 'guess': undefined, 'data': undefined, 'markers': undefined},
    4: {'truth': undefined, 'guess': undefined, 'data': undefined, 'markers': undefined},
    5: {'truth': undefined, 'guess': undefined, 'data': undefined, 'markers': undefined},
    6: {'truth': undefined, 'guess': undefined, 'data': undefined, 'markers': undefined},
    7: {'truth': undefined, 'guess': undefined, 'data': undefined, 'markers': undefined},
    8: {'truth': undefined, 'guess': undefined, 'data': undefined, 'markers': undefined},
    9: {'truth': undefined, 'guess': undefined, 'data': undefined, 'markers': undefined},
    10: {'truth': undefined, 'guess': undefined, 'data': undefined, 'markers': undefined},
    11: {'truth': undefined, 'guess': undefined, 'data': undefined, 'markers': undefined},
    12: {'truth': undefined, 'guess': undefined, 'data': undefined, 'markers': undefined}
};
let current_test = -1;
let num_tests = 12;

window.onload = function () {

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
    disable_next_button();
    enter_button_listener();
    // console.log('returned test', tests);
    document.getElementById("input-text").addEventListener("keyup", function () {
        disable_next_button()
    });
    disable_back_button()
    next()
    // d3.select(window).on('resize.updatesvg', updateWindow);

};

function enter_button_listener() {
    let input = document.getElementById('input-text');
    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById('next-btn').click();
        }
    });
}

function load_test_vars() {
    //var tests = d3.range(10);
    let tests = {
        1: gen_1,
        2: gen_2,
        3: gen_3,
        4: gen_4,
        5: gen_5,
        6: gen_6,
        7: gen_7,
        8: gen_8,
        9: gen_9,
        10: gen_10,
        11: gen_11,
        12: gen_12
    };
    let shuffled = d3.shuffle(Object.keys(tests)).map((f) => f);
    return [tests, shuffled]
}

function next() {
    document.getElementById('fcn-output').innerHTML = '';
    if (responses[cur_number] !== undefined) {
        cur_number = tests[1][current_test];
        responses[cur_number].guess = document.getElementById("input-text").value;
    }
    current_test += 1
    if (current_test < num_tests) {
        if (current_test === num_tests - 1) {
            document.getElementById('next-btn').innerText = "Finish"
        }

        cur_number = tests[1][current_test];
        //console.log("returennn", cur_number, responses)
        var trueResponse = null
        if (responses[cur_number].data !== undefined) {
            var markers = responses[cur_number].markers
            if (markers !== undefined) {
                trueResponse = tests[0][cur_number]()(responses[cur_number].data, markers)
            }
            else {
                trueResponse = tests[0][cur_number]()(responses[cur_number].data)
            }
        } else {
            trueResponse = tests[0][cur_number]()()
        }

        var minimum = Math.min(trueResponse[0], trueResponse[1])
        var maximum = Math.max(trueResponse[0], trueResponse[1])
        // console.log("truTH", minimum, maximum, minimum / maximum, trueResponse)
        responses[cur_number].truth = 100 * minimum / maximum
        responses[cur_number].data = trueResponse[2]
        responses[cur_number].markers = trueResponse[3]

        if (responses[cur_number].guess !== undefined) {
            document.getElementById("input-text").value = responses[cur_number].guess;
        } else {
            document.getElementById("input-text").value = ""
        }

        progress_number = progress_number + (1.0 / 12.0);
        bar.animate(progress_number);  // Number from 0.0 to 1.0

        disable_next_button();
        disable_back_button()
    } else {
        console.log("final response dict", responses)
        record_response()
        document.getElementById("content-column").innerHTML = "<div id=\"fcn-output\"></div>";
        document.getElementById('fcn-output').innerHTML = "Thank you for taking the survey! <br/> Your response has been recorded.";
        document.getElementById('gif').innerHTML = "<img src='static/img/giphy (1).gif'>";
    }


}

function back() {
    document.getElementById('fcn-output').innerHTML = '';
    if (current_test > 0) {
        responses[cur_number].guess = document.getElementById("input-text").value;
        current_test -= 1
        cur_number = tests[1][current_test];
        // console.log(responses[cur_number], cur_number, responses)
        document.getElementById("input-text").value = responses[cur_number].guess;
        if (responses[cur_number].data !== undefined) {
            var markers = responses[cur_number].markers
            if (markers !== undefined) {
                trueResponse = tests[0][cur_number]()(responses[cur_number].data, markers)
            }
            else {
                trueResponse = tests[0][cur_number]()(responses[cur_number].data)
            }
        } else {
            trueResponse = tests[0][cur_number]()()
        }
        progress_number = progress_number - (1.0 / 12.0);
        bar.animate(progress_number);  // Number from 0.0 to 1.0
        disable_next_button()
        disable_back_button()
    } else {
        document.getElementById("content-column").innerHTML = "<div id=\"fcn-output\"></div>";
        document.getElementById('fcn-output').innerHTML = "Thank you for taking the survey! <br/> Your response has been recorded.";
        document.getElementById('gif').innerHTML = "<img src='static/img/giphy (1).gif'>";
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

function disable_back_button() {
    if (current_test > 0) {
        document.getElementById('back-btn').removeAttribute("disabled");
    } else {
        document.getElementById('back-btn').setAttribute("disabled", null);
    }
}


function record_response() {
    console.log('uploading responses...')
    let currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    var time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    let datestr = (month + 1) + "/" + date + "/" + year + ' ' + time;

    let final_resp = {
        'time': datestr,
        'responses': responses
    };
    fetch('/upload_resp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(final_resp) // body data type must match "Content-Type" header
    })
        .then((response) => {
            console.log('done', response.json());
        })
}

//functions to generate d3 graphs
function gen_1() {
    return appleWatch
}

function gen_2() {
    return appleWatch
}

function gen_3() {
    return appleWatch
}

function gen_4() {
    return smallMultiples
}

function gen_5() {
    return smallMultiples
}

function gen_6() {
    return smallMultiples
}

function gen_7() {
    return bar_chart
}

function gen_8() {
    return bar_chart
}

function gen_9() {
    return bar_chart
}

function gen_10() {
    return pie_chart
}

function gen_11() {
    return pie_chart
}

function gen_12() {
    return pie_chart
}

function updateWindow() {
    let x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
    let y = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

    d3.select('svg').attr("width", x).attr("height", y);
}


function help_popup() {
    help_background = document.createElement('div');
    help_background.id = 'background-div'
    help_background.style.cssText = 'position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%;opacity:0.7;z-index:4;background:#000';
    document.body.appendChild(help_background);

    help_div = document.createElement('div');
    help_div.id = 'help-div';
    help_div.className = 'card';
    help_div.style.cssText = 'position:absolute;top:0;left:0;width:70%;z-index:100;';
    document.body.appendChild(help_div);

    document.getElementById('help-div').innerHTML =
        "    <div class='card-body'>" +
        "    <h5 class='card-title' style='text-align: center'>Survey Instructions</h5>" +
        "    <div class='card-text mx-auto my-auto'>" +
        "    <p style='text-align: center'><br>Each graph you see visualizes ten data points, two of which are marked.<br>" +
        "    You need to input what percentage the smaller marked value is from the bigger one. <br>" +
        "    For example, input 35 if you think the smaller marked section represents 35% the value of bigger marked section.<br>" +
        "    <b>In the charts that contain both black and white sections, the data is the black section.</b> <br/>" +
        "    Once you are sure of your answer, press Next. <br><br>" +
        "    You will be able to go back any time to change your answer until you press Finish on the final question.<br>" +
        "    </p>" +
        "    <p class='help-link' style='text-align: center' onclick='close_help()'><u>Hide Instructions</u></p>" +
        "    </div></div>";
}

function close_help() {
    let background_div = document.getElementById('background-div')
    background_div.parentNode.removeChild(background_div)
    let help_div = document.getElementById('help-div')
    help_div.parentNode.removeChild(help_div)
}