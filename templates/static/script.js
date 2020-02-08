console.log(d3);
console.log(d3.randomInt);
var data = d3.range(10).map(() => {
	return d3.randomInt(1, 101)();
});
console.log(data);
