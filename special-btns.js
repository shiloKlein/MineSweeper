function onHintClick() {

    if (isMegaHintOn) hideMegaHint

    if (gHint <= 0 || gGame.showCount === 0) return
    var elHint = document.querySelector('.hint')
    var elTable = document.querySelector('table')
    if (!isHintoN) {
        elHint.classList.add('hinted')
        elTable.classList.add('hinted')
        isHintoN = true
    } else {
        elHint.classList.remove('hinted')
        elTable.classList.remove('hinted')
        isHintoN = false
    }

}
function giveHint(elcell) {

    var rowIdx = +getPosFromClass(elcell).i
    var colIdx = +getPosFromClass(elcell).j
    console.log(rowIdx);

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            // console.log(elCell);
            if (j < 0 || j >= gBoard[0].length) continue
            console.log(i, j);

            // if (isHintoN) { }
            var elNegCell = document.querySelector(`.cell-${i}-${j}`)
            elNegCell.classList.add('clicked')
            elNegCell.querySelector('span').style.visibility = 'visible'
            setTimeout(hideAll, 1000, elcell);
        }
    }
    isHintoN = false
    gHint--
    console.log(gHint);
    
    var elHintSigns = document.querySelector('.hint-sign');
    elHintSigns.innerText = '';
    var elHintsSignContainer = []
    for (i = 1; i <= gHint; i++) {
        elHintsSignContainer.push('💡')
        elHintSigns.innerText += elHintsSignContainer[0]

    }
}

function hideAll() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var elCell = document.querySelector(`.cell-${i}-${j}`)
            if (!gBoard[i][j].isShown) {
                elCell.classList.remove('clicked')
                elCell.classList.remove('hinted')
                elCell.querySelector('span').style.visibility = 'hidden'
            }
        }
    }
    var elMegaHint = document.querySelector('.mega-hint')
    var elTable = document.querySelector('table')
    var elBtns = document.querySelectorAll('button')
    var elTimer = document.querySelector('.timer')
    elMegaHint.innerText = `MEGA HINT`
    elMegaHint.classList.remove('hinted')
    elTable.classList.remove('hinted')
    elTimer.classList.remove('hinted')
    for (var i = 0; i < elBtns.length; i++) {
        elBtns[i].classList.remove('hinted')
    }
}




function onMegaHintClick() {
    if (isHintoN){
        hideHint 
        isHintoN=false
    } 
    if (gMegaHint <= 0 || gGame.showCount === 0) return
    var elMegaHint = document.querySelector('.mega-hint')
    var elTable = document.querySelector('table')
    var elBtns = document.querySelectorAll('button')
    var elTimer = document.querySelector('.timer')
    
    if (!isMegaHintOn) {
        elMegaHint.innerText = `${gMegaHint} left`
        elMegaHint.classList.add('hinted')
        elTable.classList.add('hinted')
        elTimer.classList.add('hinted')
        for (var i = 0; i < elBtns.length; i++) {
            elBtns[i].classList.add('hinted')
        }
        isMegaHintOn = true
    } else {
        elMegaHint.innerText = `MEGA HINT`
        elMegaHint.classList.remove('hinted')
        elTable.classList.remove('hinted')
        elTimer.classList.remove('hinted')
        for (var i = 0; i < elBtns.length; i++) {
            elBtns[i].classList.remove('hinted')
        }
        isMegaHintOn = false
    }
}


function giveMegaHint(elCells) {
    var topRowIdx = +getPosFromClass(elCells[0]).i
    var leftColIdx = +getPosFromClass(elCells[0]).j
    var bottomRowIdx = +getPosFromClass(elCells[1]).i
    var rightColIdx = +getPosFromClass(elCells[1]).j
    // console.log(rowIdx);
    
    if ((leftColIdx - topRowIdx) === (rightColIdx - bottomRowIdx) &&
    topRowIdx < bottomRowIdx && leftColIdx < rightColIdx) {
        for (var i = topRowIdx; i <= bottomRowIdx; i++) {
            
            
            for (var j = leftColIdx; j <= rightColIdx; j++) {
                // console.log(elCell);                
                var elCell = document.querySelector(`.cell-${i}-${j}`)
                elCell.classList.add('clicked')
                elCell.querySelector('span').style.visibility = 'visible'
                
                gMegaHint = 0
                isMegaHintOn = false
                
                setTimeout(hideAll, 2000, );
            }
        }
    } else hideAll
}



function onSafeClick() {
    
    if (!gGame.showCount || !safeClickLeft || gGame.showCount + gLevel.MINES === gLevel.SIZE ** 2) return
    // console.log(gGame.isOn);
    
    var i = getRandomInt(0, gBoard.length)
    var j = getRandomInt(0, gBoard.length)
    if (gBoard[i][j].isShown || gBoard[i][j].isMine) onSafeClick()
    else {
        var elRandCell = document.querySelector(`.cell-${i}-${j}`)
        elRandCell.classList.add('clicked')
        elRandCell.classList.add('hinted')
        
        elRandCell.querySelector('span').style.visibility = 'visible'
        
        safeClickLeft--
        
        // handling the signs
        safesingnsLeft = 'SAFE CLICK '
        var elSafeContainer = []
        for (var i = 0; i < safeClickLeft; i++) {
            console.log(i);
            
            elSafeContainer.push('🔍')
            
            safesingnsLeft += elSafeContainer[0]
        }
        
        document.querySelector('.safe-click').innerText = `${safesingnsLeft}`
        safesingnsLeft = 'SAFE CLICK '
        elSafeContainer = []
        
        setTimeout(hideAll,2000)//(hideSfeClick, 2000, i, j);
        
    }
}
// function hideSfeClick(rowIdx, colIdx) {
    
    
//     var cell = document.querySelector(`.cell-${rowIdx}-${colIdx}`)
//     cell.classList.remove('clicked')
//     cell.classList.remove('hinted')
    
//     cell.querySelector('span').style.visibility = 'hidden'
// }







// function hideHint(elcell) {
//     isHintoN = false
//     var rowIdx = +getPosFromClass(elcell).i
//     var colIdx = +getPosFromClass(elcell).j
//     console.log(rowIdx);

//     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//         if (i < 0 || i >= gBoard.length) continue

//         for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//             // console.log(elCell);
//             if (j < 0 || j >= gBoard[0].length) continue
//             var elNegCell = document.querySelector(`.cell-${i}-${j}`)
//             if (!gBoard[i][j].isShown) {
//                 elNegCell.classList.remove('clicked')
//                 elNegCell.querySelector('span').style.visibility = 'hidden'
//             }

//         }
//     }
//     var elHint = document.querySelector('.hint')
//     var elTable = document.querySelector('table')
//     elHint.classList.remove('hinted')
//     elTable.classList.remove('hinted')
//     var elHintSigns = document.querySelector('.hint-sign');
//     elHintSigns.innerText = '';
//     var elHintsSignContainer = []
//     for (i = 1; i <= gHint; i++) {
//         elHintsSignContainer.push('💡')
//         elHintSigns.innerText += elHintsSignContainer[0]
//     }
// }


// function hideMegaHint(topRow, BottomRow, leftCole, rightCol) {
    
    //     isMegaHintOn = false
    
    //     for (var i = topRow; i <= BottomRow; i++) {
        //         for (var j = leftCole; j <= rightCol; j++) {
            //             var elCell = document.querySelector(`.cell-${i}-${j}`)
            //             if (!gBoard[i][j].isShown) {
                //                 elCell.classList.remove('clicked')
//                 elCell.querySelector('span').style.visibility = 'hidden'
//             }
//         }

//     }
//     var elMegaHint = document.querySelector('.mega-hint')
//     var elTable = document.querySelector('table')
//     var elBtns = document.querySelectorAll('button')
//     var elTimer = document.querySelector('.timer')
//     elMegaHint.innerText = `MEGA HINT`
//     elMegaHint.classList.remove('hinted')
//     elTable.classList.remove('hinted')
//     elTimer.classList.remove('hinted')
//     for (var i = 0; i < elBtns.length; i++) {
//         elBtns[i].classList.remove('hinted')

//     }
// }