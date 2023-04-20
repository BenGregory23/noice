import {AspectRatio, Card, CardOverflow, Chip, Divider, Typography} from "@mui/joy";
import { useEffect, useState } from "react";
import searchMovieByTitle from "../../utils/searchMovieByTitle";


const Movie = ({ movie }) => {
    const [posterUrl, setPosterUrl] = useState('');

    useEffect(() => {
        // Example usage: search for the poster of the movie "The Dark Knight"
        searchMovieByTitle(movie.title)
        .then(posterUrl => {
            setPosterUrl(posterUrl);

        })
        .catch(error => {
            console.error(error);
        });

    }, [movie])

    return(
        <Card variant="outlined" sx={{ width: 270, m:2, cursor: "pointer" }}>
            <CardOverflow>
                <AspectRatio ratio="0.8">
                  
                    <img src={posterUrl} alt={movie.title}/>
                </AspectRatio>
            </CardOverflow>
            <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
                {movie.title}
            </Typography>
            <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                {movie.year}
            </Typography>
            <Divider />
            <CardOverflow
                variant="soft"
                sx={{
                    display: 'flex',
                    gap: 1.5,
                    py: 1.5,
                    px: 'var(--Card-padding)',
                    bgcolor: 'background.level1',
                }}
            >
                <Typography level="body2" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                    {movie.rating}
                </Typography>
                <Divider orientation="vertical" />
                <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                    {
                        // if movie.tags is an array map else avoid 
                        typeof movie.tags === 'object' ? 
                
                        movie.tags.map((tag) => (
                            <Chip variant={"outlined"} size={"sm"} sx={{
                                mx:0.2
                            }}>
                                {tag}
                            </Chip>
                        ))
                        : null
                    }
                </Typography>
               
            </CardOverflow>
        </Card>
    )
}

export default Movie;