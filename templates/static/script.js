window.onload = function () {
    db_test()
    console.log(d3)
}

function db_test() {
    console.log('here')
    fetch('/db_test', {
        method: 'GET',
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            document.getElementsByTagName('body')[0].innerHTML = '<p>' + res.text + '</p>'
        })
}