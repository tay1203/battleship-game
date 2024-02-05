
const model = {
    boardsize: 7,
    numShips: 3, // number of ships in board
    shipLength: 3, // length of a ship
    shipSunk: 0, // sunken ship

    ships : [{ locations: ["10", "20", "30"], hits: ["", "", ""] },
    { locations: ["32", "33", "34"], hits: ["", "", ""] },
    { locations: ["63", "64", "65"], hits: ["", "", "hit"] } ],

    // execute the fire action
    fire: function(guess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let locations = ship.locations;
            let index = locations.indexOf(guess)
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");
                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship!");
                    this.shipSunk++
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.");
        return false;
    },

    // verify the ship is sunk or not
    isSunk: function(ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit"){
                return false;
            }
        }
        return true;
    }

}

const view = {
    displayMessage: function(msg){
        let messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },

    displayHit: function(location){
        let cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },

    displayMiss: function(location){
        let cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
}

const controller = {
    guesses: 0,

    processGuess: function(guess) {

    },

    parseGuess:function(guess){
        let char = ["A", "B", "C", "D", "E", "F", "G"];
        if (guess == null || guess.length !== 2) {
            view.displayMessage("Oops, please enter a letter and a number on the board.");
        } else {
            let firstChar = guess.charAt(0);
            let row = char.indexOf(firstChar);
            let col = guess.charAt(1);

            if (isNaN(row) || isNaN(col)){
                view.displayMessage("Oops, that isn't on the board.");
            } else if (row < 0 || row >= model.boardsize || col < 0 || col >= model.boardsize ) {
                view.displayMessage("Oops, that's off the board!");
            } else {
                return row + col;
            }

        }

    }
}

// model.fire("53");
// model.fire("06");
// model.fire("16");
// model.fire("26");
// model.fire("34");
// model.fire("24");
// model.fire("44");
// model.fire("12");
// model.fire("11");
// model.fire("10");