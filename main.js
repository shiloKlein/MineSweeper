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


const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ' '


var gLives = 1
var gBoard

var gTime
var gTimeInterval
var seconds = 0
var minutes = 0


var isHintoN = false
var gHint = 3
var isMegaHintOn = false
var gMegaHint = 1
var megaHintCells = []
var isPlacingMines = false
var isManualOn = false
var lastLevel


var safeClickLeft = 3

function onInitGame() {
    gBoard = buildBoard(gLevel.SIZE)
    renderBoard(gBoard, '.board')
    gGame.isOn = true
    renderBestScore()

}


function onCellClicked(elCell) {

    if (isHintoN) {
        giveHint(elCell)
        return
    }
    if (isMegaHintOn) {

        megaHintCells.push(elCell)
        if (megaHintCells.length === 2) {
            giveMegaHint(megaHintCells)
            console.log(megaHintCells);
            megaHintCells = []
        }

        return
    }
    if (isPlacingMines) {
        manualMininig(elCell)
        return
    }
    var i = +getPosFromClass(elCell).i//get the elcell position
    var j = +getPosFromClass(elCell).j//get the elcell position

    if (!gGame.isOn || gBoard[i][j].isMarked || gBoard[i][j].isShown) return

    console.log(gGame.showCount);
    if (!gGame.showCount) {
        startTimer()
        if (!isManualOn) createMines(gBoard, i, j)
        setMinesNegsCount()
    }
    // update the model
    gBoard[i][j].isShown = true

    // update the dom:

    elCell.classList.add('clicked')
    var elCellContent = elCell.querySelector('span')
    console.log(elCellContent);

    elCellContent.style.visibility = 'visible'


    console.log('showCount', gGame.showCount);
    checkVictory()
    if (gBoard[i][j].isMine === true) {
        gLives--
        gGame.markedCount++//adding to the count even though it is not a mark for the victory check

        var elLives = document.querySelector('.lives');
        elLives.innerText = '';
        var elLivesContainer = []
        for (i = 1; i <= gLives; i++) {
            elLivesContainer.push('💖')
            elLives.innerText += elLivesContainer[0]
        }
        if (!gLives) {
            gameOver()
            return
        }
    } else gGame.showCount++

    checkVictory()
    ExpandShown(i, j)//   recurtion!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}


function ExpandShown(rowIdx, colIdx) {
    if (gBoard[rowIdx][colIdx].mineNegs ||
        gBoard[rowIdx][colIdx].isMine) return
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            var elCell = document.querySelector(`.cell-${i}-${j}`)
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === rowIdx && j === colIdx) continue
            if (gBoard[i][j].isShown) continue


            if (!gBoard[i][j].isMine && !gBoard[i][j].isMarked) {
                gBoard[i][j].isShown = true
                gGame.showCount++
                elCell.classList.add('clicked')
                elCell.querySelector('span').style.visibility = 'visible'
            }
            ExpandShown(i, j)
        }
    }
    checkVictory()
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

            var elCell = document.querySelector(`.cell-${i}-${j}`)
            console.log(elCell);

            if (gBoard[i][j].isMine) {
                elCell.classList.add('clicked')
                elCell.querySelector('span').style.visibility = 'visible'
            }

        }
    }
}


function restart() {
    stopTimer()
    onInitGame()
    console.log(gGame);
    if (!isPlacingMines) isManualOn = false
    gGame.markedCount = 0
    gGame.secsPassed = 0
    gGame.showCount = 0
    gLevel.MINES = lastLevel ? lastLevel : 2
    isHintoN = false
    gMegaHint = 1
    safeClickLeft = 3
    seconds = 0
    minutes = 0

    if (gLevel.SIZE === 4) {
        gLives = 1
        document.querySelector('.lives').innerText = '💖'
        console.log(gLevel.MINES);
    } else {
        gLives = 3
        document.querySelector('.lives').innerText = '💖💖💖'
    }
    gHint = 3
    document.querySelector('.hint-sign').innerText = '💡💡💡'

    document.querySelector('.safe-click').innerText = 'SAFE CLICK 🔍🔍🔍'
    document.querySelector('.restart-btn').innerText = '🙂'
    document.querySelector('.seconds').innerText = ''
    document.querySelector('.minutes').innerText = ''
    hideAll()
}



function onLevelChoose(elLvlBtn) {
    var level = elLvlBtn.id
    switch (level) {
        case 'begginer':
            gLevel.SIZE = 4
            gLevel.MINES = 2
            lastLevel = gLevel.MINES
            break;
        case 'medium':
            gLevel.SIZE = 8
            gLevel.MINES = 14
            lastLevel = gLevel.MINES
            break;
        case 'expert':
            gLevel.SIZE = 12
            gLevel.MINES = 32
            lastLevel = gLevel.MINES
            break;
    }
    restart()
}


function onCellMarked(elCell) {
    if (!gGame.isOn||isPlacingMines) return
    if (!gGame.showCount) startTimer()
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
        console.log(elCell.innerText);
        var elFlag = elCell.querySelector('.flag')
        elFlag.innerText = FLAG
        elFlag.style.visibility = 'visible'

        gGame.markedCount++
        checkVictory()


    } else {
        // update the model
        var elFlag = elCell.querySelector('.flag')
        elFlag.innerText = FLAG
        elFlag.style.visibility = 'hidden'
        // var contentHolder = elCell.innerText
        gBoard[i][j].isMarked = false
        console.log(gBoard[i][j]);
        gGame.markedCount--
        // update the DOM
        // elCell.innerText = contentHolder

    }
    console.log('markedCount', gGame.markedCount);
}

function checkVictory() {
    if (gGame.showCount === gLevel.SIZE ** 2 - gLevel.MINES && gGame.markedCount === gLevel.MINES) {
        gGame.isOn = false
        stopTimer()
        var elSmily = document.querySelector('.restart-btn')
        elSmily.innerText = '😎'
        updateBestScore()

    }
}

function updateBestScore() {
    if(isManualOn)return
    var prevBestScoreStr
    var levelBest
    // var prevBestScoreStr=
    switch (gLevel.SIZE) {
        case 4:
            levelBest = 'begginerBest'
            prevBestScoreStr = localStorage.getItem(levelBest)
            break;
        case 8:
            levelBest = 'mediumBest'
            prevBestScoreStr = localStorage.getItem(levelBest)
            break;
        case 12:
            levelBest = 'expertBest'
            prevBestScoreStr = localStorage.getItem(levelBest)
            break;
    }
    if (prevBestScoreStr) {
        var splitedBestScore = prevBestScoreStr.split(':')
        // console.log(+minutes, +splitedBestScore[0], +seconds, +splitedBestScore[1], levelBest, splitedBestScore);
        if (minutes < +splitedBestScore[0] ||
            (+minutes <= +splitedBestScore[0] && +seconds < +splitedBestScore[1])) {
            localStorage.setItem(levelBest, `${+minutes}:${+seconds}`)
        }

    } else localStorage.setItem(levelBest, `${minutes}:${seconds}`)
    renderBestScore()
}
function renderBestScore() {
    var elCurrBest
    var elCurrLevel
    switch (gLevel.SIZE) {
        case 4:
            elCurrLevel = 'begginer'
            elCurrBest = document.querySelector(`.${elCurrLevel}-best`)
            elCurrBest.innerText = `${elCurrLevel} best time:`
            elCurrBest.innerText += localStorage.getItem(`${elCurrLevel}Best`) ? localStorage.getItem(`${elCurrLevel}Best`) : '--'

        case 8:
            elCurrLevel = 'medium'
            elCurrBest = document.querySelector(`.${elCurrLevel}-best`)
            elCurrBest.innerText = `${elCurrLevel} best time:`
            elCurrBest.innerText += localStorage.getItem(`${elCurrLevel}Best`) ? localStorage.getItem(`${elCurrLevel}Best`) : '--'
        case 12:
            elCurrLevel = 'expert'
            elCurrBest = document.querySelector(`.${elCurrLevel}-best`)
            elCurrBest.innerText = `${elCurrLevel} best time:`
            elCurrBest.innerText += localStorage.getItem(`${elCurrLevel}Best`) ? localStorage.getItem(`${elCurrLevel}Best`) : '--'
    }
}

