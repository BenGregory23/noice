import { Button, Box, Modal, Sheet, ModalClose, Typography, Stack, RadioGroup, FormControl, FormLabel, Radio, Input } from '@mui/joy';
import { Pen } from 'lucide-react';
import React, {useEffect, useState} from 'react';


const createFeatureFromPlace = (place) => {
   
    return {
        type: "Feature",
        properties: {
            description: place.name,
            id: place.id,
            icon: place.type
        },
        geometry: {
            type: "Point",
            coordinates: [place.coordinates.lng, place.coordinates.lat]
        },
    };
}

const EditFood = (props) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
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
    

    useEffect(() => {

        const newPlace = {
            id: props.food.properties.id,
            name: props.food.properties.description,
            type: props.food.properties.icon,
            rating: props.food.properties.rating,
            coordinates: {
                lat: props.food.geometry.coordinates[1],
                lng: props.food.geometry.coordinates[0],
            },
        }
        setPlace(newPlace);
      
    }, [props.food])


    const editPlaceToDb = () => {
        console.log(place.coordinates.lng)
       
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

        // edit place in map
        const feature = createFeatureFromPlace(dbObject);
        console.log("Feature",feature);
        props.dispatch({ type: "EDIT_FOOD", payload: feature });

       
        fetch("https://noice-bengregory.herokuapp.com/places/" + place.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dbObject),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setEditModalOpen(false);
            })
            .catch((error) => {
                console.log(error);
            });
            

        

    }

    return (
        <Box>
            <Button 
            variant={"contained"}
            onClick={() => setEditModalOpen(true)}>
                <Pen  size={24}/>
            </Button>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
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
                        Modification
                    </Typography>
                    <Stack spacing={1}>
                        <Input  type={"text"} defaultValue={place.name} onChange={(e) => setPlace({...place, name: e.target.value})}/>
                        <Input  type={"number"} defaultValue={place.coordinates.lat} onChange={(e) => setPlace({...place, coordinates: {...place.coordinates, lat: e.target.value}})}/>
                        <Input  type={"number"} defaultValue={place.coordinates.lng} onChange={(e) => setPlace({...place, coordinates: {...place.coordinates, lng: e.target.value}})}/>
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

 
                        <Button  color={"success"} onClick={() => editPlaceToDb()}>
                            Valider
                        </Button>
                    </Stack>
                    

                </Sheet>
            </Modal>
        </Box>

    )

}

export default EditFood;