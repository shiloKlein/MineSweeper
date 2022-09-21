'use strict'

// choos board size
var gLevel={
     SIZE:4,
     MINES:2
}
var gGame = {
    isOn:false,
    showCont:0,
    markedCount:0,
    secsPassed:0
}


const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ' '


var gBoard
// choose how many mines
// var gMinescount = 2
var gClickCount = 0

function onInitGame() {
    gBoard = buildBoard(gLevel.SIZE)

    // console.table(gBoard);

    renderBoard(gBoard, '.board')
    gGame.isOn=true
}


function onCellClicked(elCell) {
    var i = +getPosFromClass(elCell).i//get the elcell position
    var j = +getPosFromClass(elCell).j//get the elcell position

    if(gGame.isOn && !gBoard[i][j].isMarked){
    if (!gClickCount) {
        createMines(gBoard)
        setMinesNegsCount()
    }
    // update the is shown propery
    // update the model
   
    gBoard[i][j].isShown = true

    // update the dom:
    elCell.innerText = gBoard[i][j].content
    elCell.classList.add('clicked')
    checkGameOver()
    if(gBoard[i][j].content===MINE)gGame.isOn =false

    gClickCount++
    // console.log('gClickCount', gClickCount);
}
}

function onCellMarked(elCell){
    // console.log(elCell);
    var i = +getPosFromClass(elCell).i
    var j = +getPosFromClass(elCell).j
    var currCell= gBoard[i][j]
    if (!currCell.isMarked){
        // update the model
        gBoard[i][j].isMarked=true
        console.log(gBoard[i][j]);
        // update the DOM
        elCell.innerText=FLAG
        gGame.markedCount++
        console.log('markedCount',gGame.markedCount);
        
    }else{
        // update the model
        gBoard[i][j].isMarked=false
        console.log(gBoard[i][j]);
        
    }
    
    
    
    

}
function checkGameOver(){
    if(gGame.showCont===gLevel.SIZE**-gLevel.MINES&&gGame.markedCount===gLevel.MINES){
        gGame.isOn=false

    }
}



function createMines(board) {

    
    // and mining
    if (gLevel.MINES > 0) {
        var emptyPos = []
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[0].length; j++) {
                emptyPos.push({ i, j })
            }
        }
        for (var h = 0; h < gLevel.MINES; h++) {
            var randPos = getRandomInt(0, emptyPos.length)
            var minePos = emptyPos.splice(randPos, 1)
            // UPDATE THE MODEL
            board[minePos[0].i][minePos[0].j].content = MINE
            console.log(minePos[0])//[minePos[0].j]);
            // UPDATE THE DOM
            // renderCell(minePos[0], MINE)
        }
    }
    console.table(board);
    
    
    
}


function setMinesNegsCount() {
    
    
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            // console.log(currCell);
            
            currCell.mineNegs = countActiveNegs(gBoard, i, j)
            // console.log(currCell.mineNegs);
            if (currCell.mineNegs && currCell.content !== MINE) {
                
                currCell.content = currCell.mineNegs

//show the numbers at the begining 
                // console.log(currCell.content);
                // var elCell = document.querySelector(`.cell-${i}-${j}`)
                
                // // console.log(elCell);
                // elCell.innerText = currCell.mineNegs
            }
        }
    }
    console.log(gBoard);
    
}
// function getMinesNegsCount(board,celCell){
    //     // console.log(cell);
    //     var cellPos = getPosFromClass(celCell)
    //     console.log(cellPos);
    
    //     for(var i=0; i<board.length; i++){
        //         for(var j=0; j<board[0].length; j++)
        //         var currCell=board[cellPos.i][cellPos.j]
        //         // console.log(currCell);
        
        //         currCell.mineNegs= countActiveNegs(board,cellPos.i, cellPos.j)
        //         console.log(currCell.mineNegs);
        
        //     }
        // }
        // buildBoard(size)
        function buildBoard(boardSize) {
            const table = []
            for (var i = 0; i < boardSize; i++) {
                table.push([])
                for (var j = 0; j < boardSize; j++) {
                    // console.log(i,j);
                    
                    table[i][j] = { i, j, content: '', mineNegs: 0, isMarked: false, isShown: false }
                }
            }
            return table
        }
           
           
           
           
            // update the model
            // mat[0][3].content = MINE
            // mat[2][3].content = MINE
            // mat[4][1].content = MINE
            // mat[3][1].content = MINE
            
            // update the dom
            // renderCell({i:0,j:3}, MINE)
            // renderCell({ i: 2, j: 3 }, MINE)
            // renderCell({ i: 4, j: 1 }, MINE)
            // renderCell({ i: 3, j: 1 }, MINE)