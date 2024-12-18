import { createContext, ReactNode, useContext, useReducer } from "react";

interface Children {
    children: ReactNode
}

// interface Image {
//     thumbnail: string,
//     mobile: string,
//     tablet: string,
//     desktop: string,
// }

interface CartList {
    name: string,
    price: number,
    // image: Image,
    category: string,
}

interface Action {
    type: string,
    payload: CartList
}

interface CartContextType {
    state: CartList[],
    addItem: (item: CartList) => void,
    removeItem: (item: CartList) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const ACTIONS = {
    ADD: 'ADD',
    REMOVE: 'REMOVE'
}

const cartReducer = (state: CartList[], action: Action) => {
    switch (action.type) {
        case ACTIONS.ADD:
            return [...state, action.payload]
        case ACTIONS.REMOVE:
            return [state.filter((p) => p !== action.payload)]
        default:
            break;
    }
}

const cartList: CartList[] = []
export const CartProvider = ({ children }: Children) => {
    const [state, dispatch] = useReducer(cartReducer, cartList);

    const addItem = (item: CartList) => {
        dispatch({type: ACTIONS.ADD, payload: item});
    }

    const removeItem = (item: CartList) => {
        dispatch({type: ACTIONS.REMOVE, payload: item});
    }

    return (
        <CartContext.Provider value={{state, addItem, removeItem}}>
            { children }
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}