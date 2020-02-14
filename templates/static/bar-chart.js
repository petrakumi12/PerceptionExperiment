function bar_chart(data=null, marker_pos=null) {
    let margin = {top: 40, right: 30, bottom: 40, left: 85},
        width = window.innerWidth * 0.6 - margin.left - margin.right,
        height = window.innerHeight * 0.4 - margin.top - margin.bottom;

    if (data === null) {
			data = d3.range(10).map(() => 1 + Math.floor(Math.random() * Math.floor(99)))
		}

    console.log("data is", data);

    let svg = d3.select(".graph").append("svg");

    svg.attr("class", "plt_background")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    // Add X axis
    let x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width - margin.right - margin.left]);
    svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + (height+margin.top) + ")")
        .call(d3.axisBottom(x)
            .tickValues([])
            .tickSize(0))
        .attr("class", "axis")
        .style("stroke-width", "2px");


    // Add Y axis
    let y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);
    svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(d3.axisLeft(y)
            .tickValues([])
            .tickSize(0)
        )
        .attr("class", "axis")
        .style("stroke-width", "2px")


    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d, i) {
            return (i * (width - margin.left - margin.right) / 10);
        })
        .attr("y", function (d) {
            return y(d);
        })
        .attr("transform", "translate(" + (1 + margin.left) + "," + margin.top + ")")
        .attr("width", ((width - margin.left - margin.right) / 10) - 10)
        .attr("height", function (d) {
            return height - y(d);
        })
        .attr('fill-opacity', 0)
        .attr('stroke', 'black')
        .style("stroke-width", "2px")
        .attr('');

		if (marker_pos === null) marker_pos = generate_marker_pos()

    svg.selectAll('.marker')
        .data(marker_pos)
        .enter().append('circle')
        .attr('cx', function (d) {
            rect_width = d3.select('.bar').node().getBoundingClientRect().width
            console.log(rect_width)
            return (d * (rect_width) + (d - 1) * 10 - (rect_width / 2))
        })
        .attr('cy', height + margin.bottom)
        .attr("transform", "translate(" + (margin.left) + "," + margin.bottom/2 + ")")
        .attr('r', 5)
	
		return [data[marker_pos[0]-1], data[marker_pos[1]-1], data, marker_pos]

}

function generate_marker_pos() {
    let markers = [];
    markers[0] = Math.floor(Math.random() * Math.floor(9)) + 1;
    markers[1] = markers[0] + 1;
    console.log(markers)
    return markers
}


