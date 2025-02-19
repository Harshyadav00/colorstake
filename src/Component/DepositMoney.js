import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, TextField, Typography, styled } from "@mui/material";
import MuiCard from '@mui/material/Card';
import { useAuth } from "../utils/AuthContext";
import ApiManager from "../ApiManager/ApiManager";


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


const DepositMoney = ({setMessage, setError}) => {
    const { user } = useAuth();
    const [amount, setAmount] = useState("");
    const [amountError, setAmountError] = useState(false);
    const [amountErrorMessage, setAmountErrorMessage] = useState("");

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

    const handleDeposit = async (event) => {
        event.preventDefault();

        if (amountError) return;

        try {
            const data = {
                amount,
                productInfo: "Wallet Deposit",
                firstName: user.name,
                email: user.email,
                phone: user.phone
            };
            const res = await ApiManager.createPayment(data);


            console.log(res);

            if (res.payuUrl) {
                // Create a form dynamically and submit it
                const form = document.createElement("form");
                form.method = "POST";
                form.action = res.payuUrl;

                Object.keys(res).forEach((key) => {
                    const input = document.createElement("input");
                    input.type = "hidden";
                    input.name = key;
                    input.value = res[key];
                    form.appendChild(input);
                });

                document.body.appendChild(form);
                console.log(form);
                form.submit(); // Redirects user to PayU for payment
            } else {
                setError("Payment initiation failed.");
            }
        } catch (error) {
            console.error("Error processing payment:", error);
        }
    };

    return (
        <div>
            <Box component="form" onSubmit={handleDeposit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
                <Card variant="outlined">
                    <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
                        Deposit Money
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
                        Pay Now
                    </Button>
                </Card>
            </Box>
        </div>
    );
};

export default DepositMoney;
