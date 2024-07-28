import  { createContext, useContext, useState, ReactNode } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from '../api-client'
type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
};

type AppContextType = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn:boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<ToastMessage | null>(null);
    const {isError}=useQuery("validateToken",apiClient.validateToken,{
        retry:false
    });
    /*const showToast = (toastMessage: ToastMessage) => {
        setToast(toastMessage);
    };*/

    const handleToastClose = () => {
        setToast(null);
    };

    return (
        <AppContext.Provider value={{ showToast:(toastMessage)=>{
            setToast(toastMessage);
        },
            isLoggedIn:!isError
         }}>
            {children}
            {toast && <Toast message={toast.message} type={toast.type} onClose={handleToastClose} />}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
};
