import { createContext } from 'react'
import { useReducer } from 'react'


export const BalancesContext = createContext()

export const balancesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BALANCES' :
            return {
                balances: action.payload
            }
        case 'CREATE_BALANCE':
            return{
                balances: [action.payload, state.balances]
            }
        default:
            return state;
    }
}

export const BalancesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(balancesReducer, {
        balances: null
    })

    return(
        <BalancesContext.Provider value={{...state, dispatch}}>
            { children }
        </BalancesContext.Provider>
    )
}