console.log("connected!");

//OMDb API url: http://www.omdbapi.com/?i=tt3896198&apikey=ad043b17

//always look at the structure of the data before manipulating DOM

//functions******************
const formatTitles = ()=>{
    $("#welcome-title").remove();
    $('#title').addClass('font-effect-neon');
    $('#title').text(searchTerm);
};

const setWelcomeMovie = (movie) => {
        const $divImg = $(`
        <div class=".image-container zoom">${movie.Title}
            <img id="${movie.Title}" 
                class="poster-boxed" 
                src="${movie.Poster} 
                alt="${movie.Title}">
            </>
        </div>`);
        $('.movie-board').append($divImg);
};
    

const setPosters = (arryMovies) => {
    //accepts array of objects and sets poster object in grid
   
    //removes flip card for new movie search
    $divFlipFront.empty();
    unStyleFlipCard();
    $('.movie-board').empty();
    for(let movie of arryMovies){
        const $divImg = $(`
        <div class=".image-container zoom">${movie.Title}
            <img id="${movie.Title}" 
                class="poster-boxed" 
                src="${movie.Poster} 
                alt="${movie.Title}">
            </>
        </div>`);
        $('.movie-board').append($divImg);
    }
};

const createFlipCard = (img, arryMovies) => {
    //remove previous flip card poster image    
    $divFlipFront.empty();

    //copy user clicked image
    const $clonedImg = img.clone();

    //creates front side
    $clonedImg.removeClass('poster-boxed');
    $clonedImg.addClass('img-flip-card')              
    $clonedImg.appendTo($divFlipFront);
    
    //creates back side
    for(let movie of arryMovies){
        const title = img.attr("id");
        if(movie.Title === title){
            
            $.ajax(`${urlApi}&i=${movie.imdbID}`).then(res => {
            console.log("Back side: ", res);
            $divFlipCont.prop("background-color", "#00ffff");
            $('.back-title').text(`${res.Title} ${res.Year}`);
            $('.line-one').text(`Rated: ${res.Rated}`);
            
            let ratings = res.Ratings[1];
            if(!ratings){
                ratings = res.Ratings[0];
            }
            $('.line-two').text(`${ratings.Source}: ${ratings.Value}`);
            $('.line-plot').text(`${res.Plot}`)
            styleFlipCard();
            })
        }
    }    
};

const styleFlipCard = () => {
    $sectionFlip.css({"width": "var(--flipCardWidth)", "height": "var(--flipCardHeight)"})
    $divFlipCont.css({"width": "100%", "height": "100%"});
    $divFlipFront.css({"width": "100%", "height": "100%","border":"2px solid greenyellow"});
    $divFlipBack.css({"width": "100%", "height": "100%", "border":"2px solid plum" });
};

const unStyleFlipCard = () => {    
    $sectionFlip.css({"width": "0", "height": "0"})
    $divFlipCont.css({"width": "0", "height": "0"});
    $divFlipFront.css({"width": "0", "height": "0", "border": "none"});
    $divFlipBack.css({"width": "0", "height": "0","border": "none"});
    const cardLines = document.querySelectorAll('.line')
    for(i = 0; i< cardLines.length; i++){
        cardLines[i].textContent = null;
    }
};


//Variables******************
//Api Key and Url
const my_api_key = config.SECRET_API_KEY;
const urlApi = `https://www.omdbapi.com/?apikey=${my_api_key}`;

//essential HTML elements
const $inputMovie = $('#movie-query');
const $movieBtn = $(`#movie-btn`);
const $movieBoard = $('.movie-board');

//OMDB id's to load on init
const ids = { titanic: "tt0120338", lion_king: "tt6105098", star_wars: "tt0076759", lord_of_the_rings: "tt0120737", the_wizard_of_oz: "tt0084458" }
const titanic = "tt0120338";

//flip card elements
const $sectionFlip = $('.flip-card')
const $divFlipCont = $('.flip-card-cont')
const $divFlipFront = $('.flip-card-front')
const $divFlipBack = $('.flip-card-back')
let searchTerm = null;


for(id in ids){
    $.ajax(`${urlApi}&t=${id}`).then(res => {
        setWelcomeMovie(res);
    })
}
//click events using jQuery*********************

$movieBtn.on("click", (e) =>{
    e.preventDefault();
    if($inputMovie.val()){    
        searchTerm = $inputMovie.val();
        $movieBtn.removeClass("font-effect-fire")
        $movieBtn.addClass("font-effect-neon")
        $('body').css({"border": "2px dashed greenyellow"});
        $('html').css({"background-image": "linear-gradient(purple,black)"})
        formatTitles();
        $.ajax(`${urlApi}&s=${$inputMovie.val()}`).then(res => {
            console.log(res);
            const movies = res.Search;
            setPosters(movies);
            $inputMovie.val(null);

            $movieBoard.on("click", (e) => {
                e.preventDefault();           
                const img = document.querySelector('img');
                if(e.target.tagName === img.tagName){  
                    const $target = $(e.target);
                    createFlipCard($target, movies);            
                }            
            })
        });
    }
});