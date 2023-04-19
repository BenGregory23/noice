import {StarIcon} from "lucide-react";
import {Box} from "@mui/joy";

// Value goes from 0 to 5
const Rating = ({value, onChange}) => {

    return(
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            borderRadius: '5px',
            cursor: 'pointer',
        }}>
            {
                [0, 1, 2, 3, 4].map((i) => {
                    return (
                        <Box sx={{
                            width: '1rem',
                            height: '1rem',
                            margin: '0.5rem',
                        }}>
                            {
                                i < value ? <StarIcon onClick={ () => onChange(i + 1)} /> : <StarIcon onClick={ () => onChange(i + 1)} />

                            }
                        </Box>
                    )
                })
            }
        </Box>
    )
}

export default Rating