import Burger from "./Burger.jsx";
import {Box, Button, Divider, List, ListItem, Stack, Typography} from "@mui/joy";
import {useEffect, useState} from "react";
import MovieIcon from '@mui/icons-material/Movie';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Menu = ({open, setOpen}) => {


    //style of the drawer menu
    // it should slide from the right

    useEffect(() => {
        if(open){
            document.body.style.overflow = "hidden";
        }else{
            document.body.style.overflow = "unset";
        }
    })

    const styleMenu = {
        position: 'fixed',
        top: 0,
        right: 0,
        background: "#25252d",
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        height: '100vh',
        width: "300px",
        transition : 'transform 0.3s ease-in-out',
        color: "#fff",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 2,
    }
    return (
        <Box sx={styleMenu} id={"menu"}>
            <Typography
                level={"display1"}
                fontSize={"2rem"}
                sx={{
                    color: "#fff",
                }}>
                Menu
            </Typography>
            <Box>
                <List sx={{
                    height: "fit-content",
                }}>
                    <ListItem>
                        <Typography fontSize={"2rem"} sx={{
                            color: "#fff",
                            "&:hover": {
                                color: "#707075",
                            },
                            cursor: 'pointer',
                            transition: 'all 120ms ease-in-out',

                        }}>
                            <Stack direction={"row"} spacing={3} sx={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                            }}>
                                <MovieIcon/>
                                <div>
                                          Films
                                </div>
                            </Stack>

                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography fontSize={"2rem"} sx={{
                            color: "#fff",
                            "&:hover": {
                                color: "#707075",
                            },
                            cursor: 'pointer',
                            transition: 'all 120ms ease-in-out',
                        }}>
                            <Stack direction={"row"} spacing={3} sx={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                            }}>
                                <RestaurantIcon/>
                                <div>
                                    Restaurants
                                </div>
                            </Stack>
                        </Typography>
                    </ListItem>


                </List>
            </Box>


        </Box>
    )
}

export default Menu;