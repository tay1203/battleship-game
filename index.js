let model = {
    boardsize: 7,
    numShips: 3, // number of ships in board
    shipLength: 3, // length of a ship
    shipSunk: 0, // sunken ship

    ships : [ 
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] } 
    ],

    // execute the fire action
    fire: function(guess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let locations = ship.locations;
            let index = locations.indexOf(guess)
            if (index >= 0){
                if (ship.hits[index] === "hit") {
                    view.displayMessage("Oops, you already hit that location!");
                    return true;
                } else {
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
    },

    generateShipLocations: function() {
        let locations;

        // for each ship
        for (let i = 0; i < this.numShips; i++) {
            do {
                // generate new set of location
                locations = this.generateShip();
            } while (this.collisions(locations));
            // check if there is no overlap
            // if do, keep generate and check until no
            // assign the generated location to the ship's 'location' property
            this.ships[i].locations = locations;
        }
    },

    generateShip: function() {
        // generate horizontally only
        // can be in any row
        let row = Math.floor(Math.random() * this.boardsize);
        // leave 2 space for column, generate 0 - 4
        let col = Math.floor(Math.random() * (this.boardsize - this.shipLength + 1));

        let newShipLocations = [];
        for (let i = 0; i < this.shipLength; i++) {
            // add the location into the array like ["01", "02", "03"]
            newShipLocations.push(row + "" + (col + i));
        }
        return newShipLocations;
    },

    collisions: function(locations){
        for (let i = 0; i < this.numShips; i++) {
            // check the ships on the board one by one
            let ship = model.ships[i];
            for (let j = 0; j < locations.length; j++){
                // check the input location is exists or not
                // if exist, there should return an valid index within the range  
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }

};

let view = {
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
};

let controller = {
    guesses: 0,

    processGuess: function(guess) {
        let location = this.parseGuess(guess)

        // if return value is not null, its valid
        if (location) {
            this.guesses++;
            // handle the valid location to process hit/miss
            let hit = model.fire(location);
            // if all ship are sunk, process game over
            if (hit && model.shipSunk === model.numShips){
                view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
            }
        }
    },

    parseGuess:function(guess){
        let char = ["A", "B", "C", "D", "E", "F", "G"];
        // validate input if null or not 2 char
        if (guess == null || guess.length !== 2) {
            view.displayMessage("Oops, please enter a letter and a number on the board.");
        } else {
            let firstChar = guess.charAt(0);
            // if not exist = -1
            let row = char.indexOf(firstChar);
            let col = guess.charAt(1);
            
            // validate numbers
            if (isNaN(row) || isNaN(col)){
                // check if not num
                view.displayMessage("Oops, that isn't on the board.");
            } else if (row < 0 || row >= model.boardsize || col < 0 || col >= model.boardsize ) {
                // check if not in board size range
                view.displayMessage("Oops, that's off the board!");
            } else {
                // concatenation
                return row + col;
            }
        }
        return null;
    }
}

// called when the page has completed loading
window.onload = init;

function init(){
    let fireButton = document.getElementById("fireButton");
    // call fire button function 
    fireButton.onclick = handleFireButton;

    let guessInput = document.getElementById("guessInput");
    guessInput.onkeydown = handleKeyPress;

   model.generateShipLocations();
}

// event handler

function handleFireButton(){
    let guessInput = document.getElementById("guessInput");
    controller.processGuess(guessInput.value.toUpperCase());
    guessInput.value = "";
}

// browser pass an event object, abt which key is pressed
function handleKeyPress(e) {
    let fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        // form does not do anything
        return false;
    }
}

