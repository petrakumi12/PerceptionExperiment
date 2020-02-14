var appleWatch = () => {
	// if 0-100 is exclusive, change this to 98 and add 1 in order to get a range of
	// 1-99
	let data = d3.range(10).map(() => Math.floor(Math.random() * Math.floor(99)));
	data = data.map((d, i) => {return [d+1, 99 - d, i]});
	//.sort((a, b) => {return a-b})
	
var selection = d3.select(".graph").node().getBoundingClientRect()
	var margin = {top: 40, right: 30, bottom: 10, left: 30},
		  width = selection.width - margin.left - margin.right,
		  height = 400 - margin.top - margin.bottom;
	
	let pie = d3.pie()
		.sort(null)
		.value(d => d);

	let chosenOne = [10,10]
	while (chosenOne[0] === 10 || chosenOne[0] === 9) {
		chosenOne[0] = Math.floor(Math.random() * 10)
	}
	chosenOne[1] = chosenOne[0]+1

    var svg = d3.select(".graph").append("svg")
        .attr("width", width)
        .attr("height", height)
    svg.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("class", d => {
            if (d !== undefined && (d[2] === chosenOne[0] || d[2] === chosenOne[1])) {
                //console.log("You were the chosen one, Anakin!", chosenOne, d[2])
                return "chosenOne"
            }
            return "lame"
        })
        .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ") scale(1.3)")
        .selectAll("path")
        .data(d => {
            let p = pie(d.slice(0, 2))
            p.map(x => {
                x.pieIndex = d[2]
            })
            return p
        })
        .join("path")
        .attr("fill", d => {
            if (d.index === 0) return "#000000"
            else return "#CCCCCC"
        })
        .attr("stroke", d => {
            if (d.index === 0) return "#CCCCCC"
            else return "#CCCCCC"
        })
        .attr("d", d => {
            let t = d3.arc()
                .innerRadius(10 + 10 * d.pieIndex)
                .outerRadius(20 + 10 * d.pieIndex)
            return t(d)
        })


	svg.selectAll(".chosenOne")
	    .selectAll("circle")
	    .data((d) => {
				return [{"data": d[0], "index": d[2]}]
			})
			.enter().append("circle")
				.attr("cx", d => {
					if (d.data > 95) return 5
					else return -3
				}) 
				.attr("cy", d => {
						return -15 - 10*d.index
				})
				.attr("r", 3)
				.attr("fill", d => {
					if (d.data > 95) return "#FFFFFF"
					else return "#000000"
				})
	

	console.log("HI PETRA", [data[chosenOne[0]][0], data[chosenOne[0]][0]])
	return [data[chosenOne[0]][0], data[chosenOne[1]][0]]
}
