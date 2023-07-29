import { useAuthContext } from "./useAuthConext"
import { useBalancesContext } from "./useBalancesContext"

export const useLogout = () => {
 const { dispatch } = useAuthContext()
 const { dispatch: balancesDispatch } = useBalancesContext()


    const logout = () => {
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        balancesDispatch({type: 'SET_BALANCES', payload: null})
    }

    return {logout}
}