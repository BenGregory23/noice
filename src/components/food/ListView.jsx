import {Box, List, ListItem, Typography} from "@mui/joy";
import {useEffect} from "react";

const ListView = ({ foods, handleRestaurantClick, selectedRestaurant }) => {

    const listItemStyle = {
        width: '100%',
        height: '100%',
        minHeight: '5rem',
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
        }
    }

    const selectedListItemStyle = {
        ...listItemStyle,
        backgroundColor: '#e5e5e5',

    }

    const typographyStyle = {
        color: '#25252d',
        fontWeight: '600',
    }

    useEffect(() => {
        console.log("LISTVIEW");
        console.log(selectedRestaurant);
    });

    return (
        <Box sx={{
            margin: 5,
        }}>
            <List>
                {foods.map((food) => (
                   selectedRestaurant && selectedRestaurant.geometry.coordinates[0] === food.geometry.coordinates[0] && selectedRestaurant.geometry.coordinates[1] === food.geometry.coordinates[1] ?
                    <ListItem key={food.id} sx={selectedListItemStyle} onClick={() => handleRestaurantClick(food)}>
                        <Typography level={"body1"} fontSize={"1.2rem"} sx={typographyStyle}>
                            {food.properties.description}
                        </Typography>
                    </ListItem>
                    :
                    <ListItem key={food.id} sx={listItemStyle} onClick={() => handleRestaurantClick(food)}>
                        <Typography level={"body1"} fontSize={"1.2rem"} sx={typographyStyle}>
                            {food.properties.description}
                        </Typography>
                    </ListItem>

                ))}
            </List>
        </Box>
    );
}

export default ListView;