import {AppBar, Button, Container, Grid, styled, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit'
    },
});



const AppToolbar = () => {

    return (
        <AppBar position="sticky" sx={{mb: 2}}>
            <Toolbar>
                <Container maxWidth="xl">
                    <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            <Link to="/">Cocktails Menu</Link>
                        </Typography>
                        <Button component={NavLink} to='/register' color='inherit'>Sign Up</Button>
                        <Button component={NavLink} to='/login' color='inherit'>Sign Ip</Button>
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    );
};



export default AppToolbar;
