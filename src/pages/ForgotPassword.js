import { Box, Button, Divider, FormControl, FormLabel, styled, TextField, Typography } from '@mui/material';
import MuiCard from '@mui/material/Card';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ApiManager from '../ApiManager/ApiManager';
import Notification from '../Component/Notification';
import FormContainer from '../Component/FormContainer';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));


export default function SignUp(props) {
    const [email, setEmail] = useState('');
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [message, setMessage] = useState('')
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (emailError) {
            return;
        }
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        setEmail(email);
        const param = `?email=${email}`;
        try {
            const res = await ApiManager.forgotPassword(param);
            setMessage(res);
            setEmailSubmitted(true);
        } catch (error) {
            setError(error.error || 'Failed to Login, try again');
            setEmailSubmitted(false);
            console.error('Error:', error);
        }

    };


    const validateInputs = () => {
        const email = document.getElementById('email');

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        return isValid;
    };

    return (
        // <AppTheme {...props}>
        <div>
            <Notification message={message} setMessage={setMessage} error={error} setError={setError} />
            <FormContainer direction="column" justifyContent="space-between">
                {/* <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} /> */}
                <Card variant="outlined">
                    {/* <SitemarkIcon /> */}
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Forgot Password
                    </Typography>
                    {emailSubmitted && ( // If email has been submitted
                        <Typography>
                            An email has been sent to {email} with instructions to reset your password.
                        </Typography>
                    )}
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                error={emailError}
                                helperText={emailErrorMessage}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                autoComplete="email"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={emailError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={validateInputs}
                        >
                            Submit
                        </Button>
                    </Box>

                    <Divider>or</Divider>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography sx={{ textAlign: 'center' }}>
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                variant="body2"
                                sx={{ alignSelf: 'center' }}
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </FormContainer>
        </div>
        // </AppTheme>
    );
}