import {Box} from "@mui/joy";


const Burger = ({ open,  setOpen}) => {


    const styleLine1 = {
        transform: open ? 'rotate(45deg)' : 'rotate(0)',
        marginBottom: open ? '6px' : '7px',
        backgroundColor: open ? '#fff' : '#333',
    }

    const styleLine2 = {
        opacity: open ? '0' : '1',
        transform: open ? 'translateX(20px)' : 'translateX(0)',

    }

    const styleLine3 = {
        transform: open ? 'rotate(-45deg)' : 'rotate(0)',
        marginTop: '7px',
        backgroundColor: open ? '#fff' : '#333',
    }


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            width: '2rem',
            height: '2rem',
            position: 'fixed',
            top: '15px',
            right: '20px',
            zIndex: 20,
            '@media screen and (max-width: 768px)': {
                display: 'flex',
            },
            div: {
                width: '2rem',
                height: '0.25rem',
                backgroundColor: '#333',
                borderRadius: '10px',
                transformOrigin: '1px',
                transition: 'all 0.3s linear',
            }

        }} onClick={() => setOpen(!open)}>
        <div style={styleLine1} />
        <div style={styleLine2} />
        <div style={styleLine3} />
        </Box>
    );
}

export default Burger;