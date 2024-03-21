import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Grid, Container, TextField, Typography , Snackbar} from '@mui/material';
import { Formik, Form, Field } from 'formik'

const VerifyOTP = () => {
    const data = { v0: '', v1: '', v2: '', v3: '', v4: '', v5: '', v6: '', v7: '' }
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state.id;
    const email = location.state.email;
    const inputRefs = useRef([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState(null);

    const focusNextInput = index => {
        if (inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const focusPrevInput = index => {
        if (inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && !e.target.value) {
            e.preventDefault();
            focusPrevInput(index);
        }
    };

    useEffect(() => {
        inputRefs.current[0].focus(); 
    }, []);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleVerificationSuccess = (id) => {
        setSnackbarOpen(true);
        setSnackBarMessage("User verified! Redirecting shortly to login Page!")
        setTimeout(() => {
            navigate('/');
        }, 1000); 
    };

    const handleSubmit = async (values) => {
        try {
            console.log(values);
            const otp = Object.values(values).join('');
            if (otp.length === 8) {
                const response = await fetch(`http://localhost:8081/verifyOtp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        otp: Number(otp),
                        id: id
                    })
                });
                const res = await response.json();
                if (res.success) {
                    handleVerificationSuccess();
                } else {
                    console.log(res);
                    setSnackbarOpen(true);
                    setSnackBarMessage(res.errorMessage);
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <Container component="main" maxWidth="sm"
            sx={{
                border: '1px solid black',
                borderRadius: '8px',
                mt: 6
            }}>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={1000} 
                onClose={handleSnackbarClose}
                message={snackBarMessage}
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
                    Verify your email
                </Typography>
                <Typography variant="h7" sx={{ fontWeight: 'bold', mt: 2, mb: 4 }}>
                    Enter the 8 digit code you received on your email id : {email}
                </Typography>
                <Formik
                    initialValues={data}
                    //validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setTimeout(() => {
                            handleSubmit(values);
                            resetForm();
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    <Form>
                        <Grid container spacing={2}>
                            {Object.keys(data).map((boxval, index) => (
                                <Grid item xs={1.5} >
                                    <Field
                                        as={TextField}
                                        type="text"
                                        name={boxval}
                                        variant="outlined"
                                        required
                                        inputProps={{
                                            maxLength: 1,
                                            ref: el => (inputRefs.current[index] = el),
                                            onKeyDown: e => handleKeyDown(e, index),
                                            onChange: e => {
                                                const value = e.target.value;
                                                if (value.length === 1) {
                                                    focusNextInput(index);
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                            ))}

                        </Grid>
                        <Button
                            type="submit"
                            variant='contained'
                            color="success"
                            fullWidth
                            size="large"
                            sx={{ mt: 4, mb: 2 }}
                        >
                            VERIFY
                        </Button>
                    </Form>
                </Formik>
            </Box>
        </Container>
    );
}

export default VerifyOTP;