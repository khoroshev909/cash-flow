import React from 'react';
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {default as MuiLink} from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Layout from "../layout/Layout";
import {Title} from '../../components'

const SignUpPage = () => {

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Layout>
            <Box
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Box sx={{
                    maxWidth: '460px'
                }}>
                    <Title>Регистрация</Title>
                    <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 1 }} >
                        <TextField
                            margin="normal"
                            autoComplete="username"
                            name="username"
                            fullWidth
                            id="username"
                            label="Имя"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Зарегистрироваться
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login">
                                    Уже есть аккаунт
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
};

export default SignUpPage;