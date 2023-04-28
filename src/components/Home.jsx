import {Box, Stack, Typography} from "@mui/joy";
import {Link} from "react-router-dom";
import "../../src/css/textAnimation.css"

const Home = () => {


    const beforeCssFood = {
        "content": "\"FOOD\"",
        "position": "absolute",
        "color": "#589158",
        "top": "0",
        "left": "0",
        "width": "0%",
        "overflow": "hidden",
        "transition": "all 0.5s"
    }

    const beforeCssMovies = {
        "content": "\"MOVIES\"",
        "position": "absolute",
        "color": "#589158",
        "top": "0",
        "left": "0",
        "width": "0%",
        "overflow": "hidden",
        "transition": "all 0.5s"
    }

    const hoverCss = {
        width:"100%",
    }



    return (
        <Box sx={{
            width: '100%',
            height: '90vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textDecoration: 'none',
            "@media screen and (max-width: 768px)": {
                height: '80vh',

            }
        }}>
            <Stack spacing={2}
                   direction={"column"}
                   sx={{
                       flexWrap: 'wrap',
                       justifyContent: 'center',
                       alignItems: 'center',

                   }}>

                <Link to={"/food"} style={{textDecoration: 'none'}}>
                    <Typography level={"display1"} fontSize={"15rem"} sx={{
                        textDecoration: 'none',
                        "margin": "0",
                        "padding": "0",
                        "text-transform": "uppercase",
                        "position": "relative",
                        "color": "#25252d",
                        "&:before": beforeCssFood,
                        "&:hover:before": hoverCss,
                        "@media screen and (max-width: 768px)": {
                            fontSize: "5rem",
                        },
                        userSelect: 'none',
                    }}
                        className={"trackedText"}
                    >
                            FOOD
                    </Typography>
                </Link>
                <Link to={"/movies"} style={{textDecoration: 'none'}}>
                    <Typography level={"display1"} fontSize={"15rem"} sx={{
                        textDecoration: 'none',
                        "margin": "0",
                        "padding": "0",
                        "text-transform": "uppercase",
                        "position": "relative",
                        "color": "#25252d",
                        "&:before": beforeCssMovies,
                        "&:hover:before": hoverCss,
                        "@media screen and (max-width: 768px)": {
                            fontSize: "5rem",
                        },
                        userSelect: 'none',
                    }}
                                className={"trackedText"}
                    >
                             MOVIES
                    </Typography>
                </Link>
            </Stack>
        </Box>
    );
}

export default Home;