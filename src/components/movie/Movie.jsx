import {AspectRatio, Button, Box, Card, CardOverflow, Chip, Divider, Stack, Typography} from "@mui/joy";
import { useEffect, useState } from "react";
import {searchMovieByTitle, searchMovieDescriptionByTitle} from "../../utils/searchMovie";


const Movie = ({ movie, dispatch }) => {
    const [posterUrl, setPosterUrl] = useState('');
    const [overview, setOverview] = useState(false);


    const removeMovie= () => {
        fetch(`https://noice-bengregory.herokuapp.com/movies/${movie._id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.status === 200) {
                console.log("ok")
                dispatch({type: "REMOVE_MOVIE", id: movie._id})
            }
        }).catch((error) => {
            console.log(error)
        })
    }


    useEffect(() => {
        // Example usage: search for the poster of the movie "The Dark Knight"
        searchMovieByTitle(movie.title)
        .then(posterUrl => {
            setPosterUrl(posterUrl);

            searchMovieDescriptionByTitle(movie.title)
            .then(overview => {
                setOverview(overview);
            }).catch(error => {
                console.error(error);
            });

        })
        .catch(error => {
            console.error(error);
        });

    }, [movie])

    const overviewStyle = {
        display: "none",
       
         
                    borderRadius: "0.6rem",
                    padding: "1rem",
                    position:"absolute", 
                    top:0,
                    left:0,
                    height:"480px",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    userSelect: "none",
                  
    }



    

    const showOverview = () => {
        console.log("show overview")
        const overview = document.getElementById("overview"+ movie._id);
        if (overview.style.display === "none") {
            overview.style.display = "flex";
        }
        else {
            overview.style.display = "none";
        }


    }

    return(
        <Card onClick={showOverview} variant="outlined" sx={{ width: 270, height: 480, m:2, cursor: "pointer" }}>
            <CardOverflow sx={{
               
            }}>
                <AspectRatio ratio="0.7">
                    <img src={posterUrl} alt={movie.title}/>
                </AspectRatio>
            </CardOverflow>
            
                <Stack 
                    sx={{
                        height: "fit-content",
                    }}
                >
                    <Typography level="h2" sx={{ fontSize: 'md', mt: 1.3 }}>
                        {
                            //max 20 characters
                        }
                        {movie.title.length > 20 ? movie.title.substring(0, 20) + "..." : movie.title}
                    </Typography>
                    <Typography level="body2" sx={{ mt: 0.5, mb: 0 }}>
                        {movie.year}
                    </Typography>
                   
                </Stack>
            
                
            
                
        
            <Box sx={overviewStyle} 
                    id={"overview" + movie._id}>
                        <Stack>
                            <Typography level="h2" sx={{ fontSize: 'md', mt: 2, color: "white" }}>
                                {movie.title}
                            </Typography>
                            <Typography level="body2" sx={{ mt: 0.5, mb: 2,color: "white" }}>
                                {overview}
                            </Typography>
                            <Button size="sm" onClick={() => {removeMovie()}}
                                sx={{
                                    marginTop: "1rem",
                                }}
                            >
                                Delete
                            </Button>
                        </Stack>
                        
                    
            </Box>
            
        </Card>
    )
}

export default Movie;