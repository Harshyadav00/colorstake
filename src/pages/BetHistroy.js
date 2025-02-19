import { Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ApiManager from "../ApiManager/ApiManager";
import { useAuth } from "../utils/AuthContext";

const BetHistory = () => {
    const { user } = useAuth();
    const [betHistory, setBetHistory] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);


    const getBetHistory = async (user, page) => {
        try {
            const param = `?userId=${user.id}&&page=${page}&&size=10`;
            const res = await ApiManager.fetchBetHistory(param);
            setBetHistory(res.content);
            setTotalPage(res.totalPages);
        } catch (error) {
            // setError(error.error.error);
            console.log(error);
        }
    }

    useEffect(() => {
        if (user !== null || user !== undefined)
            getBetHistory(user, page);

    }, [user, page]);


    return (
        <div>
            <Typography variant="h2" component="h2" sx={{ ml: 2, mt: 4, }}>Bet History</Typography>
            {betHistory?.length < 1 ? (
                <> <Typography sx={{textAlign:'center', m:3}} variant="h3" >Place some Bet to See here </Typography></>
            ) : (
                <>
                    <BetHistoryTable betHistory={betHistory} />
                    <Stack spacing={2} sx={{ my: 2, display: "flex", flexDirection: "row", justifyContent: "center" }}>
                        <Pagination count={totalPage} page={page + 1} onChange={(event, value) => setPage(value - 1)} />
                    </Stack>
                </>
            )
            }
        </div >
    );
}

function BetHistoryTable({ betHistory }) {

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

    const ColorBox = ({ color }) => {
        return (
            <div style={{ width: 20, height: 20, backgroundColor: color }}></div>
        );
    }

    let getId = (uuid) => {
        return uuid.split('-')[4];
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Bet Id</TableCell>
                        <TableCell align="right">Placed At</TableCell>
                        <TableCell align="right">Round Id</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Color</TableCell>
                        <TableCell align="right">Result</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {betHistory?.map((bet) => (
                        <TableRow
                            key={bet.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {getId(bet.id)}
                            </TableCell>
                            <TableCell align="right">{getDateTime(bet.placedAt)}</TableCell>
                            <TableCell align="right">{getId(bet.roundId)}</TableCell>
                            <TableCell align="right">{bet.amount}</TableCell>
                            <TableCell align="right"> <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <ColorBox color={bet.choice} />
                            </div></TableCell>
                            <TableCell align="right">{bet.betResult}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BetHistory;