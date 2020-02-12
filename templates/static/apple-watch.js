function apple_watch(){
	// if 0-100 is exclusive, change this to 98 and add 1 in order to get a range of
// 1-99
let data = d3.range(10).map(() => Math.floor(Math.random() * Math.floor(100)));
data = data.map((d, i) => {return [d, 100 - d, i]});
//.sort((a, b) => {return a-b})
let colors = {
	1: "#550000",
	2: "#005500",
	3: "#000055",
	4: "#000000"
}

var margin = {top: 8, right: 10, bottom: 2, left: 10},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

let pie = d3.pie()
	.sort(null)
	.value(d => d);


var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
svg.selectAll("g")
	.data(data)
	.enter().append("g")
		.attr("transform", "translate(" + (margin.left + width / 2) + "," +
				(margin.top + height / 2) + ")")
		.selectAll("path")
		.data(d => {
			let p = pie(d.slice(0,2))
			p.map(x => {x.pieIndex = d[2]})
			return p
		})
		.join("path")
			.attr("fill", d => {
				if (d.index === 0) return "#000000"
				else return "#CCCCCC"
			})
			.attr("stroke", d => {
				console.log(d)
				if (d.index === 0) return "#CCCCCC"
				else return "#CCCCCC"
			})
			.attr("d", d => {
				let t = d3.arc()
					.innerRadius(10 + 10*d.pieIndex)
					.outerRadius(20+10*d.pieIndex)
				return t(d)
			})

}
apple_watch()