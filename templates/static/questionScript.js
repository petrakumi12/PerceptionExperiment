let tests = load_test_vars();
let cur_number = null;
let bar = null;
let progress_number = 0;
let responses = {};
let current_test = -1;
let num_tests = 10;

window.onload = function () {
    disable_next_button();
    enter_button_listener();
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
		disable_back_button()
    next()
};

function enter_button_listener() {
    let input = document.getElementById('input-text');
    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            console.log("hereeee")
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
        10: gen_10
    };
    let shuffled = d3.shuffle(Object.keys(tests)).map((f) => f)
    return [tests, shuffled]
}

function next() {
		current_test += 1
    if (current_test < num_tests) {
      responses[cur_number] = document.getElementById("input-text").value;

			cur_number = tests[1][current_test];

			tests[0][cur_number]()()
      if (responses[cur_number] !== undefined) {
				document.getElementById("input-text").value = responses[cur_number];
			} else {
				document.getElementById("input-text").value = ""
			}

      progress_number = progress_number + 0.1;
      bar.animate(progress_number);  // Number from 0.0 to 1.0

      disable_next_button()
			disable_back_button()
    } else {
        //TODO record response to db
        document.getElementById("content-column").innerHTML = "<div id=\"fcn-output\"></div>";
        document.getElementById('fcn-output').innerHTML = "Thank you for taking the survey! <br/> Your response has been recorded.";
        document.getElementById('gif').innerHTML = "<img src='static/img/giphy (1).gif'>";
        console.log("final response dict", responses)
    }


}

function back() {
    if (current_test > 0) {
				responses[cur_number] = document.getElementById("input-text").value;
				current_test -= 1
				cur_number = tests[1][current_test];
				tests[0][cur_number]()()
				console.log(responses[cur_number], cur_number, responses)
        document.getElementById("input-text").value = responses[cur_number];
        progress_number = progress_number - 0.1;
        bar.animate(progress_number);  // Number from 0.0 to 1.0
				disable_next_button()
        disable_back_button()
    } else {
        //TODO record response to db
        document.getElementById("content-column").innerHTML = "<div id=\"fcn-output\"></div>";
        document.getElementById('fcn-output').innerHTML = "Thank you for taking the survey! <br/> Your response has been recorded.";
        document.getElementById('gif').innerHTML = "<img src='static/img/giphy (1).gif'>";
        console.log("final response dict", responses)
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



//functions to generate d3 graphs
function gen_1() {
    appleWatch()
	return function() {return 1}
}

function gen_2() {
    smallMultiples()
	return () => 2
}

function gen_3() {
    return () => {return 3}
}

function gen_4() {
    return () => 4
}

function gen_5() {
    return () => 5
}

function gen_6() {
    return () => 6
}

function gen_7() {
    return () => 7
}

function gen_8() {
    return () => 8
}

function gen_9() {
    return () => 9
}

function gen_10() {
    return () => 10
}
