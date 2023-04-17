import {Box, Button, Stack} from "@mui/joy";


const Filters = ({ filters, setFilters }) => {

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFilters({ ...filters, [name]: value });

    };

    return (
        <Box>

            <Stack direction={"row"} spacing={2}>
                <Button variant={"solid"}>Filtrer</Button>
                <Button variant={"soft"}>Enlever les filtres</Button>
            </Stack>


        </Box>
    )
}

export default Filters;