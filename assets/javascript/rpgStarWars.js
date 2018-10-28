//Make suree the DOM has fully loaded
$(document).ready(function() {
    //declare variables
    //====================================

    //creating an object to hold characters.
    var characters = {
        'obi-Wan Kenobi': {
            name: 'obi-Wan Kenobi',
            health: 120,
            attack: 8,
            imageUrl: 'assets/images/obi-wan.jpg',
            enemyAttackBack: 15
        },
        'Luke Skywalker': {
            name: 'Luke Skywalker',
            health: 100,
            attack: 14,
            imageUrl: 'assets/images/luke-skywalker.jpg',
            enemyAttackBack: 5
        },
        'Dark Sidious': {
            name: 'Dark Sidious',
            health: 150,
            attack: 8,
            imageUrl: 'assets/images/darth-sidious.png',
            enemyAttackBack: 20
        },
        'Darth Maul': {
            name: 'Dark Maul',
            health: 180,
            attack: 7,
            imageUrl: 'assets/images/darth-maul.jpg',
            enemyAttackBack: 25
        }
    };
    //Selecting a character
    var attacker;
    //populated with characters not selected
    var combatants = [];
    //choosing an opponent.
    var defender;
    //keep track of turns during comback. Calculating player damage
    var turnCounter = 1;
    //Track number of defeated oponents
    var killCount = 0;

    //FUNCTIONS
    //================================================================
    var renderCharacter = function(character, renderArea) {
        var charDiv = $("<div class='character' data-name='" + character.name + "'>");
        var charName = $("<div class='character-name'>").text(character.name);
        var charImage = $("<img alt='image' class='character-image'>").attr("src", charater.imageUrl);
        var charHealth = $("<div class='character-health'>").text(character.health);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(chardDiv);
    };

    //Initializing the game
    var initializeGame = function() {
        for (var key in characters) {
            renderCharacter(characters[key], '#characters-section');
        }
    };
    initializeGame();

    //Updating the selected player or the current defender.
    var updateCharacter = function(charObj, areaRender) {
        //empty the area and then re-render the new object
        $(areaRender).empty();
        renderCharacter(charObj, areaRender);
    };

    //Render the available-to-attack enemies
    var renderEnemies = function(enemyArr) {
        for (var i = 0; i < enemyArr.length; i++) {
            renderCharacter(enemyArr[i], '#available-to-attack-section');
        }
    };

    //Handle rendering game messages
    var renderMessage = function(message) {
        var gameMessageSet = $("#game-message");
        var newMessage = $("<div>").text(message);
        gameMessageSet.append(newMessage);
    };

    //Handle restarting the game after victory or defeat
    var restartGame = function(resultMessage) {
        var restart = $("<button>Restart</button>").click(function() {
            location.reload();
        });
        //Building div that display victory/defeat mesage
        var gameState = $("<div>").text(resultMessage);
        //Rendering the restart button & message to the page
        $("body").append(gameState);
        $("body").append(restart);
    };
    //clear the game message section
    var clearMessage = function() {
        var gameMessage = $('#game-message');
        gameMessage.text("");
    };

    //================================================================================

    //Selecting character
    $('#characters-section').on('click', '.character', function() {
        //Saving the clicked character's name
        var name = $(this).attr('data-name');

        //if a player charater has not yet been chosen
        if (!character) {
            attacker = characters[name];
            for (var key in characters) {
                if (key !== name) {
                    combatants.push(characters[key]);
                }
            }

            //Hide the characted select div
            $('#characters-section').hide();
        }
    })
})