window.onload = function () {
    AOS.init()
    gen_background()
    d3.select(window).on('resize.updatesvg', updateWindow);
    console.log(d3)
}

function start_clicked() {
    window.location = "/questionPage";
}


