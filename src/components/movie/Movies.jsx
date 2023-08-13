import {Box, Option, Select, Stack, Input} from "@mui/joy";
import Movie from "./Movie.jsx";
import AddMovie from "./AddMovie.jsx";
import { useEffect, useReducer, useState } from "react";
import Loader from "../Loader.jsx";

const movieListStyle = {
    height: '80vh',
    width: '100%',
    overflowY: 'scroll',
    paddingTop: '1rem',
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: '4rem',

}



function movieReducer(state, action) {
    switch (action.type) {
        case "ADD_MOVIE":
            return { ...state, movies: [...state.movies, action.movie] };
        case "REMOVE_MOVIE":
            const newMovies = state.movies.filter((movie) => movie._id !== action.id);
            return { ...state, movies: newMovies };
        case "ADD_MOVIES":
            return { ...state, movies: action.movies };
        case "SET_DATA_LOADED":
            return { ...state, dataLoaded: action.dataLoaded };
        case "SET_DISPLAYED_MOVIES":
            return { ...state, displayedMovies: action.displayedMovies };
        default:
            return state;
    }
}



const Movies = ({mode}) => {
    const [state, dispatch] = useReducer(movieReducer, {
        movies: [],
        displayedMovies: [],
        dataLoaded: false,
    });

    const searchMovie = (event) => {
        const searchValue = event.target.value;
        if (searchValue === "") {
            dispatch({ type: "SET_DISPLAYED_MOVIES", displayedMovies: state.movies });
            return;
        }
        if (searchValue.length < 2) {
            return;
        }
        const displayedMovies = state.movies.filter((movie) => {
            return movie.title.toLowerCase().includes(searchValue.toLowerCase());
        });
        dispatch({ type: "SET_DISPLAYED_MOVIES", displayedMovies: displayedMovies });
    };

    useEffect(() => {
        if (!state.dataLoaded) {
            // fetch("http://localhost:3000/movies")
            fetch("https://noice-bengregory.herokuapp.com/movies")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    dispatch({ type: "ADD_MOVIES", movies: data });
                    dispatch({ type: "SET_DATA_LOADED", dataLoaded: true });
                    dispatch({ type: "SET_DISPLAYED_MOVIES", displayedMovies: data });
                });
        }
    }, [state.dataLoaded, dispatch, state.movies]); // Add 'dispatch' to the dependency array

    return(
        <Box
            sx={{
                width: '100%',
                overflowY: 'auto',
                // mac 
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
                }}
        >
           {
                !state.dataLoaded ? <Loader /> : null
           }
            <Stack direction={"column"}
                sx={{
                    width: "100%",
                    display: "flex",
                   
                    "@media (max-width: 600px)": {
                        paddingLeft: 0,
                        height: "100%",
                        flexDirection: "column-reverse",
                        justifyContent:"space-between",
                        alignItems:"space-between",
                    }
                }}
            >
                
                <Box
                    sx={movieListStyle}
                >
                    
                    {state.displayedMovies.map((movie) => (
                        <Movie mode={mode} key={movie._id} movie={movie} dispatch={dispatch}/>
                    ))}
                 
                </Box>

                <Stack
                    direction={"row"}
                    spacing={2}
                    sx={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        padding : "1rem",
                        backgroundColor : mode === "dark" ? "black" : "#fff",
                        borderTop : mode === "dark" ? "1px solid #242424" : "1px solid #e0e0e0",
                    
                        height: "fit-content",
                        position : "fixed",
                        bottom : 0,
                        "@media (max-width: 600px)": {
                           
                            padding : "0.2rem",
                            width : "100vw",
                            height : "10%",
                            zIndex: 10000,
                        }
                    }}
                >
                    
                    <Input placeholder={"Search"} onChange={searchMovie} 
                        sx={{
                           backgroundColor : mode === "dark" ? "#242424" : "#fff",
                           color : mode === "dark" ? "#fff" : "#000",
                         
                            
                        }}

                    />
                    <AddMovie dispatch={dispatch}/>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Movies