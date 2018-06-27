var topics = ["Dog", "Cat", "Emu", "Octopus", "Mouse", "Koala", "Owl", "Kangaroo", "Wolf", "Fox", "Lion", "Panda", "Hippo", "Rabbit", "Snake", "Bear", "Otter", "Turtle", "Raccoon", "Dolphin", "Squirrel", "Frog", "Giraffe"];

    function renderButtons() {
        $("#animal-buttons").empty();

        for (var i=0; i<topics.length; i++){

            var a=$("<button>");
            a.addClass("animal");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#animal-buttons").append(a);
        }
    }
        renderButtons();

    
        $("#find-gif").on("click", function(event){
            event.preventDefault();
    
            var animalAdd = $("#gif-input").val().trim();
    
            topics.push(animalAdd);
    
            renderButtons();
        })
  

    $("button").on("click", function() {
        
      var animal = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ animal + "&api_key=AoZa2gNfezsLCXbt8w4TqWQKYpVWdBIK&limit=10";

        $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var animalImage = $("<img>");

            var animalStill = (results[i].images.fixed_height_still.url);
            var animalAnimate = (results[i].images.fixed_height.url);

            animalImage.attr("src", animalStill);

            animalImage.attr("data-state", "still");

            gifDiv.prepend(animalImage);

            $("#animal-gifs").prepend(gifDiv);

            $("img").on("click", function() {
                var state = $(this).attr("data-state");
            
                console.log (state)
            
                if (state ==="still") {
                    $(this).attr("data-state", "animate");
                    animalImage.attr("src", animalAnimate);
                }
            
                else if (state==="animate") {
                    $(this).attr("data-state", "still");
                    animalImage.attr("src", animalStill);
                }
            })
          }
        });
    });





    

   