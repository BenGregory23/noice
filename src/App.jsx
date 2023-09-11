import { useEffect, useState } from 'react'
import './css/App.css'
import {
  Box,
  CssVarsProvider
} from "@mui/joy";
import Header from "./components/Header";
import {BrowserRouter as Router, Route,  Routes, } from 'react-router-dom';
import Home from "./components/Home.jsx";
import Movies from "./components/movie/Movies.jsx";
import Food from "./components/food/Food.jsx";
import NotFound from './components/NotFound.jsx';
import Choose from "./components/food/choose.jsx";




function App() {

    
    const [mode, setMode] = useState('light');


    useEffect(() => {
      fetch("https://api.ipify.org/")
      .then(res => {
        return res.text()
      }).then(res => {
        
        
          fetch("https://radar-my-apps-336125652a2e.herokuapp.com/?source=Noice&ip=" + res,{method: 'POST'}).then(res => res.json())
          .then(res => console.log(res))
          .catch(err => console.log(err))
      }).catch(err => console.log(err))
    }, [])
    
    
      

    return (
      
        <Box sx={{
            width: '100%',
            height: '100vh',
            margin: 0,
            padding: 0,
            position: "absolute",
            top: 0,
            left: 0,
            
            backgroundColor: mode === 'light' ? '#ffffff' : "black",
        }}>
            
            <CssVarsProvider>

                <Router>
                    <Header mode={mode} setMode={setMode}/>
                    <Routes>
                        <Route path="*" element={<NotFound/>} />
                        <Route path="/" element={<Home mode={mode}/>} />
                        <Route path="/movies" element={<Movies mode={mode} />} />
                        <Route path={"/food"} element={<Food mode={mode}/>} />
                        <Route path={"/food/choose"} element={<Choose/>}/>
                    </Routes>
                </Router>
            </CssVarsProvider>
        </Box>
        
  )
}

export default App
