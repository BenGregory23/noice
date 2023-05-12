import {
    Stack,
    Box,
    RadioGroup,
    Radio, FormControl
} from "@mui/joy";
import Map from "./Map.jsx";
import ListView from "./ListView.jsx";
import { useEffect, useReducer, useState } from "react";
import Loader from "../Loader.jsx";
import AddFood from "./AddFood.jsx";
import { Beer, Utensils, Orbit, Pizza } from 'lucide-react';


// Define the foodReducer function
function foodReducer(state, action) {
    switch (action.type) {
        case "SELECT_RESTAURANT":
            return { ...state, selectedRestaurant: action.restaurant };
        case "MAP_LOADED":
            return { ...state, mapLoaded: true, map: action.map };
        case "ADD_FOOD":
            return { ...state, foods: [...state.foods, action.place] };
        case "REMOVE_FOOD":
            const newFoods = state.foods.filter((food) => food.properties.id !== action.restaurant.properties.id);
            return { ...state, foods: newFoods };
        case "ADD_FOODS":
            return { ...state, foods: action.foods };
        case "SET_DATA_LOADED":
            return { ...state, dataLoaded: action.dataLoaded };
        default:
            return state;
    }
}

const createFeatureFromPlace = (place) => {
    return {
        type: "Feature",
        properties: {
            description: place.name,
            icon: place.type,
            id: place._id,
            rating : place.rating
        },
        geometry: {
            type: "Point",
            coordinates: [place.coordinates.lng, place.coordinates.lat]
        },
    };
}



const Food = ({ food, mode }) => {
    const [filter, setFilter] = useState("tout");
    const [isPhone, setIsPhone] = useState(false);

    // Initialize the state with the selectedRestaurant property
    const [state, dispatch] = useReducer(foodReducer, {
        selectedRestaurant: null,
        mapLoaded: false,
        foods: [],
        dataLoaded: false,
    });

    useEffect(() => {
        if (window.innerWidth < 600) {
            setIsPhone(true);
        }

        if (!state.dataLoaded) {
            console.log("fetching data");
             // fetch("http://localhost:3000/places")
            fetch("https://noice-bengregory.herokuapp.com/places")
                .then((response) => response.json())
                .then((data) => {
                    let features = [];

                    for (let i in data) {
                        features.push(createFeatureFromPlace(data[i]));
                    }
                    // Dispatch the action to update the foods in the reducer
                    dispatch({ type: "ADD_FOODS", foods: features });
                    // Dispatch the action to update the dataLoaded in the reducer
                    dispatch({ type: "SET_DATA_LOADED", dataLoaded: true });
                });
        }
    }, [state.dataLoaded, dispatch]); // Add 'dispatch' to the dependency array



    // Define the filteredFoods constant here, after state is initialized
    const filteredFoods = state.foods.filter((food) => {
        if (filter === "tout") {
            return true;
        } else {
            return food.properties.icon === filter;
        }
    });

    // Define the handleRestaurantClick function to dispatch the SELECT_RESTAURANT action
    function handleRestaurantClick(restaurant) {
        dispatch({ type: "SELECT_RESTAURANT", restaurant });
    }



    return (
        <Stack
            direction={isPhone ? "column" : "row"}
            sx={{
                width: "100%",
                height: "90vh",
                display: "flex",
                "@media (max-width: 600px)": {
                    height: "100%",
                    flexDirection: "column-reverse",
                    alignItems: "center",
                },
                maxHeight: "90vh",
                
            }}
        >

                {state.mapLoaded && state.dataLoaded ? null : <Loader />}


            <Stack
                sx={{
                    width: "50%",
                    height: "100%",
                    justifyContent: "space-between",
                    "@media (max-width: 600px)": {
                        width: "100vw",
                        height: "65%",
                    }
                }}
            >
                {/* Pass the handleRestaurantClick function to the ListView component */}
                <ListView  mode={mode} dispatch={dispatch} foods={filteredFoods} handleRestaurantClick={handleRestaurantClick} selectedRestaurant={state.selectedRestaurant} />
                <Stack
                    direction={"row"}
                    spacing={2}
                    sx={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "20%",
                        "@media (max-width: 600px)": {
                            position : "fixed",
                            bottom : 0,
                            width : "100vw",
                            backgroundColor : "white",
                            height : "10%",
                            borderTop : "1px solid #e0e0e0",

                        }
                    }}
                >
                    <FormControl>
                        <RadioGroup
                            orientation="horizontal"
                            aria-labelledby="segmented-controls-example"
                            name="justify"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            sx={{
                                minHeight: 42,
                                padding: '4px',
                                borderRadius: 'md',
                                bgcolor: 'neutral.softBg',
                                '--RadioGroup-gap': '4px',
                                '--Radio-actionRadius': '8px',
                            }}
                        >
                            {["tout", 'restaurant','bar', 'fast-food' ].map((item) => (
                                <Radio
                                    key={item}
                                    color="neutral"
                                    value={item}
                                    label={

                                        <Box>
                                            {item === "tout" ? <Orbit /> : null}
                                            {item === "restaurant" ? <Utensils /> : null}
                                            {item === "bar" ? <Beer /> : null}
                                            {item === "fast-food" ? <Pizza /> : null}
                                        </Box>
                                    }
                                    disableIcon
                                    variant="plain"
                                    sx={{
                                        px: 2,
                                        alignItems: 'center',
                                    }}
                                    slotProps={{
                                        action: ({ checked }) => ({
                                            sx: {
                                                ...(checked && {
                                                    bgcolor: 'background.surface',
                                                    boxShadow: 'md',
                                                    '&:hover': {
                                                        bgcolor: 'background.surface',
                                                    },
                                                }),
                                            },
                                        }),
                                    }}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <AddFood dispatch={dispatch} />
                </Stack>
            </Stack>

            {/* Pass the selectedRestaurant property and the dispatch function to the Map component */}
            {
                state.dataLoaded ?  <Map mode={mode} selectedRestaurant={state.selectedRestaurant} dispatch={dispatch} foods={state.foods} />
                    : null
            }



        </Stack>
    );
};

export default Food;
