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

        $("#find-gif").on("click", function(event){
            event.preventDefault();
    
            var animalAdd = $("#gif-input").val().trim();
    
            topics.push(animalAdd);
    
            renderButtons();

            $("button").on("click", displayGif)

        })
  
    function displayGif(){

    //$("button").on("click", function() {
        
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
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-state");
            animalImage.attr("data-still", results[i].images.fixed_height_still.url)
            animalImage.attr("data-animate", results[i].images.fixed_height.url)
            animalImage.attr("data-state", "still")
            gifDiv.prepend(animalImage);
            $("#animal-gifs").prepend(gifDiv);
        }

            $("img").on("click", function() {
                
                var state = $(this).attr("data-state");
            
                if (state ==="still") {
                    $(this).attr("src", $(this).data("animate"));
                    $(this).attr("data-state", "animate");
                    console.log(state)
                }
            
                else if (state==="animate") {
                    $(this).attr("src", $(this).data("still"));
                    $(this).attr("data-state", "still");
                    console.log(state)
                }
            })
          
        });
    }
    renderButtons();

    $(document).on("click", ".animal", displayGif);



    





    

   