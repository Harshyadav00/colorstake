import { redirect } from "react-router-dom";

export const isAuthenticated = () => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
        try {
            const user = JSON.parse(storedUser); // Parse JSON string

            if (user) {
                return redirect("/"); // Redirect if the user exists
            }
        } catch (error) {
            console.error("Error parsing user data:", error);
        }
    }

    return null; // Allow access if not authenticated
};
