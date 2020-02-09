window.onload = function () {
    gen_background()
    console.log(d3)
    type_text()
}

function start_clicked() {
    //have a post request here
    console.log('start clicked')
    window.location = "/questionPage";
}


function type_text() {
    console.log("hi")
    new Typed('#help-text', {
        strings: [
            '<i> Hello there, and thank you for deciding to take this survey!</i> ^200 <br><br>'+
            'In this survey, you will be shown various data visualizations and will be prompted to '+
            'input how much bigger one value is from the other. ^200 <br><br>'+
            'Once you are sure of your answer, press next. ^200 <br><br>'+
            'Once you press next, you will not be able to go back. <br>'
        ],
        typeSpeed: 10,
        showCursor: false,

    })
}
