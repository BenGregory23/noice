import {Box, Option, Select, Stack} from "@mui/joy";
import Movie from "./Movie.jsx";
import AddMovie from "./AddMovie.jsx";
import { useEffect, useReducer, useState } from "react";

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

const genreOptions = [
    { value: "action", label: "Action" },
    { value: "adventure", label: "Adventure" },
    { value: "comedy", label: "Comedy" },
    { value: "crime", label: "Crime" },
    { value: "drama", label: "Drama" },
    { value: "fantasy", label: "Fantasy" },
    { value: "historical", label: "Historical" },
    { value: "horror", label: "Horror" },
    { value: "mystery", label: "Mystery" },
    { value: "political", label: "Political" },
    { value: "romance", label: "Romance" },
    { value: "science-fiction", label: "Science Fiction" },
    { value: "thriller", label: "Thriller" },
    { value: "western", label: "Western" },
];

function movieReducer(state, action) {
    switch (action.type) {
        case "ADD_MOVIE":
            return { ...state, movies: [...state.movies, action.movie] };
        case "REMOVE_MOVIE":
            const newMovies = state.movies.filter((movie) => movie.id !== action.movie.id);
            return { ...state, movies: newMovies };
        case "ADD_MOVIES":
            return { ...state, movies: action.movies };
        case "SET_DATA_LOADED":
            return { ...state, dataLoaded: action.dataLoaded };
        default:
            return state;
    }
}

const Movies = ({}) => {
    const [state, dispatch] = useReducer(movieReducer, {
        movies: [],
        dataLoaded: false,
    });


    const movieExample = {
        id: 1,
        title: 'The Godfather',
        year: 1972,
        tags: ['drama', 'crime', 'classic'],
        rating:'Good',
    }

    useEffect(() => {

        if (!state.dataLoaded) {
            console.log("fetching data");
            // fetch("http://localhost:3000/movies")
            fetch("https://noice-bengregory.herokuapp.com/movies")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    dispatch({ type: "ADD_MOVIES", movies: data });
                    dispatch({ type: "SET_DATA_LOADED", dataLoaded: true });
                });
        }
    }, [state.dataLoaded, dispatch]); // Add 'dispatch' to the dependency array

    return(
        <Box
            sx={{
                width: '100%',
                overflowY: 'hidden',
                

                }}
        >
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
                    
                    {state.movies.map((movie) => (
                        <Movie key={movie._id} movie={movie} dispatch={dispatch}/>
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
                        backgroundColor : "white",
                        borderTop : "1px solid #e0e0e0",
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
                    <Select placeholder={"Genre"}>
                        {genreOptions.map((option) => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                    <AddMovie dispatch={dispatch}/>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Movies