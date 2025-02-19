import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const Notification = ({ message, setMessage, error, setError }) => {
    return (
        <Snackbar
            open={message !== '' || error !== ''}
            style={{
                fontSize: '100%',
            }}
            autoHideDuration={6000}
            onClose={() => {
                setMessage('');
                setError('');
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Adjust position if needed
        >
            {message !== '' ? (
                <Alert
                    onClose={() => setMessage('')} severity="success" sx={{ width: '100%', fontSize: '100%' }}>
                    {message}
                </Alert>
            ) : (
                error !== '' && (
                    <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%', fontSize: '100%' }}>
                        {error}
                    </Alert>
                )
            )}
        </Snackbar>
    );
};

export default Notification;
