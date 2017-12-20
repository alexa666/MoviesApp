
var db = null;


function init(){
    
    //createDB();
    
    $('#movies_button').click(function(){
       getMoviesListAndDrawList(); 
    });
    
    $('#fav_button').click(function(){
       showFavorites(); 
    });
    
    getMoviesListAndDrawList();
    
} 

/*function createDB()
{
    
    db = window.sqlitePlugin.openDatabase({name: 'favorites.db', location: 'default'});
    db.sqlBatch(['CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY, title, votes, date, overview, img)'],
               function()
                {
                    console.log('Created database');
                },
                function(error)
                {
                    console.log('Error creating db: '+error.message);
                }
               
               );
               
} */

function showFavorites()
{
    
    db.executeSql('SELECT * FROM favorites', [], function(rs) {
        
        if (rs.rows.length == 0) 
        {
            theList.empty();
            theList.append(
                '<li> Favorites list empty </li>'
            );
            theList.listview("refresh");
        }
        else
        {
            theList.empty();
            for (i = 0; i < rs.rows.length; i++)
            {
                var elem = 
                '<li>' +
                '<img src="http://image.tmdb.org/t/p/w185' + rs.rows.item(i).img + '">' +
                rs.rows.item(i).title + ' ('+ rs.rows.item(i).date +') </br>' +
                '<div><p>Rating: ' + rs.rows.item(i).votes + '/10' +  '</p></div>' +
                '<div><p>' + moviesList.results[i].overview + '</p></div>' +
                '</li>';
                
                theList.append(elem);
            }
            theList.listview("refresh");
        }
        
        
    }, function(error) {
        console.log("Error showing favorites: " + error.message);
    });
    
}


function getMovieAndDrawDetail(){
    
     var request = $.ajax({
          url: "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6c665ab60922646afa521a5bc20620df",
          method: "GET"
        });

        request.done(function( result ) {
            //return result;
            
          //alert(result.original_title);
        });

        request.fail(function( jqXHR, textStatus ) {
          alert( "Request failed: " + textStatus );
    });
}



function getMoviesListAndDrawList() {
    var theList = $("#mylist");
    
    var request = $.ajax({
          url: "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6c665ab60922646afa521a5bc20620df",
          method: "GET"
        });

    
    
    request.done(function( moviesList ) {
        theList.empty();
        
        for (i = 0; i < moviesList.results.length; i++) {
            
            var elem = 
                '<li>' +
                '<img src="http://image.tmdb.org/t/p/w185' + moviesList.results[i].poster_path + '">' +
                moviesList.results[i].title + ' ('+ moviesList.results[i].release_date.split('-')[0] +') </br>' +
                '<div><p>Rating: ' + moviesList.results[i].vote_average + '/10' +  '</p></div>' +
                '<div><p>' + moviesList.results[i].overview + '</p></div>' +
                '</li>';

            theList.append(elem);

        }

        theList.listview("refresh");

        });
    
    

        request.fail(function( jqXHR, textStatus ) {
          alert( "Request failed: " + textStatus );
    });
}