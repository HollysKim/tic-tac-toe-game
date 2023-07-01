import { useEffect, useState } from 'react';
import './index.css';

const GameGrid = ({UserOneWinningPatternAchieved, UserTwoWinningPatternAchieved, setUserOneWinningPatternAchieved, setUserTwoWinningPatternAchieved, setWinningPatternAchieved, gridArr, setGridArr}) => {

  const [userOneTurn, setUserOneTurn] = useState(true) 
  const [userTwoTurn, setUserTwoTurn] = useState(false)
  const [userOnePatternCounter, setUserOnePatternCounter] = useState([])
  const [userTwoPatternCounter, setUserTwoPatternCounter] = useState([])
  const winningPatterns = [[1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7]]


  const gridClicked = (grid) => {

    setUserOneTurn(!userOneTurn)
    setUserTwoTurn(!userTwoTurn)

    const newGridArr = gridArr.map(arrGrid => {
      if(arrGrid.id === grid.id && arrGrid.clicked === false) {
        if(userOneTurn) {
          setUserOnePatternCounter(userOnePatternCounter.concat(grid.id))
          return {...arrGrid, clicked: true, pattern: 'X'}
        }
        else if(userTwoTurn) {
          setUserTwoPatternCounter(userTwoPatternCounter.concat(grid.id))
          return {...arrGrid, clicked: true, pattern: 'O'}
        }
      }
      else {
        return arrGrid
      }
    })
    setGridArr(newGridArr)
  }

  useEffect(()=> {
    winningPatterns.map(winningPattern => {
      if(winningPattern.every(i => userOnePatternCounter.includes(i) == true))
     {
      setUserOneWinningPatternAchieved(true)
      setUserOnePatternCounter([])
      setUserTwoPatternCounter([])
    }
    else if(winningPattern.every(i => userTwoPatternCounter.includes(i) == true)) {
      setUserTwoWinningPatternAchieved(true)
      setUserOnePatternCounter([])
      setUserTwoPatternCounter([])
    }
    else if(gridArr.filter(grid => 
      grid.clicked == true
    ).length == 9) {
      setGridArr(gridArr.map(arrGrid => {
        return {...arrGrid, clicked: false}
      }))
      setUserOnePatternCounter([])
      setUserTwoPatternCounter([])
    }
    })
  })





  return(
    <div className='grids-container'>
        {!UserOneWinningPatternAchieved && !UserTwoWinningPatternAchieved
        ? gridArr.map(grid =>
          <div onClick={()=>gridClicked(grid)}>
            {grid.clicked
            ? grid.pattern
            : null
            }
        </div>)
        : gridArr.map(grid => 
        <div>
          {grid.clicked
            ? grid.pattern
            : null
            }
        </div>)}
      </div>
  )
}

const Header = () => {
  return(
    <h1 className='game-header'>Tic Tac Toe</h1>
  )
}

const ResetBtn = ({gridArr, setGridArr, UserOneWinningPatternAchieved, UserTwoWinningPatternAchieved, setUserOneWinningPatternAchieved, setUserTwoWinningPatternAchieved}) => {
  const resetGame = () => {
    setGridArr(gridArr.map(grid => {
      return {...grid, clicked: false}
    }))
    setUserOneWinningPatternAchieved(false)
    setUserTwoWinningPatternAchieved(false)
  }

  return(
    <div className='resetBtnContainer'>
      {UserOneWinningPatternAchieved || UserTwoWinningPatternAchieved || gridArr.filter(grid => 
            grid.clicked == true
          ).length == 9
          ? <button className='resetBtn' onClick={resetGame}>Reset</button>
          : null}
    </div>
  )
}

function App() {

  const [UserOneWinningPatternAchieved, setUserOneWinningPatternAchieved] = useState(false)
  const [UserTwoWinningPatternAchieved, setUserTwoWinningPatternAchieved] = useState(false)
  const [gridArr, setGridArr] = useState([
    {id: 1,clicked: false, pattern: 'X'},
    {id: 2,clicked: false, pattern: 'x'},
    {id: 3,clicked: false, pattern: 'x'},
    {id: 4,clicked: false, pattern: 'x'},
    {id: 5,clicked: false, pattern: 'x'},
    {id: 6,clicked: false, pattern: 'x'},
    {id: 7,clicked: false, pattern: 'x'},
    {id: 8,clicked: false, pattern: 'x'},
    {id: 9,clicked: false, pattern: 'x'},])

  return (
    <div>
       <Header />
        <GameGrid UserOneWinningPatternAchieved={UserOneWinningPatternAchieved} UserTwoWinningPatternAchieved={UserTwoWinningPatternAchieved} setUserOneWinningPatternAchieved={setUserOneWinningPatternAchieved} setUserTwoWinningPatternAchieved={setUserOneWinningPatternAchieved} gridArr={gridArr} setGridArr={setGridArr}/>
        <ResetBtn gridArr={gridArr} setGridArr={setGridArr} UserOneWinningPatternAchieved={UserOneWinningPatternAchieved} UserTwoWinningPatternAchieved={UserTwoWinningPatternAchieved} setUserOneWinningPatternAchieved={setUserOneWinningPatternAchieved} setUserTwoWinningPatternAchieved={setUserTwoWinningPatternAchieved}/>
    </div>
  );
}

export default App;