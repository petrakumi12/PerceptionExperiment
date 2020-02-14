function pie_chart() {
    let margin = 40,
        width = window.innerWidth * 0.6 - margin,
        height = window.innerHeight * 0.4- margin;

    let data = d3.range(10).map(() => Math.floor(Math.random() * Math.floor(99))+1);
    data.sort(function (a, b) {
        return b - a
    });

    console.log("data is", data);

    var radius = Math.min(width, height) / 2 - margin
    var mark_radius = radius - 7

    let svg = d3.select(".graph")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    let pie = d3.pie()
        .value(function (d) {
            console.log('aaaa', d.value)
            return d.value;
        });
    let data_ready = pie(d3.entries(data))

    svg
        .selectAll('.pie_parts')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
        )
        .attr('fill-opacity', 0)
        .attr('stroke', 'black')
        .style("stroke-width", "2px");

    svg
        .selectAll('circle')
        .data(generate_marker_pos())
        .enter().append('circle')
        .attr('cx', function (d) {
            return mark_radius * Math.cos((-Math.PI / 2) + get_marker_pos(d, data))
        })
        .attr('cy', function (d) {
            return mark_radius * Math.sin((-Math.PI / 2) + get_marker_pos(d, data))
        })
        .attr('r', 4)
}

function get_marker_pos(d, data) {

    let increment = data.reduce((a, b) => a + b, 0)/100
    console.log('increment', increment)
    let sum = 0;

    for (let i = 0; i < d; i++) {
        sum = sum + data[i] / increment
    }
    return (Math.PI / 50) * sum - (Math.PI / 50) * data[d - 1] / (2*increment)
}

//from this stackoverlfow post
// https://stackoverflow.com/questions/19277973/generate-4-random-numbers-that-add-to-a-certain-value-in-javascript/19278123
function randombetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//generates array of thecount random elements that sums up to a max value
function generate(max, thecount) {
    var r = [];
    var currsum = 0;
    for (var i = 0; i < thecount - 1; i++) {
        r[i] = randombetween(1, max - (thecount - i - 1) - currsum);
        currsum += r[i];
    }
    r[thecount - 1] = max - currsum;
    return r;
}
