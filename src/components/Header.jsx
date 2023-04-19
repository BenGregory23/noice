import { Box, Stack, Typography } from "@mui/joy";
import Menu from "./Menu.jsx";
import Burger from "./Burger.jsx";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../src/css/textAnimation.css";

const Header = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation(); // use the useLocation hook to get the current location

    useEffect(() => {
        // update header based on the location object

    }, [location]); // re-run the effect whenever the location object changes

    return (
        <Box sx={{ height: "10vh", zIndex: 100000 }}>
            <Stack direction={"row"} spacing={2}>
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <Typography
                        level={"display1"}
                        m={2}
                        fontSize={"2rem"}
                        sx={{
                            color: "#25252d",
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
            </Stack>
            {/*<Burger open={open} setOpen={setOpen}/>*/}
            {/*<Menu open={open} setOpen={setOpen}/>*/}
        </Box>
    );
};

export default Header;
