class Starships {
    constructor(name, pilot, fuel, location, type) {
        this.name = name;
        this.pilot = pilot;
        this.fuel = fuel;
        this.location = location;
        this.type = type;
        this.favorite = false;
        this.inAir = false;
        this.engineRunning = false;
    }

    getFavoriteButtonText() {
        if (this.favorite == false) {
            return "No";
        } else {
            return "Yes";
        }
    }

    getId() {
        if (this.id) {
            return this.id;
        } else {
            this.id = Math.floor((Math.random() * 10000) + 1);
            return this.id;
        }
    }

    toggleEngines() {
        if (this.engineRunning) {

            this.engineRunning = false;
            return `Turn engine Off!`;
        } else {

            this.engineRunning = true;
            return `Turn engine On!`;
        }
    }

    getEngineText() {
        if (this.engineRunning) {
            return "Turn engine Off";
        } else {
            return "Turn engine On";
        }
    }

    goTakeOff() {
        if (this.inAir) {
            this.inAir = false;
            return `Land`;
        } else {
            this.inAir = true;
            return `Take off!`;
        }
    }

    getTakeOffText() {
        if (this.inAir) {

            return `Land`;
        } else {

            return `Take off!`;
        }
    }


    addFavorite() {
        this.favorite = true;
    }

    rmvFavorite() {
        this.favorite = false;
    }
}

class Fighter extends Starships {
    constructor(name, pilot, fuel, location, type, weapons, shield, kills, health) {
        super(name, pilot, fuel, location, type);
        this.weapons = weapons;
        this.shield = shield;
        this.kills = kills;
        this.health = health;
    }

    shootWeapon(weapon) {
        if (weapon) {
            return `Weapon ${weapon} fired!`;
        } else if (this.weapons[0]) {
            return `Weapon ${this.weapons[0]} fired!`;
        } else {
            return 'Starship has no weapons';
        }
    }
}

class Cargo extends Starships {
    constructor(name, pilot, fuel, location, type, capacity, route, cranes) {
        super(name, pilot, fuel, location, type);
        this.capacity = capacity;
        this.route = route;
        this.cranes = cranes;
    }

    load() {
        return 'Cargo loaded!';
    }

    unload() {
        return 'Cargo unloaded!';
    }
}

class Mining extends Starships {
    constructor(name, pilot, fuel, location, type, mining_tools, mining_types, mining_capacity) {
        super(name, pilot, fuel, location, type);
        this.mining_tools = mining_tools;
        this.mining_types = mining_types;
        this.mining_capacity = mining_capacity;
    }

    mine() {
        return `Mining`;
    }

    setStorageTemperature(temperatue) {
        return `Temperature set on ${temperatue} degrees`;
    }

}

let db_Starships = [];

let generateShips = () => {
    db_Starships[0] = new Fighter("F1", "John", 50, "Earth", "Fighter", ["Rockets", "Laser"], 15, 2, 20);
    db_Starships[1] = new Fighter("X-wing", "Luke", 30, "Hoth", "Fighter", ["Nuke", "Laser"], 20, 60, 30);
    db_Starships[2] = new Fighter("Z-wing", "BTL", 40, "Mars", "Fighter", ["Nuke", "EMP", "mini gun"], 15, 30, 40);
    db_Starships[3] = new Fighter("Advance-12", "YT", 35, "Bespin", "Fighter", ["mini-gun", "big-gun"], 35, 9, 50);
    db_Starships[4] = new Cargo("Transport-1", "Worker-1623", 90, "Dagobah", "Cargo", 100, "Bespin-Dagobah", 2);
    db_Starships[5] = new Cargo("FastLite", "Worker-87912", 50, "Endor", "Cargo", 50, "Bespin-Endor", 1);
    db_Starships[6] = new Cargo("Nowait", "Worker-651984", 30, "Naboor", "Cargo", 10, "Naboo-Hoth", 1);
    db_Starships[7] = new Cargo("Lightspeed-10", "Worker-894896", 30, "Coruscant", "Cargo", 9, "Naboo-Coruscant", 3);
    db_Starships[8] = new Mining("Miner0900", "Worker-0000", 30, "Kamino", "Mining", "RockCrusher", "Gold", 90);
    db_Starships[9] = new Mining("Miner4355", "Worker-8/9745", 25, "Kamino", "Mining", "RockCrusher", "Gold", 90);
    db_Starships[10] = new Mining("Miner75675", "Worker-84651", 40, "Kamino", "Mining", "RockCrusher", "Gold", 90);
    db_Starships[11] = new Mining("Miner3789", "Worker-5428", 90, "Kamino", "Mining", "RockCrusher", "Gold", 90);

}

generateShips();

let populateSarships = (favorite) => {

    $('#body').html('');
    for (let e of db_Starships) {

        if (favorite) {
            if (e.favorite == false) {
                continue;
            }
        }

        $('#body').append(`
            <tr>
            <td>${e.name}</td>
            <td>${e.pilot}</td>
            <td>${e.fuel}</td>
            <td>${e.location}</td>
            <td>${e.type}</td>
            <td>
            <div class="btn-group btn-group-sm">
             <button type="button" id='${e.getId()}Engine' class="btn btn-dark">${e.getEngineText()}</button>
             <button type="button" id='${e.getId()}TakeOff' class="btn btn-dark">${e.getTakeOffText()}</button>
             </div>
             </td>
            <td> <button type="button" id='${e.getId()}' class="btn btn-dark">${e.getFavoriteButtonText()}</button> </td>
            </tr>
            `);

        document.getElementById(`${e.getId()}`).addEventListener("click", function () {
            e.favorite ? e.favorite = false : e.favorite = true;
            favoriteMode ? populateSarships(true) : populateSarships();
            console.log(`${e.name} ${e.getId()} ${e.favorite}`);
        });

        document.getElementById(`${e.getId()}Engine`).addEventListener("click", function () {
            e.inAir ? alert("Error Ship must be landed") : e.toggleEngines();
            favoriteMode ? populateSarships(true) : populateSarships();
        });

        document.getElementById(`${e.getId()}TakeOff`).addEventListener("click", function () {
            e.engineRunning ? e.goTakeOff() : alert("Engine must be on to take off");
            favoriteMode ? populateSarships(true) : populateSarships();
        });
    }
}

let populateFighters = (favorite) => {

    $('#body').html('');
    for (let e of db_Starships) {
        if (e.type == "Fighter") {

            if (favorite) {
                if (e.favorite == false) {
                    continue;
                }
            }

            $('#body').append(`
            <tr>
            <td>${e.name}</td>
            <td>${e.pilot}</td>
            <td>${e.fuel}</td>
            <td>${e.location}</td>
            <td>${e.type}</td>
            <td>${e.weapons}</td>
            <td>${e.health}</td>
            <td>${e.shield}</td>
            <td>${e.kills}</td>
            <td>
            <div class="btn-group btn-group-sm">
             <button type="button" id='${e.getId()}Engine' class="btn btn-dark">${e.getEngineText()}</button>
             <button type="button" id='${e.getId()}TakeOff' class="btn btn-dark">${e.getTakeOffText()}</button>
             </div>
             </td>
            <td> <button type="button" id='${e.getId()}' class="btn btn-dark">${e.getFavoriteButtonText()}</button> </td>
            </tr>
            `);

            document.getElementById(`${e.getId()}`).addEventListener("click", function () {
                e.favorite ? e.favorite = false : e.favorite = true;
                favoriteMode ? populateFighters(true) : populateFighters();
                console.log(`${e.name} ${e.getId()} ${e.favorite}`);
            });

            document.getElementById(`${e.getId()}Engine`).addEventListener("click", function () {
                e.inAir ? alert("Error Ship must be landed") : e.toggleEngines();
                favoriteMode ? populateFighters(true) : populateFighters();
            });

            document.getElementById(`${e.getId()}TakeOff`).addEventListener("click", function () {
                e.engineRunning ? e.goTakeOff() : alert("Engine must be on to take off");
                favoriteMode ? populateFighters(true) : populateFighters();
            });
        }
    }
}

let populateCargos = (favorite) => {

    $('#body').html('');
    for (let e of db_Starships) {
        if (e.type == "Cargo") {

            if (favorite) {
                if (e.favorite == false) {
                    continue;
                }
            }

            $('#body').append(`
            <tr>
            <td>${e.name}</td>
            <td>${e.pilot}</td>
            <td>${e.fuel}</td>
            <td>${e.location}</td>
            <td>${e.type}</td>
            <td>${e.capacity}</td>
            <td>${e.route}</td>
            <td>${e.cranes}</td>
            <td>
            <div class="btn-group btn-group-sm">
             <button type="button" id='${e.getId()}Engine' class="btn btn-dark">${e.getEngineText()}</button>
             <button type="button" id='${e.getId()}TakeOff' class="btn btn-dark">${e.getTakeOffText()}</button>
             </div>
             </td>
            <td> <button type="button" id='${e.getId()}' class="btn btn-dark">${e.getFavoriteButtonText()}</button> </td>
            </tr>
            `);

            document.getElementById(`${e.getId()}`).addEventListener("click", function () {
                e.favorite ? e.favorite = false : e.favorite = true;
                favoriteMode ? populateCargos(true) : populateCargos();
                console.log(`${e.name} ${e.getId()} ${e.favorite}`);
            });

            document.getElementById(`${e.getId()}Engine`).addEventListener("click", function () {
                e.inAir ? alert("Error Ship must be landed") : e.toggleEngines();
                favoriteMode ? populateCargos(true) : populateCargos();
            });

            document.getElementById(`${e.getId()}TakeOff`).addEventListener("click", function () {
                e.engineRunning ? e.goTakeOff() : alert("Engine must be on to take off");
                favoriteMode ? populateCargos(true) : populateCargos();
            });
        }
    }
}

let populateMiners = (favorite) => {

    $('#body').html('');
    for (let e of db_Starships) {
        if (e.type == "Mining") {

            if (favorite) {
                if (e.favorite == false) {
                    continue;
                }
            }

            $('#body').append(`
            <tr>
            <td>${e.name}</td>
            <td>${e.pilot}</td>
            <td>${e.fuel}</td>
            <td>${e.location}</td>
            <td>${e.type}</td>
            <td>${e.mining_tools}</td>
            <td>${e.mining_types}</td>
            <td>${e.mining_capacity}</td>
            <td>
            <div class="btn-group btn-group-sm">
             <button type="button" id='${e.getId()}Engine' class="btn btn-dark">${e.getEngineText()}</button>
             <button type="button" id='${e.getId()}TakeOff' class="btn btn-dark">${e.getTakeOffText()}</button>
             </div>
             </td>
            <td> <button type="button" id='${e.getId()}' class="btn btn-dark">${e.getFavoriteButtonText()}</button> </td>
            </tr>
            `);

            document.getElementById(`${e.getId()}`).addEventListener("click", function () {
                e.favorite ? e.favorite = false : e.favorite = true;
                favoriteMode ? populateMiners(true) : populateMiners();
                console.log(`${e.name} ${e.getId()} ${e.favorite}`);
            });

            document.getElementById(`${e.getId()}Engine`).addEventListener("click", function () {
                e.inAir ? alert("Error Ship must be landed") : e.toggleEngines();
                favoriteMode ? populateMiners(true) : populateMiners();
            });

            document.getElementById(`${e.getId()}TakeOff`).addEventListener("click", function () {
                e.engineRunning ? e.goTakeOff() : alert("Engine must be on to take off");
                favoriteMode ? populateMiners(true) : populateMiners();
            });
        }
    }
}

let favoriteMode, allMode, fighterMode, minerMode, cargoMode;

// TODO FIX THESE IN CSS SO THESE BECOMES NON - REQUIRED IF POSSIBLE
$("#getHome").css("color", "#white");
$("#getFavourites").css("color", "#fffb00");
$("#getStarships").css("color", "#fffb00");
$("#getCreateShip").css("color", "#fffb00");
$("#getArena").css("color", "#fffb00");

$("#getAll").css("color", "#fffb00");
$("#getFighter").css("color", "#fffb00");
$("#getCargo").css("color", "#fffb00");
$("#getMining").css("color", "#fffb00");

window.onload = function () {
    $("#getHome").css("color", "#fff");
    showHome();
};

$(() => {
    $('#getHome').on('click', () => {
        $("#getHome").css("color", "#fff");
        $("#getFavourites").css("color", "#fffb00");
        $("#getStarships").css("color", "#fffb00");
        $("#getCreateShip").css("color", "#fffb00");
        $("#getArena").css("color", "#fffb00");

        showHome();
    });

    $('#getStarships').on('click', () => {
        $("#getHome").css("color", "#fffb00");
        $("#getFavourites").css("color", "#fffb00");
        $("#getStarships").css("color", "white");
        $("#getCreateShip").css("color", "#fffb00");
        $("#getArena").css("color", "#fffb00");

        showStarships();

        favoriteMode = false;

        allMode ? showStarships() : null;
        fighterMode ? showFigher() : null;
        minerMode ? showMining() : null;
        cargoMode ? showCargo() : null;

        allMode ? populateSarships() : null;
        fighterMode ? populateFighters() : null;
        minerMode ? populateMiners() : null;
        cargoMode ? populateCargos() : null;
    });

    $('#getFavourites').on('click', () => {
        $("#getHome").css("color", "#fffb00");
        $("#getFavourites").css("color", "white");
        $("#getStarships").css("color", "#fffb00");
        $("#getCreateShip").css("color", "#fffb00");
        $("#getArena").css("color", "#fffb00");

        showStarships();

        favoriteMode = true;

        allMode ? showStarships() : null;
        fighterMode ? showFigher() : null;
        minerMode ? showMining() : null;
        cargoMode ? showCargo() : null;

        allMode ? populateSarships(true) : null;
        fighterMode ? populateFighters(true) : null;
        minerMode ? populateMiners(true) : null;
        cargoMode ? populateCargos(true) : null;
    });

    $('#startBattle').on('click', () => {
        battleController();
    });

    $('#getArena').on('click', () => {
        $("#getHome").css("color", "#fffb00");
        $("#getFavourites").css("color", "#fffb00");
        $("#getStarships").css("color", "#fffb00");
        $("#getCreateShip").css("color", "#fffb00");
        $("#getArena").css("color", "white");

        showArena();
        populateArenaDropDowns();
    });

    $('#getCreateShip').on('click', () => {
        $("#getHome").css("color", "#fffb00");
        $("#getFavourites").css("color", "#fffb00");
        $("#getStarships").css("color", "#fffb00");
        $("#getCreateShip").css("color", "white");
        $("#getArena").css("color", "#fffb00");

        showCreateShip();
    });

    $('#getAll').on('click', () => {
        $("#getHome").css("color", "#fffb00");
        $("#getAll").css("color", "white");
        $("#getFighter").css("color", "#fffb00");
        $("#getCargo").css("color", "#fffb00");
        $("#getMining").css("color", "#fffb00");

        showStarships();

        allMode = true;
        fighterMode = false;
        minerMode = false;
        cargoMode = false;

        favoriteMode ? populateSarships(true) : populateSarships();
    });

    $('#getFighter').on('click', () => {
        $("#getHome").css("color", "#fffb00");
        $("#getAll").css("color", "#fffb00");
        $("#getFighter").css("color", "white");
        $("#getCargo").css("color", "#fffb00");
        $("#getMining").css("color", "#fffb00");

        showFigher();

        allMode = false;
        fighterMode = true;
        minerMode = false;
        cargoMode = false;

        favoriteMode ? populateFighters(true) : populateFighters();
    });

    $('#getMining').on('click', () => {
        $("#getHome").css("color", "#fffb00");
        $("#getAll").css("color", "#fffb00");
        $("#getFighter").css("color", "#fffb00");
        $("#getCargo").css("color", "#fffb00");
        $("#getMining").css("color", "white");

        showMining();

        allMode = false;
        fighterMode = false;
        minerMode = true;
        cargoMode = false;

        favoriteMode ? populateMiners(true) : populateMiners();
    });

    $('#getCargo').on('click', () => {
        $("#getHome").css("color", "#fffb00");
        $("#getAll").css("color", "#fffb00");
        $("#getFighter").css("color", "#fffb00");
        $("#getCargo").css("color", "white");
        $("#getMining").css("color", "#fffb00");

        showCargo();

        allMode = false;
        fighterMode = false;
        minerMode = false;
        cargoMode = true;

        favoriteMode ? populateCargos(true) : populateCargos();
    });

    $("input[name='optradio']")[0].addEventListener("click", function () {
        showFighterOptCreate();
    });

    $("input[name='optradio']")[1].addEventListener("click", function () {
        showCargoOptCreate();
    });

    $("input[name='optradio']")[2].addEventListener("click", function () {
        showMinerOptCreate();
    });

    $("#create-btn").on('click', () => {
        getNewShipValues();
    });
});

let newShipType = 0;

const getNewShipValues = () => {
    let newName = $('#newShipName').val();
    let newPilot = $('#newShipPilot').val();
    let newFuel = $('#newShipFuel').val();
    let newLocation = $('#newShipLocation').val();
    let newType;
    switch (newShipType) {
        case 1:
            newType = "Fighter";
            let newWeapons = $('#newShipWeapons').val();
            let newShield = $('#newShipShield').val();
            let newKills = $('#newShipKills').val();
            db_Starships.push(new Fighter(newName, newPilot, newFuel, newLocation, newType, newWeapons, newShield, newKills));

            break;
        case 2:
            newType = "Cargo";
            let newCapacity = $('#newShipCapacity').val();
            let newRoute = $('#newShipRoute').val();
            let newCranes = $('#newShipCranes').val();
            db_Starships.push(new Cargo(newName, newPilot, newFuel, newLocation, newType, newCapacity, newRoute, newCranes));

            break;
        case 3:
            newType = "Mining";
            let newTools = $('#newShipTools').val();
            let newMiningTypes = $('#newShipMiningTypes').val();
            let newStorageCapacity = $('#newShipStorageCapacity').val();
            db_Starships.push(new Mining(newName, newPilot, newFuel, newLocation, newType, newTools, newMiningTypes, newStorageCapacity));

            break;
    }
    // console.log(newShipType);
}


let shipLeft, shipRight;

let populateArenaShipTable1 = (id) => {

    for (let e of db_Starships) {
        if (e.id == id) {
            shipLeft = e;
        }
    }

    updateShipLeftStats();
}

let populateArenaShipTable2 = (id) => {
    for (let e of db_Starships) {
        if (e.id == id) {
            shipRight = e;

        }
    }

    updateShipRightStats();
}


let updateShipLeftStats = () => {
    $("#arena-ship-1-name").html(`${shipLeft.name}`);
    $("#arena-ship-1-pilot").html(`${shipLeft.pilot}`);
    $("#arena-ship-1-weapons").html(`${shipLeft.weapons}`);
    $("#arena-ship-1-health").html(`${shipLeft.health}`);
    $("#arena-ship-1-shield").html(`${shipLeft.shield}`);
}

let updateShipRightStats = () => {
    $("#arena-ship-2-name").html(`${shipRight.name}`);
    $("#arena-ship-2-pilot").html(`${shipRight.pilot}`);
    $("#arena-ship-2-weapons").html(`${shipRight.weapons}`);
    $("#arena-ship-2-health").html(`${shipRight.health}`);
    $("#arena-ship-2-shield").html(`${shipRight.shield}`);
}

let updateBattleResult = (res) => {
    let battleResults = document.getElementById("battleResults");
    let newTR = document.createElement("tr");
    let newTD = document.createElement("td");
    newTD.textContent = res;
    newTR.appendChild(newTD);
    battleResults.appendChild(newTR);
}

const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let rand = Math.random() > 0
            return rand ? resolve() : reject('Something went wrong')
        }, ms)
    })
}

async function battleController() {
    let shipLeftDMG;
    let shipRightDMG;

    while (shipLeft.health > 0 && shipRight.health > 0) {
        await delay(700);

        shipLeftDMG = Math.floor((Math.random() * 20) + 1);
        shipRightDMG = Math.floor((Math.random() * 20) + 1);

        shipLeft.health = shipLeft.health - shipRightDMG;
        shipRight.health = shipRight.health - shipLeftDMG;

        updateBattleResult(`${shipLeft.name} lost ${shipRightDMG} health`);
        updateBattleResult(`${shipRight.name} lost ${shipLeftDMG} health`);
        updateShipLeftStats();
        updateShipRightStats();

        if (shipLeft.health <= 0) {
            updateBattleResult(`${shipRight.name} won the match`);
        } else if (shipRight.health <= 0) {
            updateBattleResult(`${shipLeft.name} won the match`);
        }
        console.log(shipLeft.shield);
    }
}

let populateArenaDropDowns = () => {

    let dropdownLeft = document.getElementById("dropdown-1")
    for (let e of db_Starships) {
        if (e.type == "Fighter") {
            let newA = document.createElement("a");
            newA.textContent = `${e.name}`;
            newA.classList.add("dropdown-item");
            newA.addEventListener("click", () => {
                console.log(`${e.getId()}`);
                populateArenaShipTable1(e.getId());
            })
            newA.href = "#";
            dropdownLeft.appendChild(newA);
        }
    }

    let dropdownRight = document.getElementById("dropdown-2")
    for (let e of db_Starships) {
        if (e.type == "Fighter") {
            let newA = document.createElement("a");
            newA.textContent = `${e.name}`;
            newA.classList.add("dropdown-item");
            newA.addEventListener("click", () => {
                console.log(`${e.getId()}`);
                populateArenaShipTable2(e.getId());
            })
            newA.href = "#";
            dropdownRight.appendChild(newA);
        }
    }
}

const showFighterOptCreate = () => {
    newShipType = 1;
    $('#fighter-form').removeClass('display-none');
    $('#cargo-form').addClass('display-none');
    $('#mining-form').addClass('display-none');
}

const showCargoOptCreate = () => {
    newShipType = 2;
    $('#fighter-form').addClass('display-none');
    $('#cargo-form').removeClass('display-none');
    $('#mining-form').addClass('display-none');
}

const showMinerOptCreate = () => {
    newShipType = 3;
    $('#fighter-form').addClass('display-none');
    $('#cargo-form').addClass('display-none');
    $('#mining-form').removeClass('display-none');
}

const showCreateShip = () => {
    $('#body').html('');
    $('#arena-wrapper').addClass('display-none');
    $('#createShip-form').removeClass('display-none');
    $('#master-table').addClass('display-none');
    $('#table').addClass('display-none');
    $('#starships').addClass('display-none');
    $('#fighter').addClass('display-none');
    $('#mining').addClass('display-none');
    $('#cargo').addClass('display-none');

    $("#getAll").addClass('display-none');
    $("#getFighter").addClass('display-none');
    $("#getCargo").addClass('display-none');
    $("#getMining").addClass('display-none');
}

const showArena = () => {
    $('#body').html('');
    $('#arena-wrapper').removeClass('display-none');
    $('#createShip-form').addClass('display-none');
    $('#master-table').addClass('display-none');
    $('#table').addClass('display-none');
    $('#starships').addClass('display-none');
    $('#fighter').addClass('display-none');
    $('#mining').addClass('display-none');
    $('#cargo').addClass('display-none');

    $("#getAll").addClass('display-none');
    $("#getFighter").addClass('display-none');
    $("#getCargo").addClass('display-none');
    $("#getMining").addClass('display-none');
}



const showHome = () => {
    $('#body').html('');
    $('#arena-wrapper').addClass('display-none');
    $('#createShip-form').addClass('display-none');
    $('#master-table').addClass('display-none');
    $('#table').addClass('display-none');
    $('#starships').addClass('display-none');
    $('#fighter').addClass('display-none');
    $('#mining').addClass('display-none');
    $('#cargo').addClass('display-none');

    $("#getAll").addClass('display-none');
    $("#getFighter").addClass('display-none');
    $("#getCargo").addClass('display-none');
    $("#getMining").addClass('display-none');
}

const showStarships = () => {
    $('#body').html('');
    $('#arena-wrapper').addClass('display-none');
    $('#createShip-form').addClass('display-none');
    $('#master-table').removeClass('display-none');
    $('#table').removeClass('display-none');
    $('#starships').removeClass('display-none');
    $('#fighter').addClass('display-none');
    $('#mining').addClass('display-none');
    $('#cargo').addClass('display-none');

    $("#getAll").removeClass('display-none');
    $("#getFighter").removeClass('display-none');
    $("#getCargo").removeClass('display-none');
    $("#getMining").removeClass('display-none');
}

const showFigher = () => {
    $('#body').html('');
    $('#arena-wrapper').addClass('display-none');
    $('#createShip-form').addClass('display-none');
    $('#master-table').removeClass('display-none');
    $('#table').removeClass('display-none');
    $('#starships').addClass('display-none');
    $('#fighter').removeClass('display-none');
    $('#mining').addClass('display-none');
    $('#cargo').addClass('display-none');
}

const showMining = () => {
    $('#body').html('');
    $('#arena-wrapper').addClass('display-none');
    $('#createShip-form').addClass('display-none');
    $('#master-table').removeClass('display-none');
    $('#table').removeClass('display-none');
    $('#starships').addClass('display-none');
    $('#fighter').addClass('display-none');
    $('#mining').removeClass('display-none');
    $('#cargo').addClass('display-none');
}

const showCargo = () => {
    $('#body').html('');
    $('#arena-wrapper').addClass('display-none');
    $('#createShip-form').addClass('display-none');
    $('#master-table').removeClass('display-none');
    $('#table').removeClass('display-none');
    $('#starships').addClass('display-none');
    $('#fighter').addClass('display-none');
    $('#mining').addClass('display-none');
    $('#cargo').removeClass('display-none');
}