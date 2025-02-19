import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ApiManager from '../ApiManager/ApiManager';
import Notification from '../Component/Notification';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../Component/FormContainer';
// import ForgotPassword from './components/ForgotPassword';
// import AppTheme from '../shared-theme/AppTheme';
// import ColorModeSelect from '../shared-theme/ColorModeSelect';
// import { GoogleIcon, FacebookIcon, SitemarkIcon } from './components/CustomIcons';

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
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [message, setMessage] = useState('')
    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (emailError || passwordError || nameError) {
            return;
        }
        const formData = new FormData(e.currentTarget);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
            name: formData.get('name')
        };
        try {
            await ApiManager.register(data);
            setMessage("Registered Successfully");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            setError(error.error || 'Failed to Register, try again');
            console.error('Error:', error);
        }
    };

    const validateInputs = () => {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');

        let isValid = true;

        if (!name.value || name.value.length < 3) {
            setNameError(true);
            setNameErrorMessage('Name must be at least 3 characters long.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (password.value !== confirmPassword.value) {
            setConfirmPasswordError(true);
            setConfirmPasswordErrorMessage('Passwords do not match.');
            isValid = false;
        } else {
            setConfirmPasswordError(false);
            setConfirmPasswordErrorMessage('');
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
                        Sign Up
                    </Typography>
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
                        <FormControl >
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <TextField
                                error={nameError}
                                helperText={nameErrorMessage}
                                id="name"
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                autoComplete="name"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={nameError ? 'error' : 'primary'}
                            />
                        </FormControl>
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
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
                        <FormControl>
                            <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
                            <TextField
                                error={confirmPasswordError}
                                helperText={confirmPasswordErrorMessage}
                                name="confirm-password"
                                placeholder="••••••"
                                type="password"
                                id="confirm-password"
                                autoComplete="current-password"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={confirmPasswordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={validateInputs}
                        >
                            Sign up
                        </Button>
                    </Box>
                    <Divider>or</Divider>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography sx={{ textAlign: 'center' }}>
                            Already have an account?{' '}
                            <Link
                                href="/login"
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