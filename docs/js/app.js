console.log("connected!");
//API KEYS
//OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=ad043b17

//always look at the structure of the data before manipulating DOM
//makes the request




const my_api_key = config.SECRET_API_KEY;

const data = $.ajax(`https://www.omdbapi.com/?apikey=${my_api_key}&t=Frozen`)
console.log(data)
console.log(data.responseJSON)