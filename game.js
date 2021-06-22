const numBtns = [...document.getElementsByClassName('num-btn')]
//const arthBtns = [...document.getElementsByClassName('arithmetic-btn')]
const currentTotal = document.getElementsByClassName('current-result')[0]

let goalNum = 24

let numVals = solve(goalNum)
numVals = numVals.sort((a, b) => 0.5 - Math.random());

let currSelected = 0
let currScore = 0
let currentOprtn
let oprtnsDone = 0

let firstSelect
let secondSelect

let crumbTrail = ""

const setNums = () => {
  numBtns.forEach((numBtn, n) => {
    numBtn.innerHTML = numVals[n]
    numBtn.disabled = false
    numBtn.className = "num-btn active-nb"
  })
}

setNums()
document.getElementsByClassName("goal-num")[0].defaultValue = goalNum

const redo = () => {
  setNums()

  currScore = 0
  oprtnsDone = 0
  currentOprtn = ""
  firstSelect = ""
  secondSelect = ""
  currSelected = 0

  document.getElementsByClassName('current-result')[0].innerHTML = 0
  crumbTrail = ""
  document.getElementsByClassName('crumb-trail')[0].innerHTML = crumbTrail
  document.getElementsByClassName('win')[0].innerHTML = ""
  document.getElementsByClassName('win')[0].style.visibility = "hidden"
}

const chooseNum = (event, n) => {
  if (oprtnsDone === 0) {
    if (!currentOprtn && currSelected === 1) {
      return
    }
  } else {
    if (!currentOprtn) {
      return
    }
  }

  selectNum(numVals[n], event.target)
  currSelected++
  checkForWin()
}

const changeGoalNum = (event) => {
  goalNum = parseInt(event.target.value)
}


const arthOperation = () => {
  oprtnsDone ++

  let crumbPipe = ""
  if (crumbTrail !== "") {
    crumbPipe = " | "
  }

  if (currentOprtn === "add") {
    currScore = firstSelect + secondSelect
    currScore = Math.round(currScore * 100) / 100
    crumbTrail += crumbPipe + firstSelect + " + " + secondSelect + " = " + currScore
  }
  else if (currentOprtn === "sub") {
    currScore = firstSelect - secondSelect
    currScore = Math.round(currScore * 100) / 100
    crumbTrail += crumbPipe + firstSelect + " - " + secondSelect + " = " + currScore
  }
  else if (currentOprtn === "mul") {
    currScore = firstSelect * secondSelect
    currScore = Math.round(currScore * 100) / 100
    crumbTrail += crumbPipe + firstSelect + " × " + secondSelect + " = " + currScore
  }
  else if (currentOprtn === "div") {
    currScore = firstSelect / secondSelect
    currScore = Math.round(currScore * 100) / 100
    crumbTrail += crumbPipe + firstSelect + " ÷ " + secondSelect + " = " + currScore
  }
  else {
    console.log("Error, currentOprtn = " + currentOprtn)
  }

  currScore = Math.round(currScore * 100) / 100

  currSelected = -1
  firstSelect = null
  secondSelect = null
  currentOprtn = ""
  currentTotal.innerHTML = currScore
  document.getElementsByClassName('crumb-trail')[0].innerHTML = crumbTrail
}

const selectNum = (numClicked, target) => {
  if (oprtnsDone === 0) {
    if (!currentOprtn && currSelected === 1) {
      return
    }
  } else {
    if (!currentOprtn) {
      return
    }
  }

  if (oprtnsDone === 0) {
    if (currSelected === 0) {
      firstSelect = numClicked
    }
    else if (currSelected === 1) {
      secondSelect = numClicked
      arthOperation()
    } else {
      console.log("Error: we shouldn't select that many. " + currSelected)
    }
  } else {
    firstSelect = currScore
    secondSelect = numClicked
    arthOperation()
  }

  target.disabled = true
  target.className = "num-btn"
}

const hint = () => {
  if (document.getElementsByClassName('solution')[0].style.visibility === "hidden") {
    document.getElementsByClassName('solution')[0].style.visibility = "unset"
    document.getElementsByClassName('hint')[0].innerHTML = hintArray[0]
  }
  else {
    document.getElementsByClassName('solution')[0].style.visibility = "hidden"
  }

}

const showHint = () => {
  if (document.getElementsByClassName('hint')[1].innerHTML === hintArray[1]) {
    document.getElementsByClassName('hint')[2].innerHTML = hintArray[2]
    document.getElementsByClassName('hint')[2].style.lineHeight = "unset"

    document.getElementsByClassName('show-another')[0].innerHTML = ""
    document.getElementsByClassName('show-another')[0].style.lineHeight = 0
  } 
  else {
    document.getElementsByClassName('hint')[1].innerHTML = hintArray[1]
    document.getElementsByClassName('hint')[1].style.lineHeight = "unset"
  }
}

const next = () => {
  document.getElementsByClassName('solution')[0].style.visibility = "hidden"

  document.getElementsByClassName('hint')[1].innerHTML = ""
  document.getElementsByClassName('hint')[2].innerHTML = ""
  document.getElementsByClassName('hint')[1].style.lineHeight = 0
  document.getElementsByClassName('hint')[2].style.lineHeight = 0

  document.getElementsByClassName('show-another')[0].innerHTML = "Show another"
  document.getElementsByClassName('show-another')[0].style.lineHeight = 1

  numVals = solve(goalNum)
  numVals = numVals.sort((a, b) => 0.5 - Math.random());

  redo()
}

const checkForWin = () => {
  if (oprtnsDone === 3) {
    if (currScore === goalNum) {
      let win = document.getElementsByClassName('win')[0]
      win.innerHTML = "YOU GOT IT!!!!"
      win.style.visibility = "unset"
    }

    currentOprtn = ""
  }
}