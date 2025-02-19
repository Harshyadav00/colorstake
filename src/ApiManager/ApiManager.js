import ApiMethods from "./ApiMethods";
import ENDPOINTS from "./EndPoint";

class ApiManager {
    static login = (data) => {
        const url = ENDPOINTS.LOGIN;
        return ApiMethods.post(url, data);
    }

    static register = (data) => {
        const url = ENDPOINTS.SIGNUP;
        return ApiMethods.post(url, data);
    }

    static fetchData = () => {
        const url = ENDPOINTS.FETCH;
        return ApiMethods.get(url);
    }

    static fetchCurrentRound = () => {
        const url = ENDPOINTS.FETCHCURRENTROUND;
        return ApiMethods.get(url);
    }

    static placeBet = (data) => {
        const url = ENDPOINTS.PLACEBET;
        return ApiMethods.post(url, data);
    }

    static fetchRoundHistory = () => {
        const url = ENDPOINTS.FETCHROUNDHISTORY;
        return ApiMethods.get(url);
    }
    static fetchBetHistory = (param) => {
        const url = ENDPOINTS.FETCHBETHISTORY + param;
        return ApiMethods.get(url);
    }

    static fetchAccountData = (param) => {
        const url = ENDPOINTS.FETCHACCOUNTDATA + param;
        return ApiMethods.get(url);
    }

    static forgotPassword  = (param) => {
        const url = ENDPOINTS.FORGOTPASSWORD + param ;
        return ApiMethods.post(url);
    }

    static resetPassword = (param) => {
        const url = ENDPOINTS.RESETPASSWORD + param ;
        return ApiMethods.post(url);
    }

    static createPayment= (data) => {
        const url = ENDPOINTS.CREATEPAYMENT ;
        return ApiMethods.post(url, data);
    }

    static verifyPayment = (param) => {
        const url = ENDPOINTS.VERIFYPAYMENT + param;
        return ApiMethods.get(url);
    }
    static fetchTransactionHistory = (param) => {
        const url  = ENDPOINTS.FETCHTRANSACTIONHISTORY + param ;
        return ApiMethods.get(url);
    }

    static withdrawMoney = (data) => {
        const url = ENDPOINTS.WITHDRAWMONEY;
        return ApiMethods.post(url, data);
    }

    static verifyWithdrawal = (data) => {
        const url = ENDPOINTS.VERIFYWITHDRAWAL ;
        return ApiMethods.post(url, data);
    }
}

export default ApiManager;