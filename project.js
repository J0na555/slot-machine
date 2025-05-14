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

const printRows = (rows) => {
    for (const row of rows){
        let rowString = "";
        for (const [i, symbol] of row.entries()){
            rowString += symbol
            if( i != row.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++){
        const symbols = rows[row]
        let allSame = true

        for (const symbol of symbols){
            if (symbol != symbol[0]){
                allSame = false 
                break;
            }
        }
        if(allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings;
}

const game = () => {
    let balance = deposit()

    while(true){
        console.log("You have a balace of $" + String(balance))
        const numberOfLines = getNumberOfLines()
        const bet = getBet(balance, numberOfLines)
        balance -= bet * numberOfLines
        const reels = spin()
        const rows = transpose(reels)
        printRows(rows)
        const winnings = getWinnings(rows, bet, numberOfLines)
        balance += winnings
        console.log("You won, $" + String(winnings));
        if (balance <= 0){
            console.log("You ran out of money!")
            break;
        }

        const playAgain = prompt ("Do you want to play again? y/n :")
        if (playAgain != 'y') break;
    }
}

game()