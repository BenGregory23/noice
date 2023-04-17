import { Stack, List, ListItem, Button } from "@mui/joy";
import Map from "./Map.jsx";
import ListView from "./ListView.jsx";
import { useEffect, useReducer, useState } from "react";

// Define the foodReducer function
function foodReducer(state, action) {
    switch (action.type) {
        case "SELECT_RESTAURANT":
            console.log("FOOD");
            console.log(action.restaurant);
            return { ...state, selectedRestaurant: action.restaurant };
        default:
            return state;
    }
}

const Food = ({ food }) => {
    const [foods, setFoods] = useState(
            [
                {
                    type: "Feature",
                    properties: {
                        description: "L'oustagou",
                        icon: "theatre",
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [3.087, 45.7772],
                    },
                },
                {
                    type: "Feature",
                    properties: {
                        description: "Le devant",
                        icon: "bar",
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [3.0869, 45.7775],
                    },
                },
                {
                    type: "Feature",
                    properties: {
                        description: "Fresh Burritos",
                        icon: "art-gallery",
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [3.0839, 45.7767],
                    },
                },
            ]);

    const [isPhone, setIsPhone] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 600) {
            setIsPhone(true);
        }
    });

    // Initialize the state with the selectedRestaurant property
    const [state, dispatch] = useReducer(foodReducer, {
        selectedRestaurant: null,
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
                height: "100%",
            }}
        >
            <Stack
                sx={{
                    width: "50%",
                    height: "100%",
                    justifyContent: "space-between",
                }}
            >
                {/* Pass the handleRestaurantClick function to the ListView component */}
                <ListView foods={foods} handleRestaurantClick={handleRestaurantClick} selectedRestaurant={state.selectedRestaurant} />
                <Stack
                    direction={"row"}
                    sx={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "20%",
                    }}
                >
                    <Button color={"success"}>Ajouter un endroit</Button>
                </Stack>
            </Stack>

            {/* Pass the selectedRestaurant property and the dispatch function to the Map component */}
            <Map selectedRestaurant={state.selectedRestaurant} dispatch={dispatch} foods={foods} />
        </Stack>
    );
};

export default Food;
