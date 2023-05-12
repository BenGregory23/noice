import {
    Box,
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
    Typography
} from "@mui/joy";
import {useState} from "react";

import {PlusSquareIcon} from "lucide-react";
import Rating from "../Rating.jsx";


const createFeatureFromPlace = (place) => {
    return {
        type: "Feature",
        properties: {
            description: place.name,
            icon: place.type
        },
        geometry: {
            type: "Point",
            coordinates: [place.coordinates.lng, place.coordinates.lat]
        },
    };
}


const AddFood = ({dispatch}) => {
    const [addModalOpen, setAddModalOpen] = useState(false);

    const [place, setPlace] = useState({
        id: 0,
        name: "",
        type: "",
        rating: 0,
        coordinates: {
            lat: 0,
            lng: 0,
        },
    })

    const addPlaceToDb = () => {
        console.log(place);
        const dbObject = {
            id: place.id,
            name: place.name,
            type: place.type,
            rating: 4,
            coordinates: {
                lat: place.coordinates.lat,
                lng: place.coordinates.lng,
            },
        };

        const feature = createFeatureFromPlace(dbObject);

        dispatch({ type: "ADD_FOOD", place: feature }); // Change 'dbObject' to 'place: feature'

        fetch("https://noice-bengregory.herokuapp.com/places", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dbObject),
        })
            .then((response) => {
                setAddModalOpen(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return(
        <Box sx={{
        }}>
            <Button color={"success"} onClick={() => setAddModalOpen(true)} sx={{borderRadius: "md", height: 50, backgroundColor: "#589158"}}>
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
                        Ajout d'une nouvelle adresse
                    </Typography>
                    <Stack spacing={1}>
                        <Input placeholder={"Nom"} type={"text"}  onChange={(e) => setPlace({...place, name: e.target.value})}/>
                        <Input placeholder={"Latitude"} type={"number"}  onChange={(e) => setPlace({...place, coordinates: {...place.coordinates, lat: e.target.value}})}/>
                        <Input placeholder={"Longitude"} type={"number"} onChange={(e) => setPlace({...place, coordinates: {...place.coordinates, lng: e.target.value}})}/>
                        {/*Type of place radio group*/}
                        <FormControl>
                            <Stack my={2}>
                                <FormLabel>Type</FormLabel>
                                <RadioGroup  name="radio-buttons-group " onChange={(e) => setPlace({...place, type: e.target.value})}>
                                    <Radio value="restaurant" label="Restaurant" variant="outlined" />
                                    <Radio value="bar" label="Bar" variant="outlined" />
                                    <Radio value="fast-food" label="Fast-food" variant="outlined" />
                                </RadioGroup>
                            </Stack>
                        </FormControl>

                        <Rating value={place.rating} onChange={(e) => setPlace({...place, rating: e.target.value})}/>

                        <Button  color={"success"} onClick={addPlaceToDb}>
                            Ajouter
                        </Button>
                    </Stack>

                </Sheet>
            </Modal>
        </Box>
    )
}

export default AddFood