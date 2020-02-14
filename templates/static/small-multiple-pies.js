var smallMultiples = () => {
    //console.log("WE ARE HERE")
    // if 0-100 is exclusive, change this to 98 and add 1 in order to get a range of
    // 1-99
    let data = d3.range(10).map(() => Math.floor(Math.random() * Math.floor(99)));
    data = data.map((d, i) => {
        return [d + 1, 99 - d, i]
    });


    let margin = {top: 8, right: 10, bottom: 20, left: 10},
        width = window.innerWidth * 0.4 + 69 - 69 - margin.left - margin.right,
        height = window.innerHeight * 0.4 - margin.top - margin.bottom;

    let arc = d3.arc()
        .innerRadius(0)
        .outerRadius(Math.min(width / 5, height / 5) / 2 - 1)

    let pie = d3.pie()
        .sort(null)
        .value(d => d);

    arcLabel = () => {
        let radius = Math.min(width / 5, height / 5) / 2;
        return d3.arc().innerRadius(radius).outerRadius(radius);
    }

    let svg = d3.select(".graph")
        .append("div").attr("id", "smallMultiplesDiv")
        .selectAll("svg")
        .data(data)
        .enter().append("svg")
        .attr("class", 'svg-class')
        .attr("width", width / 6)
        .attr("height", height / 3)
        .append("g")
        .attr("class", "smallMultiples")
        .attr("transform", "translate(" + (width / 12) + "," +
            (height / 6) + ")")
        .selectAll("path")
        .data((d, i) => {
            let p = pie(d.slice(0, 2))
            p.map((x) => {
                x["pieIndex"] = i
            })
            return p
        })
        .join("path")
        .attr("fill", (d) => {
            //console.log(d.pieIndex)
            if (d.index === 0) {return "#000000"}
            else {return "#CCCCCC"}
        })
        .attr("stroke", d => {
            if (d.index !== 2) {return "#000000"}
            else {return "#CCCCCC"}
        })
        .attr("d", arc)
        .style("stroke-width", "2px");



    d3.select(".graph")
        .append('svg')
        .attr('width', function () {
            return d3.select('.graph').node().getBoundingClientRect().width
        })
        .attr('height', 35)
        .selectAll('circle')
        .data(generate_marker_pos())
        .enter().append('circle')
        .attr('cx', function (d) {
            let pie_width = d3.select('.svg-class').node().getBoundingClientRect().width
            return (d-1) * (pie_width+2)
        })
        .attr('cy', 5)
        .attr("transform", "translate(" + (width / 12) + "0)")
        .attr('r', 4)

}
