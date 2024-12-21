import { createContext, useContext, useReducer, useState } from "react";

interface CartList {
    name?: string,
    price?: number,
    category?: string,
    quantity?: number,
}

interface Action {
    type: string,
    payload: CartList
}

interface CartContextType {
    state: CartList[],
    // quantity: CartList[],
    added: number,
    setAdded: (added: number) => void,
    addItem: (item: CartList, i: number) => void,
    removeItem: (name: string) => void
    increaseQuantity: (name: string) => void,
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const ACTIONS = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    INCREASE: 'INCREASE',
    DECREASE: 'DECREASE'
}

const cartReducer = (state: CartList[], action: Action): CartList[] => {
    switch (action.type) {
        case ACTIONS.ADD:
            return [action.payload, ...state]
        case ACTIONS.REMOVE:
            return state.filter((s) => s.name !== action.payload.name);
        case ACTIONS.INCREASE:
            return state.map(item =>
                item.name === action.payload.name
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
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
        dispatch({type: ACTIONS.REMOVE, payload: { name }});
    }

    const increaseQuantity = (name: string) => {
        dispatch({type: ACTIONS.INCREASE, payload: { name }});
    }

    return (
        <CartContext.Provider value={{ state, added, setAdded, addItem, removeItem, increaseQuantity }}>
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