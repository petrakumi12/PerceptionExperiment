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
            'In this survey, you will be shown various graphs and will be prompted to '+
            'input what percentage the smaller value is from the bigger. ^200 <br><br>'+
            'Once you are sure of your answer, press Next. ^200 <br><br>'+
            'You are able to go back any time to change your answer, until you press Next on the final question.<br>'
        ],
        typeSpeed: 10,
        showCursor: false,

    })
}
