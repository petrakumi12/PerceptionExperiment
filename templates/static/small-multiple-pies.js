var smallMultiples = () => {
	//console.log("WE ARE HERE")
	// if 0-100 is exclusive, change this to 98 and add 1 in order to get a range of
	// 1-99
	let data = d3.range(10).map(() => Math.floor(Math.random() * Math.floor(99)));
	data = data.map((d, i) => {return [d+1, 99 - d, i]});

	let margin = {top: 8, right: 10, bottom: 2, left: 10},
	    width = 69 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;
	
	let arc = d3.arc()
	    .innerRadius(0)
	    .outerRadius(Math.min(width, height) / 2 - 1)
	
	let pie = d3.pie()
		.sort(null)
		.value(d => d);
	
	arcLabel = () => {
	  let radius = Math.min(width, height) / 2;
	  return d3.arc().innerRadius(radius).outerRadius(radius);
	}

	var svg = d3.select(".graph")
		.append("div").attr("id", "smallMultiplesDiv")
		.selectAll("svg")
	      .data(data)
	    .enter().append("svg")
	      .attr("width", width + margin.left + margin.right)
	      .attr("height", height + margin.top + margin.bottom)
				.attr("class", "smallMultiples")
	    .append("g")
					.attr("transform", "translate(" + (margin.left + width / 2) + "," + 
						(margin.top + height / 2) + ")")
				.selectAll("path")
				.data((d, i) => {
					let p = pie(d.slice(0,2))
					p.map((x) => {
						x["pieIndex"] = i
					})
					return p
				})
				.join("path")
				  .attr("fill", (d) => {
						//console.log(d.pieIndex)
						if (d.index === 0) {
							return "#000000"
						}
						else {
							return "#CCCCCC"
						}
					})
					.attr("stroke", d => {
						if (d.index !== 2) { return "#000000"}
						else { return "#CCCCCC"}
					})
				  .attr("d", arc)
	
	let chosenOne = [10,10]
	while (chosenOne[0] === 10 || chosenOne[0] == 9) {
		chosenOne[0] = Math.floor(Math.random() * 10)
	}
	chosenOne[1] = chosenOne[0] + 1
	//while (chosenOne[1] === 10 || chosenOne[1] === chosenOne[0]) {
	//	chosenOne[1] = Math.floor(Math.random() * 10)
	//}
	
	d3.selectAll(".smallMultiples")
		.attr("class", d => {
				//console.log("dd", d)
				if (d !== undefined && (d[2] === chosenOne[0] || d[2] === chosenOne[1])) {
					//console.log("You were the chosen one, Anakin!", chosenOne, d[2])
					return "chosenOne"
				}
				if (d!== undefined) {
					//console.log("Your parents were nobody", chosenOne, d[2])
				}
				return "lame"
			})
console.log(d3.selectAll(".chosenOne"))	
	d3.selectAll(".chosenOne").append("g")
	      .attr("font-family", "sans-serif")
	      .attr("font-size", 36)
	      .attr("text-anchor", "middle")
	    .selectAll("text")
	    .data((d, i) => {
				//console.log("THIS IS A DATUM", d, i)
					let p = pie(d)
					//console.log("p0", d, p, p[0])
					p.map((x) => {
						x["pieIndex"] = i
					})
					//console.log(p)
					return p
				})
	    .join("text")
	      .attr("transform", d => {
					let temp = arcLabel().centroid(d)
					temp[0] = margin.left + width / 2
					temp[1] = margin.top + height / 2 + 10
					//console.log(temp)
					return `translate(${temp})`
				})
	      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
	          .attr("x", 0)
	          .attr("y", "0.7em")
	          .attr("fill-opacity", 0.7)
						.attr("fill", "#000000")
	          .text("."))
}
