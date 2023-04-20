import React from 'react'
import {Box, Typography, Button} from "@mui/joy";
import {Link} from "react-router-dom";


const NotFound = () => {
    return (
        <Box sx={{
            width: '100%',
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Typography variant={"h1"}
                        sx={{
                            fontSize: '10rem',
                            color: '#589158',
                            fontWeight: 'bold',
                            "@media (max-width: 600px)": {
                                fontSize: '5rem',
                            }
                        }}
            
            >404</Typography>
            <Typography variant={"h1"}
                        sx={{   
                            marginTop: '-5rem',
                            fontSize: '5rem',
                            color: '#589158',
                            fontWeight: 'bold',
                            "@media (max-width: 600px)": {
                                marginTop: '-2rem',
                                fontSize: '3rem',
                            }
                        }}
            >Not Found</Typography>
            <Button 
                variant='contained'
                sx={{
                    color : 'black',
                  
                }}
                >

                <Link to={"/"} style={{textDecoration: 'none'}}>
                    Retour
                </Link>
                
            </Button>
        </Box>
    )
}

export default NotFound