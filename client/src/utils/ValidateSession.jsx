import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loadWithExpiry } from "../axios.js";
import { toaster } from "evergreen-ui";
import { AuthContext } from "../context/AuthContext";

const ValidateSession = ({ children }) => {
    const { currentUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const checkAuthentication = loadWithExpiry(
        ["check_authenticate", currentUser.username],
        "/testauth",
        1500
    );
    if (!checkAuthentication.isLoading && checkAuthentication.error) {
        toaster.danger("Your session has expired, please log in again!", {
            hasCloseButton: true,
            duration: 3,
        });

        logout();
        return navigate("/login");
    }

    return children;
};

export default ValidateSession;
