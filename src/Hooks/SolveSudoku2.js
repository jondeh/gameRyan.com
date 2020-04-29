function SolveSudoku2(sudoku){   // START OF FUNCTION <===

// Clone Puzzle Function
    // let attempt = sudoku.map(e => e.map( f=> +f))
    let puzzle = sudoku.map(e => e.map( f=> typeof(f) == "string" ? f = 0 : f))
    // console.log("attempt", attempt)
    // console.log("puzzle", puzzle)

//    End Clone Puzzle
    
// General Variables
    let solCounter = 0
//    End General Variables
    
// Make Blocks Function
    let blockArr = [[], [], [], [], [], [], [], [], []]
    function makeBlocks(arr){
        arr.forEach((e,i) => {
            if(i < 3){
                let first = e.slice(0, 3)
                let second = e.slice(3, 6)
                let third = e.slice(6)
          
                blockArr[0] = [...blockArr[0], ...first]
                blockArr[1] = [...blockArr[1], ...second]
                blockArr[2] = [...blockArr[2], ...third]
            } else if(i > 2 && i < 6){
                let first = e.slice(0, 3)
                let second = e.slice(3, 6)
                let third = e.slice(6)
          
                blockArr[3] = [...blockArr[3], ...first]
                blockArr[4] = [...blockArr[4], ...second]
                blockArr[5] = [...blockArr[5], ...third]
            } else {
                let first = e.slice(0, 3)
                let second = e.slice(3, 6)
                let third = e.slice(6)
          
                blockArr[6] = [...blockArr[6], ...first]
                blockArr[7] = [...blockArr[7], ...second]
                blockArr[8] = [...blockArr[8], ...third]
    }})}
    makeBlocks(puzzle)
//    End Make Blocks
    
// Get Block Function
    const getBlock = (ind, i) => {
        return ind < 3 && i < 3 ? [blockArr[0], 0] :
          ind < 3 && i > 2 && i < 6 ? [blockArr[1], 1]:
          ind < 3 && i > 5 ? [blockArr[2], 2]:
          ind > 2 && ind < 6 && i < 3 ? [blockArr[3], 3]:
          ind > 2 && ind < 6 && i > 2 && i < 6 ? [blockArr[4], 4] :
          ind > 2 && ind < 6 && i > 5 ? [blockArr[5], 5]:
          ind > 5 && i < 3 ? [blockArr[6], 6]:
          ind > 5 && i > 2 && i < 6 ? [blockArr[7], 7] :
          ind > 5 && i > 5 ? [blockArr[8], 8] : null
    }
//    End Get Block Function
    
// Create Puzzle Array of Objects Function
    const createPuzzObject = (arrArr) => {
    let mappedPuzz = arrArr.map((e, ind) => {
        return arrArr[ind].reduce((a, v, i) => {
          return [
            ...a,
            {x: i, y: ind, b: getBlock(ind, i)[1], v: v, notNums: [], xNotNums: [], yNotNums: [], bNotNums: [], possibleX: [], possibleY: [], possibleB: [], answers: []}
          ]
        }, [])
    }).reduce((acc,val) => acc.concat(val), [])
    return updateProps(mappedPuzz)
    }
//    End Create Puzzle Array of Objects
    
// Update Object Properties
      const updateNotNums = (e, arrOfObj) => {
        e.yNotNums = arrOfObj.filter(f => f.y == e.y).map(f => f.v).sort((a,b) => a - b)
        e.xNotNums = arrOfObj.filter(f => f.x == e.x).map(f => f.v).sort((a,b) => a - b)
        e.bNotNums = arrOfObj.filter(f => f.b == e.b).map(f => f.v).sort((a,b) => a - b)
        e.notNums = [...e.xNotNums, ...e.yNotNums, ...e.bNotNums].sort((a,b) => a - b)
        condenseNotNums(e, arrOfObj)
      }
    
      const condenseNotNums = (e, arrOfObj) => {
        e.xNotNums = Array.from(new Set(e.xNotNums)).filter(f =>  f > 0)
        e.yNotNums = Array.from(new Set(e.yNotNums)).filter(f =>  f > 0)
        e.bNotNums = Array.from(new Set(e.bNotNums)).filter(f =>  f > 0)
        e.notNums = Array.from(new Set(e.notNums)).filter(f =>  f > 0)
      }
    
      const updateAnswersAndValue = (e, arrOfObj) => {
        if(e.v === 0){
          e.answers = Array.from({length: 9}, (e, i) => i+1).filter(g => !e.notNums.includes(g))
        }
        if(e.v == 0 && e.answers.length == 1){
          e.v = e.answers[0]
          e.answers = []
        }
        updatePossibles(e, arrOfObj)
      }
    
      const updatePossibles = (e, arrOfObj) => {
        e.possibleX = arrOfObj.filter(f => f.y == e.y && f.v === 0).map(f => f.answers).reverse()
        e.possibleY = arrOfObj.filter(f => f.x == e.x && f.v === 0).map(f => f.answers).reverse()
        e.possibleB = arrOfObj.filter(f => f.b == e.b && f.v === 0).map(f => f.answers).reverse()
        updateNotNums(e, arrOfObj)
      }
    
      const updateProps = (arrOfObj) => {
        arrOfObj.forEach((e, ind) => {
            if(e.v === 0){updateNotNums(e, arrOfObj)}
            if(e.v === 0){updateAnswersAndValue(e, arrOfObj)}
        //   e.v === 0 ? updateNotNums(e, arrOfObj) : null
        //   e.v === 0 ? updateAnswersAndValue(e, arrOfObj) : null
    
    
        })
        arrOfObj.forEach((e, ind) => {
            if(e.v === 0){updatePossibles(e, arrOfObj)}
            if(e.v === 0){updateAnswersAndValue(e, arrOfObj)}
            if(e.v === 0){findHidden(e, arrOfObj)}
        //   e.v === 0 ? updatePossibles(e, arrOfObj) : null
        //   e.v === 0 ? updateAnswersAndValue(e, arrOfObj): null
        //   e.v === 0 ? findHidden(e, arrOfObj) : null
          // e.v === 0 ? findNakedPairs(e, arrOfObj) : null
        })
        return arrOfObj
      }
//    End Update Object Properties
    
    
// Find Hidden Singles Function
      const findHidden = (e, arrOfObj) => {
        if(e.v === 0){
          e.answers.forEach((a, b) => {
            let answersArr = e.possibleX.reduce((acc, val) => {
             if(val.indexOf(a) !== -1){
                acc.push(val)
              }
              return acc
            }, [])
        if(answersArr.length < 2 && e.v === 0){
          e.v = a
          e.answers = []
        }
        updatePossibles(e, arrOfObj)
        })
        }
// Possible Y and Block Hidden Singles
    
// Y Singles
        if(e.v === 0){
          e.answers.forEach((a, b) => {
            let answersArr = e.possibleY.reduce((acc, val) => {
             if(val.indexOf(a) !== -1){
                acc.push(val)
              }
              return acc
            }, [])
        if(answersArr.length < 2 && e.v === 0){
          e.v = a
          e.answers = []
        }
        updatePossibles(e, arrOfObj)
        })
        }
        updatePossibles(e, arrOfObj)
//    End Y Singles
    
//  Block Singles
        if(e.v === 0){
          e.answers.forEach((a, b) => {
            let answersArr = e.possibleB.reduce((acc, val) => {
             if(val.indexOf(a) !== -1){
                acc.push(val)
              }
              return acc
            }, [])
            if(e.x === 2 && e.y === 2)(console.log(e.x, e.y, answersArr, answersArr.length, e.v, a, e.answers, answersArr < 2, e.v === 0))
            if(answersArr.length < 2 && e.v === 0){
    
              e.v = a
              e.answers = []
            } 
        updatePossibles(e, arrOfObj)
        })
        }
//  End Block Singles
//  End Y, Block Singles
    
      updatePossibles(e, arrOfObj)
}
//    End Find Hidden Singles
    
// Solve
      let puzzleObj = createPuzzObject(puzzle)

    //   let solutionCounter = 0 // Adds up total value of puzzle. Complete puzzle will be 405
    //   const getSolutionCounter = () => {
    //     solutionCounter = puzzleObj.reduce((acc, val) => {
    //     return acc += val.v
    //   }, 0)}
      // console.log(solutionCounter) //

        updateProps(puzzleObj)
        updateProps(puzzleObj)
        updateProps(puzzleObj)
        updateProps(puzzleObj)
        updateProps(puzzleObj)
        updateProps(puzzleObj)

    //   getSolutionCounter() 
    
// End Solve
    
// Return
      let final = puzzleObj.map(e => e.v)
      let finalArray = [[], [], [], [], [], [], [], [], []]

    for(let i = 0; i < final.length; i++){
        if(i < 9){finalArray[0].push(final[i])}else if(i > 8 && i < 18){finalArray[1].push(final[i])}else if(i > 17 && i < 27){finalArray[2].push(final[i])}else if(i > 26 && i < 36){finalArray[3].push(final[i])}else if(i > 35 && i < 45){finalArray[4].push(final[i])}else if(i > 44 && i < 54){finalArray[5].push(final[i])}else if(i > 53 && i < 63){finalArray[6].push(final[i])}else if(i > 62 && i < 72){finalArray[7].push(final[i])}else if(i > 71 && i < 81){finalArray[8].push(final[i])}
  }
    
    
return finalArray

}

export default SolveSudoku2;