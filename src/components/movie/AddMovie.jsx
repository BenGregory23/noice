import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalClose,
    Radio,
    RadioGroup,
    Sheet,
    Stack,
    Typography,
    Select,
    Option
} from "@mui/joy";
import {PlusSquareIcon} from "lucide-react";
import {useState} from "react";
import Rating from "../Rating.jsx";
import { searchMovieYearByTitle } from "../../utils/searchMovie.js";

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


const AddMovie = ({dispatch}) => {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [movie, setMovie] = useState({
        title: "",
        year: "",
        rating: 3,
        tags: ['drama', 'crime', 'classic'],
    });

    const addMovie = () => {

       searchMovieYearByTitle(movie.title).then((response) => {
            if(response === undefined){
                response = "0000";
            }
            response = response.substring(0, 4);
            console.log(response);
            const movieObject ={
                title: movie.title,
                year: response,
                rating: movie.rating,
                tags: movie.tags,
            }
            setMovie({...movie, year: response});
            fetch("https://noice-bengregory.herokuapp.com/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movieObject),
        }).then((response) => {
            console.log(response);
            dispatch({ type: "ADD_MOVIE", movie: movieObject });
            setAddModalOpen(false);
        }).catch((error) => {
            console.log(error);
        });
        }).catch((error) => {
            console.log(error);
        });



        
        

    }


    return (
        <>
            <Button color={"success"} onClick={() => setAddModalOpen(true)} sx={{borderRadius: "md", height: 45, width:45   , backgroundColor: "#589158"}}>
                <PlusSquareIcon size={24} />
            </Button>

            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 500,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    
                    <Stack spacing={2}>
                        <Input placeholder={"Titre"} type={"text"}  onChange={(e) => setMovie({...movie, title: e.target.value})}
                            endDecorator={
                                <Button
                                color="success"
                                    
                                    onClick={() => addMovie()}
                                >
                                    Ajouter
                                </Button>}
                        />
                        {
                            /*
                            <Button color={"success"} onClick={addMovie}>
                            Ajouter
                        </Button>
                        */
                        }
                        
                    </Stack>

                </Sheet>
            </Modal>
        </>
    )
}

export default AddMovie;
