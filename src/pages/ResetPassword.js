import React, { useState } from 'react';
import Notification from '../Component/Notification';
import { Box, Button, Divider, FormControl, FormLabel, styled, TextField, Typography } from '@mui/material';
import MuiCard from '@mui/material/Card';
import FormContainer from '../Component/FormContainer';
import { Link, useLocation } from 'react-router-dom';
import ApiManager from '../ApiManager/ApiManager';


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


const ResetPassword = () => {
    const location = useLocation();
    // Use URLSearchParams to extract the token from query parameters
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token'); const [newPassWordError, setNewPasswordError] = useState(false);
    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
    const [message, setMessage] = useState('')
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassWordError || confirmPasswordError) {
            return;
        }
        const formData = new FormData(e.currentTarget);
        const newPassword = formData.get('new-password');
        const param = `?token=${token}&&newPassword=${newPassword}`;
        console.log(param);
        const res = await ApiManager.resetPassword(param);
        setMessage(res);

    };


    const validateInputs = () => {
        const newPassword = document.getElementById('new-password');
        const confirmPassword = document.getElementById('confirm-password');

        let isValid = true;


        if (!newPassword.value || newPassword.value.length < 6) {
            setNewPasswordError(true);
            setNewPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setNewPasswordError(false);
            setNewPasswordErrorMessage('');
        }

        if (newPassword.value !== confirmPassword.value) {
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
                        Reset Password
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
                        <FormControl>
                            <FormLabel htmlFor="new-password">New Password</FormLabel>
                            <TextField
                                error={newPassWordError}
                                helperText={newPasswordErrorMessage}
                                id="new-password"
                                type="password"
                                name="new-password"
                                placeholder="******"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={newPassWordError ? "error" : "primary"}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
                            <TextField
                                error={confirmPasswordError}
                                helperText={confirmPasswordErrorMessage}
                                id="confirm-password"
                                type="password"
                                name="confirm-password"
                                placeholder="******"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={newPassWordError ? "error" : "primary"}
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
};


export default ResetPassword;