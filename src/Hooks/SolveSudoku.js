function SolveSudoku(sudoku) {
    console.log("puzzle", sudoku)
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let blockArr = [[], [], [], [], [], [], [], [], []]
    let puzzle = sudoku.map(e => e.map(f => +f));
    console.log("puzzle", puzzle)
  
    function makeBlock(arr){
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
      }
    })
    }
  
    makeBlock(puzzle)
  
    const getBlock = (ind, i) => {
      return ind < 3 && i < 3 ? blockArr[0] :
        ind < 3 && i > 2 && i < 6 ? blockArr[1] :
        ind < 3 && i > 5 ? blockArr[2] :
        ind > 2 && ind < 6 && i < 3 ? blockArr[3] :
        ind > 2 && ind < 6 && i > 2 && i < 6 ? blockArr[4] :
        ind > 2 && ind < 6 && i > 5 ? blockArr[5] :
        ind > 5 && i < 3 ? blockArr[6] :
        ind > 5 && i > 2 && i < 6 ? blockArr[7] :
        ind > 5 && i > 5 ? blockArr[8] : null
    }
  
    const createPuzzObject = (arrArr) => {
      let mappedPuzz = arrArr.map((e, ind) => {
      return arrArr[ind].reduce((a, v, i) => {
        return [
          ...a,
          {value: v, y: ind, x: i, pos: [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], arrArr[0][i], arrArr[1][i], arrArr[2][i], arrArr[3][i], arrArr[4][i], arrArr[5][i], arrArr[6][i], arrArr[7][i], arrArr[8][i]], block: getBlock(ind, i), answers: []}
        ]
      }, [])
    })
    let poopyButthole = []
    mappedPuzz.forEach(e => {
      poopyButthole = [...poopyButthole, ...e]
    })
    return poopyButthole
    }
  
      let solCounter = 0
      let altCounter = 0
      let finished = []
  
    do {
    let newPuzzle = createPuzzObject(puzzle)
      
      let count1 = 0
      let count2 = 0
  
      solCounter = newPuzzle.reduce((acc, val) => {
        return acc += val.value
      }, 0)
      newPuzzle.forEach(e => {
        e.block = Array.from(new Set(getBlock(e.y, e.x))).filter(y => y > 0)
        let newNumbers = numbers.slice()
        let possibleAnswers = []
        if(e.x == count1 && e.y == count2){e.pos = Array.from(new Set([...e.pos, ...e.block])).filter(y => y > 0)}
        let currentNumbers = e.pos.join('').match(/[1-9]/gi).map(t => +t)
        currentNumbers = Array.from(new Set(currentNumbers))
        possibleAnswers = newNumbers.filter(g => !currentNumbers.includes(g))
        if(e.value == 0 && possibleAnswers.length == 1){
          e.value = possibleAnswers[0]
        }
        e.answers = possibleAnswers
      if(count1 < 8){
        count1 += 1
      } else {
        count2 += 1
        count1 = 0
      }
      
      })
      console.log("ding")
      let finalArray = [[], [], [], [], [], [], [], [], []]
      let final = newPuzzle.map(e => {
        return e.value
      })
      console.log("ding2")
    //   for(let i = 0; i < final.length; i++){
    //     return i < 9 ? finalArray[0].push(final[i]) :
    //     i > 8 && i < 18 ? finalArray[1].push(final[i]) :
    //     i > 17 && i < 27 ? finalArray[2].push(final[i]) :
    //     i > 26 && i < 36 ? finalArray[3].push(final[i]) :
    //     i > 35 && i < 45 ? finalArray[4].push(final[i]) :
    //     i > 44 && i < 54 ? finalArray[5].push(final[i]) :
    //     i > 53 && i < 63 ? finalArray[6].push(final[i]) :
    //     i > 62 && i < 72 ? finalArray[7].push(final[i]) :
    //     i > 71 && i < 81 ? finalArray[8].push(final[i]) : null
    //   }

      for(let i = 0; i < final.length; i++){
        if(i < 9){finalArray[0].push(final[i])}else if(i > 8 && i < 18){finalArray[1].push(final[i])}else if(i > 17 && i < 27){finalArray[2].push(final[i])}else if(i > 26 && i < 36){finalArray[3].push(final[i])}else if(i > 35 && i < 45){finalArray[4].push(final[i])}else if(i > 44 && i < 54){finalArray[5].push(final[i])}else if(i > 53 && i < 63){finalArray[6].push(final[i])}else if(i > 62 && i < 72){finalArray[7].push(final[i])}else if(i > 71 && i < 81){finalArray[8].push(final[i])}
      }

  
      solCounter = final.reduce((acc, val) => {
        return acc += val
      }, 0)
      altCounter += 1
  
      puzzle = finalArray
  console.log("ding3")
    //   let samplesBeta = newPuzzle.filter(e => {
    //     return e.x > 2 && e.x < 6 && e.y < 3
    //   })
      makeBlock(finalArray)
      
    } while (solCounter < 405)
    console.log("finalPuzzle", puzzle)
  return puzzle
  }

  export default SolveSudoku;