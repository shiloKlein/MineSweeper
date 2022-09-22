'use strict'

// function renderBoard(mat, selector) {

//     var strHTML = '<table border="0"><tbody>'
//     for (var i = 0; i < mat.length; i++) {

//         strHTML += '<tr>'
//         for (var j = 0; j < mat[0].length; j++) {

//             const cell = mat[i][j]
//             const className = 'cell cell-' + i + '-' + j
//             strHTML += `<td class="${className}">${cell}</td>`
//         }
//         strHTML += '</tr>'
//     }
//     strHTML += '</tbody></table>'

//     const elContainer = document.querySelector(selector)


//     elContainer.innerHTML = strHTML
// }

// location such as: {i: 2, j: 7}
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

function getPosFromClass(el){
    // console.log(el.classList);
    // console.log(el.classList[1]);
    var splittedClass = el.classList[1].split('-')
    var pos = {i:splittedClass[1],j:splittedClass[2]}
    return pos; 
}



// neighbors count loop
// function countActiveNegs(board, rowIdx, colIdx) {
//     var count = 0
//     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//         if (i < 0 || i >= board.length) continue
//         for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//             if (i === rowIdx && j === colIdx) continue
//             if (j < 0 || j >= board[0].length) continue
//             var currCell = board[i][j]
//             if (currCell.isActive) count++
//         }
//     }
//     return count
// }






function startTimer() {
    gTime = Date.now()
    gTimeInterval = setInterval(updateTimer, 100)

}

function updateTimer() {
    var diff = Date.now() - gTime
    var seconds = +(diff / 1000).toFixed(0)
    // var minutes=parseInt((seconds/60))
    // seconds=seconds-minutes*60+seconds
    // if(seconds===5){
    //     seconds=0
    //     minutes+=1
    // }
    // console.log(minutes);
    // var elTimer =document.querySelector('.timer')

   document.querySelector('.seconds').innerText = seconds
    // var elMinutes = document.querySelector('.minutes').innerText = minutes+':'
}

function stopTimer() {
    clearInterval(gTimeInterval)
}



