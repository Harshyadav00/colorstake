import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { Avatar, Box, Container, Typography } from '@mui/material';
import ApiManager from '../ApiManager/ApiManager';
import DepositMoney from '../Component/DepositMoney';
import { useLocation } from 'react-router-dom';
import Notification from '../Component/Notification';
import WithDrawMoney from '../Component/WithdrawMoney';


const Account = () => {

    const { user } = useAuth();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [message, setMessage] = useState('')
    const [error, setError] = useState('');

    const txnId = queryParams.get("txnId");
    const withdrawal = queryParams.get("withdrawal");


    const verifyPayment = async (txnId) => {
        const param = `?txnId=${txnId}`;
        try {

            const res = await ApiManager.verifyPayment(param);
            setMessage(res);

        }
        catch (e) {
            setError(e.error);
        }
        removeQueryParams();
    }

    function removeQueryParams() {
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
    }

    useEffect(() => {
        if (txnId && txnId !== undefined && txnId !== null) {
            verifyPayment(txnId);
        }
    }, [txnId]);

    return (
        <div>
            <Notification message={message} setMessage={setMessage} error={error} setError={setError} />
            <AccountData user={user} txnId={txnId} withdrawal={withdrawal} />
            <Box sx={{
                display: 'flex', flexDirection: 'row', gap: 5, mt: 3, justifyContent: 'space-around', "@media (max-width: 768px)": {
                    flexDirection: "column",
                    gap: 2
                }
            }}>
                <DepositMoney setMessage={setMessage} setError={setError} />
                <WithDrawMoney setMessage={setMessage} setError={setError} />
            </Box>
        </div>
    );
};

const AccountData = ({ user, txnId, withdrawal }) => {
    const [userData, setUserData] = useState(null);


    const fetchUserData = async () => {
        try {
            const param = `?userId=${user?.id}`;
            const res = await ApiManager.fetchAccountData(param);
            setUserData(res);
        } catch (error) {
            // setError(error.error.error);
            console.log(error);
        }
    };

    useEffect(() => {
        if (user || user !== null || user !== undefined)
            fetchUserData();
    }, [user, txnId, withdrawal]);

    return (
        <>
            <Typography variant="h3" sx={{ m: 3 }}>Account Data</Typography>
            <Container sx={{
                display: 'flex', justifyContent: 'space-between', gap: 5, flexDirection: 'row', alignItems: 'center', "@media (max-width: 768px)": {
                    flexDirection: "column",
                    gap: 2
                }
            }} >
                <Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, m: 2, alignItems: 'center' }}>
                        <Avatar sx={{ width: 50, height: 50 }}>{userData?.name.substring(0, 1)}</Avatar>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{userData?.name}</Typography>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{userData?.email}</Typography>
                        </Box>
                    </Box>
                    <Typography variant="h5">Account Balance: {userData?.balance}</Typography>
                </Box>
                <Box sx={{
                    display: 'flex', gap: 2, "@media (max-width: 768px)": {
                        flexDirection: "column",
                    }
                }} >
                    <Box sx={{ background: 'grey', color: 'white', p: 2, gap: 1 }}>
                        <Typography variant='h5' >Bet's Placed: {userData?.totalBetPlayed}</Typography>
                    </Box>
                    <Box sx={{ background: 'green', color: 'white', p: 2, gap: 1 }}>
                        <Typography variant='h5' >Bet's Won: {userData?.totalBetWon}</Typography>
                    </Box>
                    <Box sx={{ background: 'red', color: 'white', p: 2, gap: 1 }}>
                        <Typography variant='h5' >Bet's Lost: {userData?.totalBetLost}</Typography>
                    </Box>
                </Box>
            </Container>
        </>
    );

}


export default Account;