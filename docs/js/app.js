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

const createFlipCard = (img) => {
    const $clonedImg = $target.clone();
    $clonedImg.removeClass('poster-boxed')                
    $clonedImg.appendTo($divFlipFront);     
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
                $divFlipFront.empty();
                const $target = $(e.target);
                createFlipCard();            
                console.log(e.target);
                      
            }            
        })
    });
});





