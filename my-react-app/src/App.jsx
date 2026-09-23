/*import Button from './Button/Button.jsx'
import Student from './Student.jsx'
import UserGreeting from './UserGreeting.jsx'
import List from './List.jsx'
import Button from "./Button.jsx";
import Counter from "./Counter"

import StudentForm from "./StudentForm"
import ColorPicker from "./ColorPicker"

import ToDoList from "./ToDoList"
import Clock from "./Clock"
import Home from "./Home"
import Component from "./Component"
import StopWatch from "./StopWatch"
import MovieCard from "./components/MovieCard.jsx"*/
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import {Routes ,Route} from 'react-router-dom';
import NavBar from "./components/NavBar.jsx";
import "./css/App.css";

import { MovieProvider } from "./contexts/FavoriteContext.jsx";


function App() {
 /* const fruits=[{ id:1,name:"mango",cal:80},
                {id:2,name:"apple",cal:100},
                {id:3, name:"melon", cal:45 },
                {id:4, name:"banana", cal:105 }]
  const desserts=[{ id:1,name:"chocolate cake" , recepe:"Italian"},
                {id:2,name:"cheese cake", recepe:"American"},
                {id:3, name:"minifoli", recepe:"Mexican" },
                {id:4, name:"white forest", recepe:"French" 

  }]*/
  

 return(
 
    <>
    <MovieProvider>
    <NavBar />
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
      </Routes>
    </main>
    </MovieProvider>
    
  
     </>

 )}
   
     
     
     



 
  

export default App
