import React from 'react';
import {Link} from 'react-router-dom'
import * as yup from "yup";
import {FormikProps, useFormik} from "formik";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Layout from "../layout/Layout";
import {EmailControl, PasswordControl, TextInput, ConfirmPassword, Title} from '../../components'
import {useAppDispatch} from "../../store";
import {signUp} from "../../services/auth.service";

const SignUpPage = React.memo(() => {

    const dispatch = useAppDispatch()

    interface Values {
        username: string,
        email: string,
        password: string,
        confirm: string
    }

    const validationSchema = yup.object().shape({
        username: yup.string().trim().required('Введите ваше имя').min(3, 'Минимум три символа'),
        email: yup.string().trim().email('Введите корректный email').required('Введите email'),
        password: yup.string().trim().required('Введите пароль').min(3, 'Минимум три символа'),
        confirm: yup.string().trim().test('passwords-match', 'Пароли не совпадают', function(value){
            return this.parent.password === value
        })
    })

    const submitHandler = async (values: Values) => {
        const {username, email, password} = values
        const data = {
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password: password.trim()
        }
        dispatch(signUp({ ...data }))
    };

    const {values, handleChange, handleSubmit, errors, isSubmitting, touched}: FormikProps<Values> =
        useFormik<Values>({
            initialValues: {
                username: '',
                email: '',
                password: '',
                confirm: ''
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
                    alignItems: 'center'
            }}>
                <Box sx={{ maxWidth: '460px', width: '100%' }}>
                    <Title>Регистрация</Title>
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            value={values.username}
                            name="username"
                            onChange={(event) => handleChange(event)}
                            error={errors.username || ''}
                            showError={!!errors.username && (touched.username === undefined ? false : touched.username)}
                            label="Имя"
                            id="username"
                            autoFocus={true} />

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

                        <ConfirmPassword
                            value={values.confirm}
                            onChange={(event) => handleChange(event)}
                            error={errors.confirm || ''}
                            showError={!!errors.confirm && (touched.confirm === undefined ? false : touched.confirm)} />

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            Зарегистрироваться
                        </Button>

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login">
                                    Уже есть аккаунт
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </Layout>
    );
})

export default SignUpPage;