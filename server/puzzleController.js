module.exports = {
    getGrid: async(req, res) => {
        const {diff} = req.params
        console.log(diff)
        const db = req.app.get('db')
        let numbers = await db.get_grid(diff)
        console.log("pre-numbers", numbers)
        let puzzleId = Math.floor(Math.random() * numbers.length-1) + 1

        numbers = numbers[puzzleId]
        console.log(numbers)
        const {id, difficulty, one, two, three, four, five, six, seven, eight, nine} = numbers
        let newArr = [one, two, three, four, five, six, seven, eight, nine].map((e,i) => e.split('')).map(e => e.map(f => f > 0 ? +f : f))

        let spinNum = Math.floor(Math.random() * 8) + 1
        let addNum = Math.floor(Math.random() * 9) + 1
        const shiftArray = (puzzle, num, addNum) => {
            puzzle = puzzle.map((e,i) => e.map((ele,ind) => ele+addNum > 9 && ele > 0 ? ele+addNum-9 : ele > 0 ? ele+addNum : ele))
            return num === 1 ? puzzle :
              num === 2 ? puzzle.map((e,i) => e = puzzle[8-i]) :
              num === 3 ? puzzle.map((e,i) => e = e.reverse()) :
              num === 4 ? puzzle.map((e,i) => e = puzzle[8-i].reverse()) :
              num === 5 ? puzzle.map((e,i) => e = puzzle.map((ele, ind) => ele = ele[i])) :
              num === 6 ? puzzle.map((e,i) => e = puzzle.map((ele, ind) => ele = ele[8-i])) :
              num === 7 ? puzzle.map((e,i) => e = (puzzle.map((ele, ind) => ele = ele[i]).reverse())) :
              num === 8 ? puzzle.map((e,i) => e = (puzzle.map((ele, ind) => ele = ele[8-i]).reverse())) : null
          }
          let newNumbers = shiftArray(newArr, spinNum, addNum)
        //   console.log(difficulty)
        res.status(200).send({newNumbers, difficulty, id})
    }
}