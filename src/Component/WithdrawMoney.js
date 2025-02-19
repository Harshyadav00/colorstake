import React, { useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormLabel, TextField, Typography, styled } from "@mui/material";
import MuiCard from '@mui/material/Card';
import { useAuth } from "../utils/AuthContext";
import ApiManager from "../ApiManager/ApiManager";
import { useLocation } from "react-router-dom";


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


const WithDrawMoney = ({ setMessage, setError }) => {
    const { user } = useAuth();
    const [amount, setAmount] = useState("");
    const [amountError, setAmountError] = useState(false);
    const [amountErrorMessage, setAmountErrorMessage] = useState("");
    const [otpError, setOtpError] = useState(false);
    const [otpErrorMessage, setOtpErrorMessage] = useState("");
    const [otp, setOtp] = useState();
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const validateInputs = () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            setAmountError(true);
            setAmountErrorMessage("Enter a valid amount.");
            return false;
        }
        setAmountError(false);
        setAmountErrorMessage("");
        return true;
    };

    const validateOtpSubmission = () => {
        if (!otp || isNaN(otp) || otp.length !== 6) {
            console.log(otp);
            console.log(otp.length);
            setOtpError(true);
            setOtpErrorMessage("Enter a 6 digit otp");
            return false;
        }

        setOtpError(false);
        setAmountErrorMessage("");
        return true;
    }

    const handleVerifyWithdrawal = async (e) => {
        e.preventDefault();
        if (otpError)
            return

        try {
            const data = {
                userEmail: user.email,
                otp
            }

            const res = await ApiManager.verifyWithdrawal(data);
            setMessage(res);
            handleClose();
            setAmount(0);


        } catch (e) {
            setError(e.error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (amountError)
            return

        try {

            const data = {
                amount,
                userEmail: user.email,
            };

            const res = await ApiManager.withdrawMoney(data);
            console.log(res);
            handleClickOpen();
        } catch (e) {
            console.log(e);
            setError(e.error);
        }


    }


    return (
        <div>
            <Box component="form"
                onSubmit={handleSubmit}
                noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
                <Card variant="outlined">
                    <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
                        Withdraw
                    </Typography>
                    <FormControl>
                        <FormLabel htmlFor="amount">Amount</FormLabel>
                        <TextField
                            error={amountError}
                            helperText={amountErrorMessage}
                            id="amount"
                            type="number"
                            name="amount"
                            placeholder="000"
                            required
                            fullWidth
                            variant="outlined"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            color={amountError ? "error" : "primary"}
                        />
                    </FormControl>
                    <Button onClick={validateInputs} type="submit" fullWidth variant="contained">
                        withdraw
                    </Button>
                </Card>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleVerifyWithdrawal}>
                    <DialogTitle>Withdraw</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ color: 'red' }}>
                            This will Just Remove the money from account and add as transaction, Money won't be added to any bank account
                        </DialogContentText>
                        <DialogContentText>
                            Enter the otp sent to your Email
                        </DialogContentText>
                        <TextField
                            error={otpError}
                            helperText={otpErrorMessage}
                            autoFocus
                            required
                            margin="dense"
                            id="otp"
                            name="otp"
                            label="OTP"
                            type="number"
                            fullWidth
                            variant="standard"
                            placeholder="******"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            color={otpError ? "error" : "primary"}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button style={{ color: 'red' }} onClick={handleClose}>Cancel</Button>
                        <Button type="submit" onClick={validateOtpSubmission}>Withdraw</Button>  {/* Submit button inside form */}
                    </DialogActions>
                </form>
            </Dialog>

        </div >
    );
};

export default WithDrawMoney;