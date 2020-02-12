function bar_chart() {
    let margin = {top: 80, right: 30, bottom: 10, left: 30},
        width = window.innerWidth - margin.left - margin.right,
        height = window.innerHeight - margin.top - margin.bottom;

    let data = d3.range(10).map(() => Math.floor(Math.random() * Math.floor(100)));

    console.log("data is", data)

    let svg = d3.select("body").append("svg")

    let colors = {
        1: "#550000",
        2: "#005500",
        3: "#000055",
        4: "#000000"
    };

    svg.attr("class", "plt_background")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    // Add X axis
    let x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width - margin.right - margin.left]);
    svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + height + ")")
        .call(d3.axisBottom(x)
            .tickValues([])
            .tickSize(0))
        .attr("class", "axis");


    // Add Y axis
    let y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);
    svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + 0 + ")")
        .call(d3.axisLeft(y)
            .tickValues([])
            .tickSize(0)
        )
        .attr("class", "axis");


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
        .attr("transform", "translate(" + margin.left + "," + 0 + ")")
        .attr("width", ((width - margin.left - margin.right) / 10) - 10)
        .attr("height", function (d) {
            return height - y(d);
        });


}

window.onload = function () {
    bar_chart();

}





