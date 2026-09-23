import "../css/Favorites.css"
import { useMovieContext } from "../contexts/FavoriteContext"
import MovieCard from "../components/MovieCard"

function Favorites(){

    const {favorites}=useMovieContext();
    if(favorites){
        return(<div className="favorites">
            <h2> Favorite movies</h2>
            <div className="movies-grid">
       {favorites.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
    ))}
</div>



        </div>)
    }
    return(
    <div className="favorites-empty">
        <h2>no favorite movies yet</h2>
        <p> start adding movies</p>
    </div>
    )
    
}
export default Favorites