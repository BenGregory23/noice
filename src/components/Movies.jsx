import {Stack} from "@mui/joy";
import Movie from "./Movie.jsx";

const Movies = ({}) => {

    const movieExample = {
        id: 1,
        title: 'The Godfather',
        year: 1972,
        tags: ['drama', 'crime', 'classic'],
        rating:'Good',
    }


    return(
        <Stack direction={"row"}
               sx={{
                   flexWrap: 'wrap',
                   maxWidth: 1000,

               }}
        >
            <Movie movie={movieExample} />
            <Movie movie={movieExample} />
            <Movie movie={movieExample} />
            <Movie movie={movieExample} />
            <Movie movie={movieExample} />
            <Movie movie={movieExample} />
            <Movie movie={movieExample} />
        </Stack>
    )
}

export default Movies