'use strict'

// choos board size
var gLevel={
     SIZE:4,
     MINES:2
}
var gGame = {
    isOn:false,
    showCount:0,
    markedCount:0,
    secsPassed:0
}


const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ' '


var gBoard
var gClickCount = 0
var gInterval

function onInitGame() {
    gBoard = buildBoard(gLevel.SIZE)

    // console.table(gBoard);

    renderBoard(gBoard, '.board')
    gGame.isOn=true
}


function onCellClicked(elCell) {
    var i = +getPosFromClass(elCell).i//get the elcell position
    var j = +getPosFromClass(elCell).j//get the elcell position

    if(!gGame.isOn || gBoard[i][j].isMarked) return
    console.log(gClickCount);
    
    if (!gGame.showCount) {
        createMines(gBoard, i,j)
        setMinesNegsCount()
    }
    // update the is shown propery
    // update the model
   
    gBoard[i][j].isShown = true

    // update the dom:
    elCell.innerText = gBoard[i][j].content
    elCell.classList.add('clicked')
    checkVictory()

    if(gBoard[i][j].content===MINE){
        gameOver()
       
    }else gGame.showCount++
    console.log('showCount',gGame.showCount);
    
    gClickCount++
    checkVictory()
    // console.log('gClickCount', gClickCount);
}

function gameOver(){
    gGame.isOn =false
    console.log('you lost dude');
    var elSmily = document.querySelector('.restart-btn')
    elSmily.innerText='😲'
    // TODO!! smily
    // TODO!! show mines
}


function restart(){
    onInitGame()
    console.log(gGame);
    gGame. markedCount=0
    gGame.secsPassed=0
    gGame.showCount=0
    gClickCount=0

    var elSmily = document.querySelector('.restart-btn')
    elSmily.innerText='🙂'
}

function onLevelChoose(elLvlBtn){
    var  level = elLvlBtn.id 

    switch(level){
        case 'begginer':
            gLevel.SIZE=4
            gLevel.MINES=2
            break;
        case 'medium':
            gLevel.SIZE=8
            gLevel.MINES=14
            break;
        case 'expert':
            gLevel.SIZE=12
            gLevel.MINES=32
            break;
        
    }
    restart()

    // if(level==='begginer'){

    //     console.log('begginer');
    // }else if(level==='medium'){
    //     console.log('medium');
    // }else if(level==='expert'){
    //     console.log('expert');
        
    // }
    
}


function onCellMarked(elCell){
    if(!gGame.isOn)return
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
        
        
    }else{
        // update the model
        gBoard[i][j].isMarked=false
        console.log(gBoard[i][j]);
        gGame.markedCount--
        // update the DOM
        elCell.innerText=EMPTY

    }
    console.log('markedCount',gGame.markedCount);
    checkVictory()
}

function checkVictory(){
    if(gGame.showCount===gLevel.SIZE**2-gLevel.MINES&&gGame.markedCount===gLevel.MINES){
        gGame.isOn=false
        var elSmily = document.querySelector('.restart-btn')
        elSmily.innerText='😎'
        

    }
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