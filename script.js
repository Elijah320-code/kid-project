$(document).ready(function() {
    const animals = [
        { name: "Bird", imageUrl: "bird.jpg" },
        { name: "Cat", imageUrl: "kitten.jpg" },
        { name: "Dog", imageUrl: "puppy.jpg" },
    ];

    let correctCount = 0; // Counter for correct matches

    // Function to initialize the game
    function initializeGame() {
        // Remove existing images from the DOM
        $('#animals').empty();
        $('#names').empty();

        // Append images and names to the DOM
        animals.forEach((animal, index) => {
            $('#animals').append(`<div class="animal" style="background-image: url('${animal.imageUrl}');" data-animal="${animal.name}"></div>`);
            $('#names').append(`<div class="name" data-animal="${animal.name}">${animal.name}</div>`);
        });

        // Initialize draggable names
        $('.name').draggable({
            revert: "invalid",
            start: function() {
                $(this).css('opacity', '0.5');
            },
            stop: function() {
                $(this).css('opacity', '1');
            }
        });

        // Initialize droppable animals
        $('.animal').droppable({
            accept: ".name",
            drop: function(event, ui) {
                var droppedName = ui.draggable.data('animal');
                var animalName = $(this).data('animal');
                if (droppedName === animalName) {
                    // Correct match
                    $(this).append(ui.draggable.css({position: 'relative', top: '0', left: '0'}));
                    ui.draggable.draggable('disable').css('cursor', 'default');
                    $(this).droppable('disable');
                    ui.draggable.addClass('correct');
                    correctCount++;
                    if (correctCount === animals.length) {
                        // All matches are correct
                        showMessage('Congratulations! You matched all the animals correctly!');
                        $('#playAgain').show();
                    }
                } else {
                    // Incorrect match
                    ui.draggable.draggable('option', 'revert', true);
                    showMessage('Try again!');
                }
            }
        });

        // Hide the Play Again button initially
        $('#playAgain').hide();
    }

    // Function to reset the game
    function resetGame() {
        // Clear animal placements
        $('.animal').empty();

        // Reset correct count
        correctCount = 0;

        // Show all names and make them draggable again
        $('.name').show().draggable('enable').css('cursor', 'grab').removeClass('correct');

        // Make all animals droppable again
        $('.animal').droppable('enable');

        // Hide message area
        $('#messageArea').hide();

        // Hide Play Again button
        $('#playAgain').hide();

        // Reinitialize the game
        initializeGame();
    }

    // Function to show messages
    function showMessage(message) {
        $('#messageArea').text(message).fadeIn().delay(1500).fadeOut();
    }

    // Click event for Play Again button
    $('#playAgain').on('click', function() {
        resetGame();
    });

    // Initialize the game
    initializeGame();
});