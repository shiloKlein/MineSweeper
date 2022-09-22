'use strict'

// choos board size
var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gGame = {
    isOn: false,
    showCount: 0,
    markedCount: 0,
    secsPassed: 0
}

// { i, j, content: ''/💣, mineNegs: 0, isMarked: false, isShown: false }

const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ' '


var gBoard
var gTime
var gTimeInterval
var gLives = 1

function onInitGame() {
    gBoard = buildBoard(gLevel.SIZE)
    renderBoard(gBoard, '.board')
    gGame.isOn = true

}


function onCellClicked(elCell) {

    var i = +getPosFromClass(elCell).i//get the elcell position
    var j = +getPosFromClass(elCell).j//get the elcell position

    if (!gGame.isOn || gBoard[i][j].isMarked||gBoard[i][j].isShown) return

    console.log(gGame.showCount);
    if (!gGame.showCount) {
        startTimer()
        createMines(gBoard, i, j)
        setMinesNegsCount()
    }
    // update the model
    gBoard[i][j].isShown = true

    // update the dom:

    elCell.classList.add('clicked')
    var elCellContent = elCell.querySelector('span')
    console.log(elCellContent);

    elCellContent.style.visibility = 'visible'

    // checkVictory()

    console.log('showCount', gGame.showCount);

    if (gBoard[i][j].isMine === true) {
        gLives--
        var elLives = document.querySelector('.lives');
        elLives.innerText = '';
        var elLivesContainer = []
        for(i=1; i<=gLives;i++){
            elLivesContainer.push('💖')
            elLives.innerText+=elLivesContainer[0]
        }
        // elLives.innerText=

        // [...new Array(gLives)].forEach(i => document.querySelector('.lives').innerText += 'לב')
        if (!gLives) {
            gameOver()
            return
        }
    }
    gGame.showCount++
    checkVictory()
    ExpandShown(i, j)//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // console.log('gClickCount', gClickCount);
}


function ExpandShown(rowIdx, colIdx) {
    // if (!gBoard[rowIdx][colIdx].isMine) gGame.showCount++
    if (gBoard[rowIdx][colIdx].mineNegs ||
        gBoard[rowIdx][colIdx].isMine) return
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            var elCell = document.querySelector(`.cell-${i}-${j}`)
            // console.log(elCell);
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === rowIdx && j === colIdx) continue
            if(gBoard[i][j].isMarked)continue
        
            // console.log(gBoard[i][j]);

            // if (!gBoard[i][j].isMine){
                gBoard[i][j].isMarked=true
                elCell.classList.add('clicked')
                elCell.querySelector('span').style.visibility = 'visible'
            // } 
            ExpandShown(i, j)
        }
    }
}

function gameOver() {
    stopTimer()
    gLives = 3
    gGame.isOn = false
    console.log('you lost dude');
    var elSmily = document.querySelector('.restart-btn')
    elSmily.innerText = '😲'
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            // console.log(i, j);

            var elCell = document.querySelector(`.cell-${i}-${j}`)
            if (gBoard[i][j].isMine) elCell.classList.add('clicked')
            elCell.querySelector('span').style.visibility = 'visible'

        }
    }
    // TODO!! smily
    // TODO!! show mines
}


function restart() {
    stopTimer()
    onInitGame()
    console.log(gGame);
    gGame.markedCount = 0
    gGame.secsPassed = 0
    gGame.showCount = 0
    gGame.showCount = 0
    if(gLevel.SIZE === 4){
        gLives = 1
        document.querySelector('.lives').innerText = '💖'
        console.log(gLevel.MINES);
        
    }else{
        gLives = 3
        document.querySelector('.lives').innerText = '💖💖💖'
    }
    

  
  document.querySelector('.restart-btn').innerText = '🙂'
  document.querySelector('.seconds').innerText = ''
}

function onLevelChoose(elLvlBtn) {
    var level = elLvlBtn.id

    switch (level) {
        case 'begginer':
            gLevel.SIZE = 4
            gLevel.MINES = 2
            break;
        case 'medium':
            gLevel.SIZE = 8
            gLevel.MINES = 14
            break;
        case 'expert':
            gLevel.SIZE = 12
            gLevel.MINES = 20
            break;

    }
    restart()

}


function onCellMarked(elCell) {
    if (!gGame.isOn) return
    // console.log(elCell);
    var i = +getPosFromClass(elCell).i
    var j = +getPosFromClass(elCell).j
    var currCell = gBoard[i][j]
    if (currCell.isShown) return
    if (!currCell.isMarked) {
        // update the model
        gBoard[i][j].isMarked = true
        console.log(gBoard[i][j]);
        // update the DOM
        elCell.innerText = FLAG
        elCell.classList.add('flagged')
        console.log(elCell.innerText);

        gGame.markedCount++


    } else {
        // update the model
        gBoard[i][j].isMarked = false
        console.log(gBoard[i][j]);
        gGame.markedCount--
        // update the DOM
        elCell.innerText = EMPTY

    }
    console.log('markedCount', gGame.markedCount);
    checkVictory()
}

function checkVictory() {
    if (gGame.showCount === gLevel.SIZE ** 2 - gLevel.MINES && gGame.markedCount === gLevel.MINES) {
        gGame.isOn = false
        var elSmily = document.querySelector('.restart-btn')
        elSmily.innerText = '😎'


    }
}








