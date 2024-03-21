import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography, IconButton, InputAdornment, Snackbar } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Formik, Form, Field } from 'formik'

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleVerificationSuccess = (id, email) => {
        setSnackbarOpen(true);
        setTimeout(() => {
            navigate('/verifyotp', { state: { id: id, email: email } });
        }, 1000); 
    };

    const handleSubmit = async (values) => {
        try {
            const response = await fetch(`http://localhost:8081/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            });
            const res = await response.json();
            if (res.success) {
                handleVerificationSuccess(res.id, res.email);
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
                autoHideDuration={1000} 
                onClose={handleSnackbarClose}
                message="OTP sent. Check your email"
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
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Create your account
                </Typography>
                <Formik
                    initialValues={{
                        username: '',
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
                            type="text"
                            name="username"
                            label="Name"
                            variant='outlined'
                            color="success"
                            required
                            fullWidth
                        />
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
                        Have an Account?&nbsp;
                    </Typography>
                    <Typography
                        variant="body1"
                        component="a"
                        href="/" 
                        sx={{
                            display: 'inline',
                            color: 'inherit', 
                            '&:hover': {
                                textDecoration: 'underline',
                                color: 'green', 
                            },
                        }}
                    >
                        LOGIN
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}

export default Signup;