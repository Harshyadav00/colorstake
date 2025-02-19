import { Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import ApiManager from '../ApiManager/ApiManager';

const Transactions = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);


    const fetchTransactionHistory = async (user, page) => {
        try {
            const param = `?userId=${user.id}&&page=${page}&&size=10`;
            const res = await ApiManager.fetchTransactionHistory(param);
            console.log(res);
            setTransactions(res.content);
            setTotalPage(res.totalPages);
        } catch (error) {
            // setError(error.error.error);
            console.log(error);
        }
    }

    useEffect(() => {
        if (user !== null || user !== undefined)
            fetchTransactionHistory(user, page);

    }, [user, page]);


    return (<div>
        <Typography variant="h2" component="h2" sx={{ ml: 2, mt: 4, }}>Transactions History</Typography>
        {transactions?.length < 1 ? (
            <> <Typography sx={{ textAlign: 'center', m: 3 }} variant="h3" >Deposit Some Money to see here</Typography></>
        ) : (
            <>
                <TransactionHistoryTable transactionHistory={transactions} />
                <Stack spacing={2} sx={{ my: 2, display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <Pagination count={totalPage} page={page + 1} onChange={(event, value) => setPage(value - 1)} />
                </Stack>
            </>
        )
        }
    </div >);
}


function TransactionHistoryTable({ transactionHistory }) {

    const getDateTime = (isoString) => {
        const date = new Date(isoString);

        // Extract date components
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
        const year = date.getFullYear();

        // Extract time components
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";

        // Format date and time
        const formattedDate = `${day}-${month}-${year}`;
        const formattedTime = `${hours % 12 || 12}:${minutes}:${seconds} ${ampm}`;

        return `${formattedDate} ${formattedTime}`;
    };

    console.log(transactionHistory);


    const StatusBox = ({ status }) => {
        if (status === "SUCCESS") {
            return (
                <div style={{ color: 'green' }} >{status}</div>
            )
        } else if (status === "FAILED") {
            return (
                <div style={{ color: 'red' }} >{status}</div>
            )
        } else {
            return (
                <div style={{ color: 'blue' }} >{status}</div>
            )

        }
    }



    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Timestamp</TableCell>
                        <TableCell align="right">Txn Id</TableCell>
                        {/* <TableCell align="right">Round Id</TableCell> */}
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Transaction Type</TableCell>
                        <TableCell align="right">Transaction Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactionHistory?.map((transaction) => (
                        <TableRow
                            key={transaction.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {transaction.id}
                            </TableCell>
                            <TableCell align="right">{getDateTime(transaction.timestamp)}</TableCell>
                            <TableCell align="right">{transaction.txnId}</TableCell>
                            {/* <TableCell align="right">{getId(tranasction.roundId)}</TableCell> */}
                            <TableCell align="right">{transaction.amount}</TableCell>
                            <TableCell align="right">{transaction.type}</TableCell>
                            <TableCell align="right"><StatusBox status={transaction.status} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Transactions;