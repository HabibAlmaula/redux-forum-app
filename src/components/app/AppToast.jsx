import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppToast = ({ theme }) => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={theme === "dark" ? "light" : "dark"}
            transition={Bounce}
        />
    );
};

