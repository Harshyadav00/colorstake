import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import '../utils/css/dashboard.css';
import { Box, Typography, IconButton, Avatar, Tooltip, Menu, MenuItem, ListItemIcon } from "@mui/material";
import { AccountBalance, Home, ListAlt, Logout, ManageAccounts } from "@mui/icons-material";
import { Link } from "react-router-dom";
const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="dashboard">
            <div className="logo-div">
                <Link to='/' >
                    <svg fill="#000000" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M348.942 1024c48.585-82.459 111.338-150.57 197.146-217.768.775-.647 1.628-1.393 2.855-2.237 28.017-19.522-1.295-34.805-27.262-53.248-38.042-26.928-70.984-70.072-63.234-76.664 9.545-8.132 27.065 40.858 100.188 68.129 41.662 15.529 51.472 8.309 101.012-15.107.334-.128.628-.216.893-.353 14.617-8.809 29.351-17.314 44.419-25.152 80.225-41.898 146.637-103.405 172.731-150.306l.049.039c87.867-147.981 48.166-308.823-27.968-401.379-7.299-8.848-18.197-18.904-24.338-24.946-9.427 10.644-20.944 29.184-14.793 51.09 10.251 36.62 6.936 71.523-12.694 94.066 20.924 63.921-.726 137.475-49.353 179.569-25.133 16.167-50.942 27.105-85.041 27.595-78.577 1.118-134.581-30.666-203.456-59.212-69.767-28.91-143.959-43.006-219.514-40.573C156.915 380.235 68.52 407.571.002 458.66V128.137C.002 57.369 57.251.001 128.138.001h767.728c70.768 0 128.136 57.249 128.136 128.136v767.728c0 70.768-57.249 128.136-128.136 128.136H348.944zM0 854.128v-30.443c13.71.069 28.695-1.356 45.05-4.494 114.912-22.072 170.769-103.445 170.769-103.445 19.345-24.22 26.075-11.566 15.627 7.063-11.095 19.845-57.172 95.42-171.584 124.016-20.514 5.137-40.653 7.527-59.863 7.303zm357.954-296.735c-10.055 16.019-31.156 20.836-47.185 10.771-15.99-10.035-20.865-31.156-10.81-47.175 10.065-16.039 31.215-20.856 47.205-10.82 16.039 10.065 20.856 31.185 10.791 47.224zm341.363-339.312c31.745 90.878 107.908 51.119 91.369-35.374-8.927-46.705 14.087-72.161 14.087-72.161-79.165-30.46-128.607 41.25-105.456 107.535z"></path></g></svg>
                </Link>
            </div>
            <div className="account-nav">
                <Account user={user} logout={logout} />

            </div>
        </div >
    )
}


function Account({ user, logout }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Typography variant="h4" component="h4" >
                    <Tooltip sx={{ minWidth: 100 }} title="Account Balance">
                        {user?.balance}
                    </Tooltip>
                </Typography>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>{user?.name?.substring(0, 1)}</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem component={Link} to='/' onClick={handleClose}>
                    <ListItemIcon >
                        <Home />
                    </ListItemIcon>
                    Home
                </MenuItem>
                <MenuItem component={Link} to='/account' onClick={handleClose}>
                    <ListItemIcon >
                        <ManageAccounts />
                    </ListItemIcon>
                    Account
                </MenuItem>
                <MenuItem component={Link} to='/bank-transactions' onClick={handleClose}>
                    <ListItemIcon >
                        <AccountBalance />
                    </ListItemIcon>
                    Transactions
                </MenuItem>
                <MenuItem component={Link} to='/bet-history' onClick={handleClose}>
                    <ListItemIcon >
                        <ListAlt />
                    </ListItemIcon>
                    Bet History
                </MenuItem>
                <MenuItem component={Link} to='/login' onClick={logout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}


export default Dashboard;