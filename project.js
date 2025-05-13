// 1 deposit some money
// 2 determine number of lines to bet on
// 3 collect bet money
// 4 spin the slot machine
// 5 check if the user won
// 6 give the user their winnings
// 7 play again
const prompt = require ("prompt-sync")();

const ROWS = 3
const COLS = 3

const SYSMBOL_COUNT = {
    A:2,
    B:4,
    C:6,
    D:8
}
const SYMBOL_VALUES = {
    A:5,
    B:4,
    C:3,
    D:2
}

const deposit = () => {
    while(true){
        const depositAmount = prompt("Enter the deposit amount: ");
        const integerDepositAmount = parseFloat(depositAmount);

        if (isNaN(integerDepositAmount) || integerDepositAmount <= 0){
            console.log("Invalid deposit amount, try again!")
        }else{
            return integerDepositAmount;
        }
    }
}

const getNumberOfLines = () => {
    while(true){
        const lines = prompt("Enter  the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid number of lines, try again!")
        }else{
            return numberOfLines;
        }
    }
}

const getBet = (balance,numberOfLines) => {
     while(true){
        const bet = prompt("Enter the total bet per line: ");
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > (balance / numberOfLines)){
            console.log("Invalid bet, try again!")
        }else{
            return numberBet;
        }
    }
}

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYSMBOL_COUNT) ){
        for (let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbol = [...symbols]
        for (let j =0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random()*reelSymbol.length);
            const selectedSymbol = reelSymbol[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbol.splice(randomIndex, 1);
        }
    }
    return reels;
}

const transpose = (reels) => {
    const rows = []
    for (let i = 0; i < ROWS; i++){
        rows.push([])
        for (let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows;
}


let balance = deposit()
const numberOfLines = getNumberOfLines()
const bet = getBet(balance, numberOfLines)
const reels = spin()
console.log(reels)
const rows = transpose(reels)
console.log(reels)
console.log(rows)