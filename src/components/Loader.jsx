import {Box} from "@mui/joy";



const Loader = () => {

    const styles = {
        loader: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        
    
        },
        page: {
    
            height: '100vh',
            width: '100vw',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 100000,
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }


    return(
        <Box sx={styles.page}>
            <div className="loader">
            </div>
        </Box>
    )
}

export default Loader