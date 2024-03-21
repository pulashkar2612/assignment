import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography, IconButton, InputAdornment, Snackbar } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Formik, Form, Field } from 'formik'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleVerificationSuccess = (res) => {
        setSnackbarOpen(true);
        setTimeout(() => {
            localStorage.setItem("token", res.token);
            localStorage.setItem("refreshToken", res.refreshToken,);
            localStorage.setItem("user", res.username);
            localStorage.setItem("id", res.id);
            if (res.checkedProducts) {
                localStorage.setItem("checkedProducts", JSON.stringify(res.checkedProducts));
            }
            navigate('/home');
        }, 1000); // Adjust the duration as needed
    };

    const handleSubmit = async (values) => {
        try {
            const response = await fetch(`http://localhost:8081/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email : values.email, password: btoa(values.password)})
            });
            const res = await response.json();
            if (res.success) {
                handleVerificationSuccess(res);
            } else {
                console.log(res);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <Container component="main" maxWidth="xs"
            sx={{
                border: '1px solid black',
                borderRadius: '8px',
                mt: 6
            }}>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={1000} // Adjust the duration as needed
                onClose={handleSnackbarClose}
                message="User Logged In !"
            />
            <Box
                sx={{
                    mt: 4,
                    mb: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Login
                </Typography>
                <Box sx={{ width: '100%', mt: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Welcome back to ECOMMERCE
                    </Typography>
                </Box>
                <Box sx={{ width: '100%', mt: 1, mb: 2 }}>
                    <Typography variant="h7">
                        The next gen business marketplace
                    </Typography>
                </Box>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    //validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            handleSubmit(values);
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    <Form>
                        <Field
                            as={TextField}
                            margin="normal"
                            type="email"
                            name="email"
                            label="Email"
                            variant='outlined'
                            color="success"
                            required
                            fullWidth
                        />
                        <Field
                            as={TextField}
                            margin="normal"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            label="Password"
                            variant='outlined'
                            color="success"
                            required
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            type="submit"
                            variant='contained'
                            color="success"
                            fullWidth
                            size="large"
                            sx={{ mt: 2, mb: 1 }}
                        >
                            CREATE ACCOUNT
                        </Button>
                    </Form>
                </Formik>
                <Box sx={{ width: '100%', mt: 2, mb: 1 }}>
                    <Typography variant="body1" sx={{ display: 'inline' }}>
                        Don't an Account?&nbsp;
                    </Typography>
                    <Typography
                        variant="body1"
                        component="a"
                        href="/signup"
                        sx={{
                            display: 'inline',
                            color: 'inherit',
                            '&:hover': {
                                textDecoration: 'underline',
                                color: 'green',
                            },
                        }}
                    >
                        SIGN UP
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;