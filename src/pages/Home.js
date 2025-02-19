import React, { useState, useEffect } from 'react';
import Timer from '../Component/Timer';
import ApiManager from '../ApiManager/ApiManager';
import { useAuth } from '../utils/AuthContext';
import { Button, Box, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Notification from '../Component/Notification';
import { useWebSocket } from '../utils/WebSocketContextt';

const Home = () => {
    const { user } = useAuth();
    const { round, roundHistory, timeLeft, error, setError, fetchInitialData } = useWebSocket();
    const [amount, setAmount] = useState(0);
    const [amountError, setAmountError] = useState(false);
    const [amountErrorMessage, setAmountErrorMessage] = useState("");
    const [message, setMessage] = useState('');

    const handleBet = async (color, amount) => {

        if (amountError)
            return;

        const data = {
            choice: color,
            amount: amount,
            round: {
                id: round.roundId
            },
            user: {
                id: user.id
            }
        }
        try {
            const res = await ApiManager.placeBet(data);
            console.log(res);
            setMessage(res.data);
            setAmount(0);
        } catch (error) {
            setError(error.error.error);
        }
    }

    const validateInputs = () => {
        if (amount <= 0 || amount % 1 !== 0) {
            setAmountError(true);
            setAmountErrorMessage("Invalid amount!");
            return;
        }
        setAmountError(false);
        setAmountErrorMessage("");
    }

    useEffect(() => {
        fetchInitialData();
    }, [])

    return (
        <>
            {round != null ? (
                <div>
                    <Notification message={message} setMessage={setMessage} error={error} setError={setError} />
                    <BetttingArea amount={amount} setAmount={setAmount} round={round} timeLeft={timeLeft} handleBet={handleBet} amountError={amountError} amountErrorMessage={amountErrorMessage} validateInputs={validateInputs} />
                    <RoundHistoryTable roundHistory={roundHistory} />
                </div>
            ) : (
                <div>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            )}
        </>
    );
};

const BetttingArea = ({ amount, setAmount, round, handleBet, timeLeft, amountError, amountErrorMessage, validateInputs }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (color, amount) => {
        if (isSubmitting) return; // Prevent multiple clicks
        setIsSubmitting(true);

        console.log("calling bet", amount);
        validateInputs();
        await handleBet(color, amount);

        setIsSubmitting(false);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 10 }}>
            <Timer timeLeft={timeLeft} />
            <Box style={{ display: "flex", justifyContent: "center", gap: 10 }} sx={{
                "@media (max-width: 768px)": {
                    flexDirection: "column",
                },
            }}>
                <TextField
                    error={amountError}
                    helperText={amountErrorMessage}
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    label="Amount"
                    variant="outlined"
                    color={amount ? "error" : "primary"}
                />
                <div style={{ display: "flex", justifyContent: "center", gap: 10 }} >
                    <Button
                        disabled={round.status !== 'ACTIVE' || isSubmitting}
                        variant="contained"
                        style={{ background: "red" }}
                        onClick={() => handleSubmit('RED', amount)}
                    >
                        {isSubmitting ? "Submitting..." : "Bet on Red"}
                    </Button>
                    <Button
                        disabled={round.status !== 'ACTIVE' || isSubmitting}
                        variant="contained"
                        style={{ background: "blue" }}
                        onClick={() => handleSubmit('BLUE', amount)}
                    >
                        {isSubmitting ? "Submitting..." : "Bet on Blue"}
                    </Button>
                </div>
            </Box>
        </div>
    );
};


function RoundHistoryTable({ roundHistory }) {

    let getTime = (isoString) => {
        const date = new Date(isoString);

        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedTime = `${hours % 12 || 12}:${minutes}:${seconds} ${ampm}`;
        return formattedTime;
    }

    const ColorBox = ({ color }) => {
        return (
            <div style={{ width: 20, height: 20, backgroundColor: color }}></div>
        );
    }

    let getId = (uuid) => {
        return uuid.split('-')[0];
    }

    return (<>
        <Typography variant="h2" component="h2" sx={{ ml: 2, mt: 4 }}>Previous Rounds</Typography>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Round Id</TableCell>
                        <TableCell align="right">Start Time</TableCell>
                        <TableCell align="right">End Time</TableCell>
                        <TableCell align="right">Winner Color</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {roundHistory?.map((round) => (
                        <TableRow
                            key={round.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {getId(round.id)}
                            </TableCell>
                            <TableCell align="right">{getTime(round.startTime)}</TableCell>
                            <TableCell align="right">{getTime(round.endTime)}</TableCell>
                            <TableCell align="right"> <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <ColorBox color={round.winnerColor} />
                            </div></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>

    );
}

export default Home;