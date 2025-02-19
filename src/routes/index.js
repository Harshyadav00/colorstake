import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Protected from "./protected";
import { isAuthenticated } from "./helper";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import ForgotPassword from "../pages/ForgotPassword";
import SignIn from "../pages/SignIn";
import BetHistory from "../pages/BetHistroy";
import Transactions from "../pages/Transactions";
import Account from "../pages/Account";
import ResetPassword from "../pages/ResetPassword";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" >
            <Route element={<Protected />} >
                <Route index element={<Home />} />
                <Route path="bet-history" element={<BetHistory />} />
                <Route path="bank-transactions" element={<Transactions />} />
                <Route path="account" element={<Account />} />
                {/* All other protected routes go here */}
            </Route>
            <Route path="register" element={<SignUp />} loader={async () => isAuthenticated()} />
            <Route path="login" element={<SignIn />} loader={async () => isAuthenticated()} />
            <Route path="forgot-password" element={<ForgotPassword />} loader={async () => isAuthenticated()} />
            <Route path="reset-password" element={<ResetPassword />} loader={async () => isAuthenticated()} />
            <Route path="*" element={<NotFound />} loader={async () => isAuthenticated()} />
        </Route>
    )
)

const Index = () => {
    return <RouterProvider router={router} />
}

export default Index;   