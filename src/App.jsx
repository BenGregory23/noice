import { useState } from 'react'
import {
  Box,
  CssVarsProvider, Stack, Typography
} from "@mui/joy";
import Header from "./components/Header";
import {BrowserRouter as Router, Route, Link, Routes, } from 'react-router-dom';
import Home from "./components/Home.jsx";
import Movies from "./components/movie/Movies.jsx";
import Food from "./components/food/Food.jsx";






function App() {
  return (
        <Box sx={{
            width: '100%',
            height: '89vh',
        }}>
            <CssVarsProvider>

                <Router>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/movies" element={<Movies />} />
                        <Route path={"/food"} element={<Food/>} />
                    </Routes>
                </Router>
            </CssVarsProvider>
        </Box>
  )
}

export default App
