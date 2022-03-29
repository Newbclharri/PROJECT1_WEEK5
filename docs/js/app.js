console.log("connected!");
//API KEYS
//OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=ad043b17

//always look at the structure of the data before manipulating DOM
//makes the request
//functions******************
const setPosters = (arryMovies) => {
    //accepts array of objects and sets poster object in grid
    // const $divImg = $(`<div class=".image-container">${arryMovies[0].Title}<img id="${arryMovies[0].Title}" class="poster-boxed" src="${arryMovies[0].Poster} alt="${arryMovies[0].Title}"></div>`)
    // $('.movie-board').append($divImg);
    $divFlipFront.empty();
    $('.movie-board').empty();
    for(let movie of arryMovies){
        const $divImg = $(`
        <div class=".image-container">${movie.Title}
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
    $divFlipFront.empty();
    const $clonedImg = img.clone();
    //creates front side
    $clonedImg.removeClass('poster-boxed');
    $clonedImg.addClass('img-flip-card')              
    $clonedImg.appendTo($divFlipFront);
    //creates back side
    for(let movie of arryMovies){
        const title = img.attr("id");
        if(movie.Title === title){
            styleFlipCard();
            $.ajax(`${urlApi}&i=${movie.imdbID}`).then(res => {
            console.log("Back side: ", res);
            $divFlipCont.prop("background-color", "#00ffff");
            $('.back-title').text(`${res.Title} ${res.Year}`);
            $('.line-one').text(`Rated: ${res.Rated}`);
            const rottenTom = res.Ratings[1];
            $('.line-two').text(`${rottenTom.Source}: ${rottenTom.Value}`);
            $('.line-plot').text(`${res.Plot}`)
            })
        }
    }    
};

const styleFlipCard = () => {
    const width = "40vh", height = "50vh"; bgFront = "dodgerblue", bgBack = "aqua";
    $sectionFlip.css({"width": "var(--flipCardWidth)", "height": "var(--flipCardHeight)"})
    $divFlipCont.css({"width": "100%", "height": "100%"});
    $divFlipFront.css({"width": "100%", "height": "100%"});
    $divFlipBack.css({"width": "100%", "height": "100%"});
};



const my_api_key = config.SECRET_API_KEY;
const urlApi = `https://www.omdbapi.com/?apikey=${my_api_key}`;
const $inputMovie = $('#movie-query');
const $movieBtn = $(`#movie-btn`);
const $movieBoard = $('.movie-board');
//flip card elements
const $sectionFlip = $('.flip-card')
const $divFlipCont = $('.flip-card-cont')
const $divFlipFront = $('.flip-card-front')
const $divFlipBack = $('.flip-card-back')
$movieBtn.on("click", (e) =>{
    e.preventDefault();
    console.log("clicked")
    // $inputMovie.attr("value", "Star Wars");
    console.log($inputMovie.val())
    $.ajax(`${urlApi}&s=${$inputMovie.val()}`).then(res => {
        console.log(res);
        const movies = res.Search;
        console.log(movies[0]);
        setPosters(movies);

        $movieBoard.on("click", (e) => {
            e.preventDefault();
            
            const img = document.querySelector('img');
            if(e.target.tagName === img.tagName){  
                const $target = $(e.target);
                createFlipCard($target, movies);            
                console.log(e.target);                      
            }            
        })
    });
});





