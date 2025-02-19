const ENDPOINTS = {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/register',
    REFRESH: '/auth/refresh',
    FETCHCURRENTROUND: '/bet/fetchCurrentRound',
    PLACEBET: '/bet/placeBet',
    FETCHROUNDHISTORY: '/bet/fetchRoundHistory',
    FETCHBETHISTORY: '/bet/fetchAllBetsByUserId',
    FETCHACCOUNTDATA: '/account/fetchAccountData',
    FORGOTPASSWORD: '/auth/forgot-password',
    RESETPASSWORD: '/auth/reset-password',
    CREATEPAYMENT: '/payments/create',
    VERIFYPAYMENT: '/payments/verify',
    FETCHTRANSACTIONHISTORY: '/payments/fetchAllTransactionsByUserId',
    WITHDRAWMONEY: '/payments/withdraw',
    VERIFYWITHDRAWAL: '/payments/verifyWithdrawal',
};

export default ENDPOINTS;