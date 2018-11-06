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
            name: 'Darth Maul',
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
        var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
        var charHealth = $("<div class='character-health'>").text(character.health);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);
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
        if (!attacker) {
            attacker = characters[name];
            for (var key in characters) {
                if (key !== name) {
                    combatants.push(characters[key]);
                }
            }

            //Hide the characted select div
            $('#characters-section').hide();
            //Render the selected and combatants
            updateCharacter(attacker, '#selected-character');
            renderEnemies(combatants);
        }
    });

    //Create click event for each enemy
    $('#available-to-attack-section').on('click', '.character', function() {
        
        //Saving the opponent's name
        var name = $(this).attr('data-name');

        //If no defender, the clicked enemey will become the defender
        if($('#defender').children().length === 0) {
            defender = characters[name];
            updateCharacter(defender, '#defender');

            //remove element as it will now be a new defender
            $(this).remove();
            clearMessage();
        }
    });

    //When you click the atack button, run the follow game logic...
    $('#attack-button').on('click', function() {
        //If there is a defender, combat will occur
        if($('#defender').children().length !==0) {
            //Create message for the attack and the opponents counter attack
            var attackMessage = 'You attacked ' + defender.name + ' for ' + attacker.attack * turnCounter + ' damage.';
            var counterAttackMessage = defender.name + ' attacked you back for ' + defender.enemyAttackBack + ' damage.';
            clearMessage();

            //Reduce defender's health by your attack value
            defender.health -= attacker.attack * turnCounter;

            //If the enemy still has health
            if (defender.health > 0) {
                //Render the enemy's updated character card
                updateCharacter(defender, '#defender');

                //Render the combat message
                renderMessage(attackMessage);
                renderMessage(counterAttackMessage);

                // Reduce your health by the opponent's attack value
                attacker.health -= defender.enemyAttackBack;

                //Render the player's updated character card
                updateCharacter(attacker, '#selected-character');

                //If you have less than zero health the game ends
                //we call the restart game function to allow the user to restart the game & play again
                if (attacker.health <=0) {
                    clearMessage();
                    restartGame('You have been defeated...GameOver!!!');
                    $('#attack-button').off('click');
                }
            }
            else {
                //If the enemy has less than zero health they are defeated
                //Remove your opponent's character card
                $('#defender').empty();
                var gameStateMessage = 'You have defeated ' + defender.name + ', you can choose to fight another enemy';
                renderMessage(gameStateMessage);

                //Increment your kill count
                killCount++;

                //If you have killed all of your opponents you win
                //Call the restartGame function to allow the user to restart the game and play again
                if (killCount >= combatants.length) {
                    clearMessage();
                    $('attack-button').off('click');
                    restartGame('You won!!!! GAME OVER');
                }
            }

            //Increment turn counter. This is used for determining how much damage the player does
            turnCounter++;
        }
        else {
            //if there is no defender, render an error message
            clearMessage();
            renderMessage('No enemy here.');
        }
    });
});