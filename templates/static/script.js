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
