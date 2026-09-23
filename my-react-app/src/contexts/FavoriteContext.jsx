import {createContext,useContext,useState,useEffect} from "react";
  const FavoriteContext=createContext();
 export const useMovieContext=()=>useContext(FavoriteContext);
 export const MovieProvider=({children})=>{
    const [favorites,setFavorites]=useState([])
    useEffect(()=>{
    const storedFavs=localStorage.getItem("favorites")
    if(storedFavs) setFavorites(JSON.parse(storedFavs))
        
 },[])
  useEffect(()=> {
    localStorage.setItem('favorites', JSON.stringify(favorites))

  },[favorites])

const addToFavorites=(movie)=>{
  setFavorites(prev => [...prev,movie])


}
const removeFromFavorites=(movieId)=>{
  setFavorites(prev=> prev.filter((movie)=>movieId!==movie.id))
}
const isFavorite=(movieId)=>{
  return favorites.some((movie)=>movieId===movie.id)
}
 const value={
  favorites,
  addToFavorites,
  removeFromFavorites,
  isFavorite

}
return <FavoriteContext.Provider value={value}>
  {children}
  </FavoriteContext.Provider>
 }