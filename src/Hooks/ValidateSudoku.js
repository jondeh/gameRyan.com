function ValidateSudoku(board){
    let newBoard = board.map(e => e)
    console.log("board", board)
    console.log("newBoard", newBoard)
    let numbers = '123456789'
    let answer = true
    let newArr2 = [[], [], [], [], [], [], [], [], []]
    let blockArr2 = [[], [], [], [], [], [], [], [], []]
    newBoard.map((array, ai) => {
      array.forEach((num, i) => {
        newArr2[i].push(num)
        // ai < 3 && i < 3 ? blockArr2[0].push(num) :
        // ai < 3 && i > 2 && i < 6 ? blockArr2[1].push(num) :
        // ai < 3 && i > 5 ? blockArr2[2].push(num) :
        // ai > 2 && ai < 6 && i < 3 ? blockArr2[3].push(num) :
        // ai > 2 && ai < 6 && i > 2 && i < 6 ? blockArr2[4].push(num) :
        // ai > 2 && ai < 6 && i > 5 ? blockArr2[5].push(num) :
        // ai > 5 && i < 3 ? blockArr2[6].push(num) :
        // ai > 5 && i > 2 && i < 6 ? blockArr2[7].push(num) :
        // ai > 5 && i > 5 ? blockArr2[8].push(num) : null
        if(
            ai < 3 && i < 3){blockArr2[0].push(num)}else if(
            ai < 3 && i > 2 && i < 6){blockArr2[1].push(num)}else if(
            ai < 3 && i > 5){blockArr2[2].push(num)}else if(
            ai > 2 && ai < 6 && i < 3 ){blockArr2[3].push(num)}else if(
            ai > 2 && ai < 6 && i > 2 && i < 6 ){blockArr2[4].push(num)}else if(
            ai > 2 && ai < 6 && i > 5 ){blockArr2[5].push(num)}else if(
            ai > 5 && i < 3){blockArr2[6].push(num)}else if(
            ai > 5 && i > 2 && i < 6 ){blockArr2[7].push(num)}else if(
            ai > 5 && i > 5 ){blockArr2[8].push(num)}
      })

      array.sort(function(a, b){return a - b})

      if(array.join('') != numbers){answer = false}
    })
    newArr2.map((array, ai) => {
      array.sort(function(a, b){return a-b})
      if(array.join('') != numbers){answer = false}
    })
    blockArr2.map((array, ai) => {
      array.sort(function(a, b){return a-b})
      if(array.join('') !== numbers){answer = false}
    })
    return answer
  }

  export default ValidateSudoku;