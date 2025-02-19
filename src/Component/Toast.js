import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Toast = () => {

    return (
        <ToastContainer
            pauseOnFocusLoss
            pauseOnHover
        />
    );
};

export default Toast;