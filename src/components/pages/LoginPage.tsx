import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {FormikProps, useFormik} from 'formik'
import * as yup from "yup"
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {default as  MuiLink} from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Layout from "../layout/Layout";
import {Title, EmailControl, PasswordControl} from '../../components'
import {login} from "../../services/auth.service";
import {useAppDispatch} from "../../store";
import {useActions} from "../../hooks/useActions";

const LoginPage = React.memo(() => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    interface Values {
        email: string,
        password: string
    }

    const validationSchema = yup.object().shape({
        email: yup.string().trim().email('Введите корректный email').required('Введите email'),
        password: yup.string().trim().required('Введите пароль').min(3, 'Введите минимум три символа')
    })

    const submitHandler = (values: Values) => {
        const {email, password} = values
        const data = {
            email: email.trim().toLowerCase(),
            password: password.trim()
        }
        dispatch(login(data))
    };

    const {values, handleChange, handleSubmit, errors, isSubmitting, touched}: FormikProps<Values> =
        useFormik<Values>({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: submitHandler,
    })

    return (
        <Layout>
            <Box sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Box sx={{
                    maxWidth: '460px',
                    width: '100%'
                }}>
                    <Title>Вход</Title>
                    <form onSubmit={handleSubmit}>
                        <EmailControl
                            value={values.email}
                            onChange={(event) => handleChange(event)}
                            error={errors.email || ''}
                            showError={!!errors.email && (touched.email === undefined ? false : touched.email)} />

                        <PasswordControl
                            value={values.password}
                            onChange={(event) => handleChange(event)}
                            error={errors.password || ''}
                            showError={!!errors.password && (touched.password === undefined ? false : touched.password)} />

                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Запомнить меня" />

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            Вход
                        </Button>

                        <Grid container>
                            <Grid item xs>
                                <MuiLink href="#" variant="body2">
                                    Забыли пароль?
                                </MuiLink>
                            </Grid>
                            <Grid item>
                                <Link to="/signup">
                                    Зарегистрироваться
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </Layout>
    );
})

export default LoginPage

