import {useState} from "react";
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {Link, TextField} from "@mui/material";
import type {RegisterMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectRegisterError, selectRegisterLoading} from "./usersSlice.ts";
import {register} from "./usersThunks.ts";


const Register = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const registerLoading = useAppSelector(selectRegisterLoading);
    const navigate = useNavigate();

    const [form, setForm] = useState<RegisterMutation>({
        username: "",
        password: "",
    });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({ ...form, [name]: value });
    };

    const onSubmitFormHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            await dispatch(register(form)).unwrap();
            navigate("/");
        } catch (error){
            console.log(error);
        }
    };

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmitFormHandler} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    {/*<Grid size={{xs: 12}}>*/}
                    {/*    <TextField*/}
                    {/*        autoComplete="given-name"*/}
                    {/*        name="firstName"*/}
                    {/*        required*/}
                    {/*        fullWidth*/}
                    {/*        id="firstName"*/}
                    {/*        label="First Name"*/}
                    {/*        autoFocus*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                    <Grid size={{xs: 12}}>
                        <TextField
                            disabled={registerLoading}
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="family-name"
                            value={form.username}
                            onChange={onInputChange}
                        />
                    </Grid>
                    {/*<Grid size={{xs: 12}}>*/}
                    {/*    <TextField*/}
                    {/*        required*/}
                    {/*        fullWidth*/}
                    {/*        id="email"*/}
                    {/*        label="Email Address"*/}
                    {/*        name="email"*/}
                    {/*        autoComplete="email"*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                    <Grid size={{xs: 12}}>
                        <TextField
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={form.password}
                            onChange={onInputChange}
                        />
                    </Grid>
                </Grid>
                <Button
                    disabled={registerLoading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid>
                        <Link to='/login' variant="body2" component={RouterLink}>
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Register;