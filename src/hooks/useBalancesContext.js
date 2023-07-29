import { BalancesContext } from "../context/BalancesContext";
import { useContext } from "react";

export const useBalancesContext = () => {
    const context = useContext(BalancesContext)

    if (!context) {
        throw Error('useBalancesContext must be used inside a BalanceContextProvider')
    }

    return context
}