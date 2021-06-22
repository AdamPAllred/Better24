let solution = ""
let hintArray = []
let currHint = ""

//get a certian amount, or get all

const randomNum = (num) => {
  return Math.floor(Math.random() * (num * (3/4))) + 1
}

const randomOpt = () => {
  const possibleOpts = [
    "add",
    "sub",
    "div",
    "mul"
  ]

  return possibleOpts[Math.floor(Math.random() * 4)]
}

const arithmetic = (currentOprtn, num1, num2) => {
  let newNum
  if (currentOprtn === "add") {
    newNum = num1 + num2
  }
  else if (currentOprtn === "sub") {
    newNum = num1 - num2
  }
  else if (currentOprtn === "mul") {
    newNum = num1 * num2
  }
  else if (currentOprtn === "div") {
    newNum = num1 / num2
  } else {
    console.log("Error: operator is " + currentOprtn)
  }

  return newNum
}

const solutionOpts = (n, isUsedForArith) => {
  if (n === "add") {
    return isUsedForArith ? "sub" : "-"
  }
  else if (n === "sub") {
    return isUsedForArith ? "add" : "+"
  }
  else if (n === "div") {
    return isUsedForArith ? "mul" : "×"
  }
  else if (n === "mul") {
    return isUsedForArith ? "div" : "÷"
  }
  else {
    console.log("ERROR in solution")
  }
  return null
}

const solve = (inputNum) => {
  let nums = [
    randomNum(inputNum),
    randomNum(inputNum),
    randomNum(inputNum)
  ]
  let opts = [
    randomOpt(),
    randomOpt(),
    randomOpt()
  ]
  let currentNum = inputNum

  let outputNums = []

  nums.forEach((num, n) => {
    while (opts[n] === "div" && currentNum % num !== 0) {
      num --
    }
    while (opts[n] === "mul" && currentNum * num >= 99) {
      num --
    }

    if (opts[n] === "sub" && currentNum - num === 0) {
      num --
    } else if (opts[n] === "add" && currentNum + num === 0) {
      num ++
    }

    currentNum = arithmetic(opts[n], currentNum, num)

    if (n === (nums.length - 1)) {
      currHint = currentNum + " " + solutionOpts(opts[n], false) + " " + num + " = " + arithmetic(solutionOpts(opts[n], true), currentNum, num)
      hintArray.unshift(currHint)
      outputNums.push(num)
      outputNums.push(currentNum)
    } else {
      currHint = currentNum + " " + solutionOpts(opts[n], false)
      + " " + num + " = " + arithmetic(solutionOpts(opts[n], true), currentNum, num)
      hintArray.unshift(currHint)
      outputNums.push(num)
    }
  })
  return outputNums
}


