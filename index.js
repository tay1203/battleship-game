// a ship holds 3 cells
let shipHead = Math.floor(Math.random()*5);
let shipBody = shipHead - 1;
let shipTail = shipHead - 2;

let userGuessCounter = 0;
let guessLimit = 7;
let userGuess;

// the state of the ship
let isSunk = false;
let numOfHits = 0;

while(isSunk == false){
    if(userGuessCounter <= guessLimit){
        userGuess = prompt('Ready, aim, fire! (enter a number 0-6): ');

        
            if(0 <= userGuess && userGuess <= 6){
                if(shipHead <= userGuess && userGuess <= (shipHead + 2)){
                    numOfHits += 1
                    alert('You hit the ship ' + numOfHits +' times! ');
                    if(numOfHits == 3){
                        isSunk = true;
                        alert('You sank my battleship!')
                    }
                }
                else{
                    alert('MISS!')
                }
                userGuessCounter += 1;
            } else{
                alert('Please enter a valid number from 1 to 7.');
            }
    } else{
        alert('You are out of chances! ');
        break;
    }
    
}

let stats = "You took " + userGuessCounter + " guesses to sink the battleship, " + "your shooting accuracy was " + (3/userGuessCounter);
if(isSunk == true){
    alert(stats);
}