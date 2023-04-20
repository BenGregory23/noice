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
        console.log(movie);
        fetch("https://noice-bengregory.herokuapp.com/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movie),
        }).then((response) => {
            console.log(response);
            dispatch({ type: "ADD_MOVIE", movie: movie });
            
            setAddModalOpen(false);
        }).catch((error) => {
            console.log(error);
        });

    }


    return (
        <>
            <Button color={"success"} onClick={() => setAddModalOpen(true)} sx={{borderRadius: "md", height: 50, width:50, backgroundColor: "#589158"}}>
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
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                    >
                        Ajout d'un nouveau film ou série
                    </Typography>
                    <Stack spacing={1}>
                        <Input placeholder={"Titre"} type={"text"}  onChange={(e) => setMovie({...movie, title: e.target.value})}/>
                        <Input placeholder={"Année"} type={"number"} onChange={(e) => setMovie({...movie, year: e.target.value})}/>
                        <Select placeholder={"Genre"}>
                            {genreOptions.map((option) => (
                                <Option key={option.value} value={option.value}> {option.label} </Option>
                            ))}
                        </Select>

                        <Rating value={movie.rating} onChange={(e) => setPlace({...movie, rating: e.target.value})}/>

                        <Button color={"success"} onClick={addMovie}>
                            Ajouter
                        </Button>
                    </Stack>

                </Sheet>
            </Modal>
        </>
    )
}

export default AddMovie;
