import { useState } from 'react'
import './css/App.css'
import {
  Box,
  CssVarsProvider, Stack, Typography
} from "@mui/joy";
import Header from "./components/Header";
import {BrowserRouter as Router, Route, Link, Routes, } from 'react-router-dom';
import Home from "./components/Home.jsx";
import Movies from "./components/movie/Movies.jsx";
import Food from "./components/food/Food.jsx";
import NotFound from './components/NotFound.jsx';
import Choose from "./components/food/choose.jsx";




function App() {
  return (
        <Box sx={{
            width: '100%',
            height: '100vh',
        }}>
            <CssVarsProvider>

                <Router>
                    <Header/>
                    <Routes>
                        <Route path="*" element={<NotFound/>} />
                        <Route path="/" element={<Home />} />
                        <Route path="/movies" element={<Movies />} />
                        <Route path={"/food"} element={<Food/>} />
                        <Route path={"/food/choose"} element={<Choose/>}/>
                    </Routes>
                </Router>
            </CssVarsProvider>
        </Box>
  )
}

export default App
