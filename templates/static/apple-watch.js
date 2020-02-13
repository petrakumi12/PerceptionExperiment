var appleWatch = () => {
	// if 0-100 is exclusive, change this to 98 and add 1 in order to get a range of
	// 1-99
	let data = d3.range(10).map(() => Math.floor(Math.random() * Math.floor(99)));
	data = data.map((d, i) => {return [d+1, 99 - d, i]});
	//.sort((a, b) => {return a-b})
	
	var margin = {top: 8, right: 10, bottom: 2, left: 10},
		  width = 960 - margin.left - margin.right,
		  height = 500 - margin.top - margin.bottom;
	
	let pie = d3.pie()
		.sort(null)
		.value(d => d);

	let chosenOne = [10,10]
	while (chosenOne[0] === 10 || chosenOne[0] === 9) {
		chosenOne[0] = Math.floor(Math.random() * 10)
	}
	chosenOne[1] = chosenOne[0]+1

    console.log("HELLO THERE",  d3.select(".graph"))
    var svg = d3.select(".graph").append("svg")
        .attr("width", width)
        .attr("height", height)
    svg.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("class", d => {
            //console.log("dd", d)
            if (d !== undefined && (d[2] === chosenOne[0] || d[2] === chosenOne[1])) {
                console.log("You were the chosen one, Anakin!", chosenOne, d[2])
                return "chosenOne"
            }
            return "lame"
        })
        .attr("transform", "translate(" + (margin.left + width / 2) + "," +
            (margin.top + height / 2) + ")")
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
            //console.log(d)
            if (d.index === 0) return "#CCCCCC"
            else return "#CCCCCC"
        })
        .attr("d", d => {
            let t = d3.arc()
                .innerRadius(10 + 10 * d.pieIndex)
                .outerRadius(20 + 10 * d.pieIndex)
            return t(d)
        })

	//console.log("You were the chosen one Anakin!", chosenOne)

	svg.selectAll(".chosenOne")
	    .selectAll("circle")
	    .data((d) => {
				//console.log(d)
				return [{"data": d[0], "index": d[2]}]
			})
			.enter().append("circle")
				.attr("cx", d => {
					if (d.data > 95) return 5
					else return -3
				}) 
				.attr("cy", d => {
						//console.log("why", d)
						//console.log(-15 - 10*d.index)
						return -15 - 10*d.index
				})
				.attr("r", 3)
				.attr("fill", d => {
					if (d.data > 95) return "#FFFFFF"
					else return "#000000"
				})

}
