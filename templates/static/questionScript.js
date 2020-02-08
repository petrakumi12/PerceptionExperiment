let tests = load_test_vars();
let responses = {};
let cur_number = null;

window.onload = function () {
    disable_next_button();
    for (let val of tests[1]) {
        console.log('a', tests[0][val])
    }
    console.log('returned test', tests);
    document.getElementById("input-text").addEventListener("keyup", function () {
        disable_next_button()
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
    document.getElementById('fcn-output').innerText = tests[0][cur_number]
    document.getElementById("input-text").value = "";
    disable_next_button()

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
function gen_1(){
    return 1
}
function gen_2(){
    return 2
}
function gen_3(){
    return 3
}
function gen_4(){
    return 4
}
function gen_5(){
    return 5
}
function gen_6(){
    return 6
}
function gen_7(){
    return 7
}
function gen_8(){
    return 8
}
function gen_9(){
    return 9
}
function gen_10(){
    return 10
}