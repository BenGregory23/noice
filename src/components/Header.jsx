import { Box, Stack, Typography, Button } from "@mui/joy";
import Menu from "./Menu.jsx";
import Burger from "./Burger.jsx";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../src/css/textAnimation.css";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';



const Header = ({setMode, mode}) => {
    const [open, setOpen] = useState(false);
    const location = useLocation(); // use the useLocation hook to get the current location
    

    useEffect(() => {
        

    }, [location]); // re-run the effect whenever the location object changes

    return (
        <Box sx={{ height: "10vh", zIndex: 100000}}>
            <Stack direction={"row"} spacing={2}
                     sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                     }}
            >
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <Typography
                        level={"display1"}
                        m={2}
                        fontSize={"2rem"}
                        sx={{
                            color: mode === "light" ? "#25252d" : "#ffffff",
                            "&:hover": {
                                color: "#707075",
                            },
                            cursor: "pointer",
                            transition: "all 0.2s ease-in-out",
                        }}
                        className={"trackedTitle"}
                        key={location.pathname} // add a key prop with the pathname to force a re-render on route changes
                    >
                        Noice.
                    </Typography>
                </Link>
                <Button onClick={() => {
                    setMode(mode === 'dark' ? 'light' : 'dark')
                    
                    }} variant="contained">
                    {mode === 'dark' ? <Brightness4Icon sx={{color: "white"}}/> : <Brightness7Icon/>}
              

                </Button>
            </Stack>
            {/*<Burger open={open} setOpen={setOpen}/>*/}
            {/*<Menu open={open} setOpen={setOpen}/>*/}
                  
                
                
           
        </Box>
    );
};

export default Header;
