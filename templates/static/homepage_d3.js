// window.onload = function () {
//     gen_background()
// }
let t0 = Date.now();

//code retreived from https://observablehq.com/@d3/d3-lineradial and modified for our use
function gen_background() {
    function polygon(sides) {
        var length = sides,
            s = 1,
            phase = 0;
        const radial = d3
            .lineRadial()
            .curve(d3.curveCardinalClosed)
            .angle((_, i) => (i / length) * 2 * Math.PI + phase)
            .radius(() => s);
        const poly = function () {
            return radial(Array.from({length}));
        };
        poly.context = function (_) {
            return arguments.length ? (radial.context(_), poly) : radial.context();
        };
        poly.n = function (_) {
            return arguments.length ? ((length = +_), poly) : length;
        };
        poly.rotate = function (_) {
            return arguments.length ? ((phase = +_), poly) : phase;
        };
        poly.scale = function (_) {
            return arguments.length ? ((s = +_), poly) : s;
        };
        poly.curve = function (_) {
            return arguments.length ? (radial.curve(_), poly) : radial.curve();
        };
        poly.radius = radial.radius;
        poly.angle = radial.angle;
        return poly;
    }

    let svg = d3.select("#svg-div")
        .append("svg")
        .attr("width", window.innerWidth)
        .attr("height", window.innerHeight)

    svg
        .append("path")
        .attr("class", 'background-viz')
        .attr("d", polygon(6).scale(700))
        .attr("fill", "#307891")
        .attr("fill-opacity", 0.6)
        .attr("stroke", "#1b3445")
        .attr('stroke-width', 2)
        .attr("stroke-opacity", 0.6)


    d3.timer(function () {
        let delta = (Date.now() - t0);
        svg.selectAll(".background-viz").attr("transform", function () {
            return "translate(" + window.innerWidth + "," + window.innerHeight + ")" + "rotate(" + delta * 0.01 + ")";
        });
    });

    setTimeout(function () {
        svg
            .append("path")
            .attr("class", 'background-viz2')
            .attr("d", polygon(8).scale(500))
            .attr("fill", "#cecece")
            .attr("fill-opacity", 0)
            .attr("stroke", "#0e2a2b")
            .attr('stroke-width', 2)
            .attr("stroke-opacity", 0)
            .transition()
            .duration(200)
            .attr("fill-opacity", 0.3)
            .attr("stroke-opacity", 0.6)


        d3.timer(function () {
            let delta = (Date.now() - t0);
            svg.selectAll(".background-viz2")
                .attr("transform", function () {
                    return "translate(" + window.innerWidth + "," + window.innerHeight + ")" + "rotate(" + delta * -0.02 + ")";
                });
        });
    }, 500)


}

function updateWindow() {
    let x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
    let y = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

    d3.select('svg').attr("width", x).attr("height", y);
}

