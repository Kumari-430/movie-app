import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css';
import Trending from "./Pages/trending/Trending";
import Movies from "./Pages/movies/Movies";
import Series from "./Pages/series/Series";
import Search from "./Pages/search/Search";
import Header from './components/Header';
import SimpleBottomNavigation from './components/MainNav';
import { Container } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <div className="app">
    <Container>
    <Routes>
    <Route path="/" Component={Trending} exact/>
    <Route path="/movies" Component={Movies}/>
    <Route path="/series" Component={Series}/>
    <Route path="/search" Component={Search}/>
    </Routes>
    </Container>
    </div>
    <SimpleBottomNavigation/>
    </BrowserRouter>
    
  );
}


export default App;
