import {Box, Button, List, ListItem, Stack, Typography, Sheet} from "@mui/joy";
import {useEffect, useState} from "react";
import Rating from "../Rating.jsx";
import {XSquare} from "lucide-react";

const ListView = ({ foods, handleRestaurantClick, selectedRestaurant, dispatch }) => {
    const [isPhone, setIsPhone] = useState(false);

    const listItemStyle = {
        width: '100%',
        height: '100%',
        maxHeight: '5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '0.4rem',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
            backgroundColor: '#e5e5e5',
        },
        "@media (max-width: 600px)": {
            height: '5rem',
            width: '85%',
        }
    }

    const listStyle = {
        width: '100%',
        height: '300px',
        "@media (max-width: 600px)": {
            height: '100%',
            width: '100%',
            overflowY: 'scroll',
            overflowX: 'hidden',
            padding: '0',
            //backgroundColor: "red",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '5rem',

        }
    }

    const selectedListItemStyle = {
        ...listItemStyle,
        backgroundColor: '#e5e5e5',

    }

    const typographyStyle = {
        color: '#25252d',
        fontWeight: '600',
        width: "70%",
        "@media (max-width: 600px)": {
            fontSize: '1rem',
        }
    }


    useEffect(() => {
        console.log(foods)
        if (window.innerWidth < 600) {
            setIsPhone(true);
        }

    },[]);


    const removePlace = (restaurant) => {
        //fetch(`http://localhost:3000/places/${restaurant.properties.id}`, {
        fetch(`https://noice-bengregory.herokuapp.com/places/${restaurant.properties.id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.status === 200) {
                console.log("ok")
                dispatch({ type: "REMOVE_FOOD", restaurant });
            }
        }).catch((error) => {
            console.log(error)
        })
    }


    return (
        <Box sx={{
            margin: 5,
            "@media (max-width: 600px)": {
                maxHeight: "300px",
                width: "100%",
                margin: "10px 0",
            }

        }}>
            <List sx={listStyle}>
                {foods.map((food, id) => (
                    <Sheet key={id} variant={"outlined"} sx={
                                selectedRestaurant && selectedRestaurant.geometry.coordinates[0] === food.geometry.coordinates[0] && selectedRestaurant.geometry.coordinates[1] === food.geometry.coordinates[1] ?
                                    selectedListItemStyle : listItemStyle}>

                        <ListItem key={food.id}  sx={{
                            width: "70%",
                            height: '100%',
                            padding: 2.5,
                        }} onClick={() => handleRestaurantClick(food)}>
                            <Stack direction={isPhone ? "column" : "row"}>
                                <Typography level={"body1"} fontSize={"1.2rem"} sx={typographyStyle}>
                                    {food.properties.description}
                                </Typography>
                                <Rating value={food.properties.rating} />
                            </Stack>

                        </ListItem>



                        <Button size={
                            isPhone ? "sm" : "md"
                        } variant={"outlined"} color={"danger"} onClick={()=>removePlace(food)}>
                            <XSquare size={isPhone ? 16 : 24} />
                        </Button>
                    </Sheet>


                ))}
            </List>
        </Box>
    );
}

export default ListView;