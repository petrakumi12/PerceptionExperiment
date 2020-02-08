window.onload = function () {
    db_test()
    console.log(d3)
}

function db_test() {
    console.log('here')
    fetch('/db_test', {
        method: 'GET',
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            document.getElementsByTagName('body')[0].innerHTML = '<p>' + res.text + '</p>'
        })
}

console.log(d3.randomInt);
var data = d3.range(10).map(() => {
	return d3.randomInt(1, 101)();
});
console.log(data);

//var tests = d3.range(10);
var tests = [
	() => console.log("Test 1"),
	() => console.log("Test 2"),
	() => console.log("Test 3"),
	() => console.log("Test 4"),
	() => console.log("Test 5"),
	() => console.log("Test 6"),
	() => console.log("Test 7"),
	() => console.log("Test 8"),
	() => console.log("Test 9"),
	() => console.log("Test 10")
]
console.log("tests")
tests.map((f) => f());
console.log("shuffle")
d3.shuffle(tests).map((f) => f())

console.log("shuffle")
d3.shuffle(tests).map((f) => f())
