import { createContext, useContext, useReducer, useState } from "react";

interface CartList {
    name: string,
    price: number,
    category: string,
}

interface Action {
    type: string,
    payload: CartList
}

interface CartContextType {
    state: CartList,
    added: number,
    setAdded: (added: number) => void,
    addItem: (item: CartList, i: number) => void,
    removeItem: (name: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const ACTIONS = {
    ADD: 'ADD',
    REMOVE: 'REMOVE'
}

const cartReducer = (state: CartList[], action: Action): CartList[] => {
    switch (action.type) {
        case ACTIONS.ADD:
            return [...state, action.payload]
        case ACTIONS.REMOVE:
            return state.filter((p) => p.name !== action.payload.name);
        default:
            return state;
    }
}

const cartList: CartList[] = []

export const CartProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, cartList);
    const [added, setAdded] = useState<number>(-1)

    const addItem = (item: CartList, i: number) => {
        dispatch({type: ACTIONS.ADD, payload: item});
        setAdded(i)
    }

    const removeItem = (name: string) => {
        dispatch({type: ACTIONS.REMOVE, payload: name});
    }

    return (
        <CartContext.Provider value={{state, added, setAdded, addItem, removeItem}}>
            { children }
        </CartContext.Provider>
    )
}

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}