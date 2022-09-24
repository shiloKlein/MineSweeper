'use strict'


function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function getPosFromClass(el) {

    var splittedClass = el.classList[1].split('-')
    var pos = { i: splittedClass[1], j: splittedClass[2] }
    return pos;
}



function startTimer() {
    gTime = Date.now()
   
    gTimeInterval = setInterval(updateTimer, 100)

}

function updateTimer() {
    var diff = Date.now() - gTime
    var infSeconds = +(diff / 1000).toFixed(0)
    seconds = infSeconds < 60 ? infSeconds : infSeconds % 60
    if (infSeconds>60&&infSeconds % 60 === 0) minutes++


    document.querySelector('.seconds').innerText = seconds
    document.querySelector('.minutes').innerText = `${minutes}:`

}

function stopTimer() {
    clearInterval(gTimeInterval)
}



