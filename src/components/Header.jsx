import {Box, Stack, Typography} from "@mui/joy";
import Menu from "./Menu.jsx";
import Burger from "./Burger.jsx";
import React, {useState} from "react";
import {Link} from "react-router-dom";


const Header = () => {

    const [open, setOpen] = useState(false);

    return (
        <Box sx={{
            height: '10vh',
            zIndex: 100000,
        }}>
            <Stack direction={"row"} spacing={2}>
                <Link to={"/"} style={{textDecoration: 'none'}}>
               <Typography level={"display1"} m={2} fontSize={"2rem"} sx={{
                   color: "#25252d",
                   "&:hover": {
                          color: "#707075",
                   },
                     cursor: 'pointer',
                   transition: 'all 0.2s ease-in-out',
               }} >
                     Noice.
                </Typography>
                </Link>
            </Stack>
            {/*<Burger open={open} setOpen={setOpen}/>*/}
            {/*<Menu open={open} setOpen={setOpen}/>*/}
        </Box>
    )
}

export default Header;