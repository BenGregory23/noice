import {Box, Button, List, ListItem, Stack, Typography, Sheet} from "@mui/joy";
import {useEffect, useState} from "react";
import {XSquare} from "lucide-react";
import { Beer, Utensils, Orbit, Pizza } from 'lucide-react';
import EditFood from "./EditFood.jsx";

const ListView = ({ foods, handleRestaurantClick, selectedRestaurant, dispatch, mode }) => {
    const [isPhone, setIsPhone] = useState(false);

    const listItemStyle = {
        width: '100%',
        height: '100%',
        maxHeight: '5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mode === "light" ? '#ffffff' : "black",
        borderRadius: '5px',
        borderColor: mode === "light" ? '#e5e5e5' : "#25252d",
        color : mode === "light" ? 'black' : "white",
        cursor: 'pointer',
        marginBottom: '0.4rem',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
            backgroundColor: mode === "light" ? '#e5e5e5' : "#25252d",
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
            height: '110%',
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
        backgroundColor: mode === "light" ? '#e5e5e5' : "#25252d",
    }

    const typographyStyle = {
        color: mode === "light" ? 'black' : "white",
        fontWeight: '600',
       
        "@media (max-width: 600px)": {
            fontSize: '1rem',
        }
    }

    const iconColor = mode === "light" ? 'black' : "white";


    useEffect(() => {
        
        if (window.innerWidth < 600) {
            setIsPhone(true);
        }
       

    },[selectedRestaurant]);


    const removePlace = (restaurant) => {
       
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
                                selectedRestaurant && selectedRestaurant.properties.id === food.properties.id ?
                                    selectedListItemStyle : listItemStyle}>

                        <ListItem key={food.id}  sx={{
                            width: "70%",
                            height: '100%',
                            padding: 2.5,
                        }} onClick={() => handleRestaurantClick(food)}>
                            <Stack 
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                            
                                }}
                            >
                                <Stack direction={"row"} spacing={3} alignItems={"center"}>
                                {
                                    food.properties.icon === "fast-food" ?
                                        <Pizza color={iconColor} size={isPhone ? 20 : 24} /> :
                                        food.properties.icon === "restaurant" ?
                                            <Utensils color={iconColor} size={isPhone ? 20 : 24} /> :
                                            food.properties.icon === "bar" ?
                                                <Beer color={iconColor} size={isPhone ? 20 : 24} /> :
                                                null

                                }
                                <Typography level={"body1"}  fontSize={"1.2rem"} sx={typographyStyle}>
                                    {food.properties.description}
                                </Typography>
                                </Stack>
                                
                                <Stack direction={"row"} spacing={0}  justifyContent={"space-between"}>
                                    <EditFood food={food} dispatch={dispatch} mode={mode} />
                                    <Button size={isPhone ? "sm" : "md"} 
                                                variant={"contained"}
                                                sx={{
                                                    transition: "all 0.2s ease-in-out",
                                                    color: mode === "light" ? 'black' : "white",
                                                    "&:hover": {
                                                        color: "red",
                                                    },
                                                }} 
                                                onClick={()=>removePlace(food)}
                                    >
                                        <XSquare size={isPhone ? 16 : 24} />
                                    </Button>
                                </Stack>
                                

                            


                               
                            </Stack>

                        </ListItem>
                    </Sheet>


                ))}
            </List>
        </Box>
    );
}

export default ListView;