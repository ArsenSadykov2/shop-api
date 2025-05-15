import {Box, CircularProgress} from '@mui/material'

const Spinner = () => {
    return (
        <div>
            <Box style={{textAlign: "center"}}>
                <CircularProgress color="inherit" />
            </Box>
        </div>
    );
};

export default Spinner;