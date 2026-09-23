import "../css/MovieCard.css"
import { useState } from "react";
import { useMovieContext } from "../contexts/FavoriteContext";
function MovieCard({movie}){
    const {isFavorite,addToFavorites,removeFromFavorites} =useMovieContext();
    const favorite=isFavorite(movie.id);
 const handleLike = (e) => {
    e.preventDefault();
    if(favorite) removeFromFavorites(movie.id)
    else addToFavorites(movie)
  
    

};
    return(
        <div className="movie-card">
            <div className="movie-poster"> 
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movieposter"></img>
              <div className="movie-overlay">
               <button
    className={`favorite-btn ${favorite ? "active" : ""}`}
    onClick={handleLike}
>
    <i className="fa-regular fa-heart"></i>
</button>
          </div>

        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
        </div>
        </div>
    )


}
export default MovieCard