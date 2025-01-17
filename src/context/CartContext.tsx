import { createContext, ReactNode, useContext, useEffect, useId, useReducer, useState } from "react";

interface CartImage {
    thumbnail?: string,
    desktop?: string,
    tablet?: string,
    mobile?: string,
  }
  
  interface CartList {
    name?: string,
    price?: number,
    category?: string,
    image?: CartImage,
    quantity?: number,
  }

interface Action {
    type: string,
    payload: CartList,
}

interface CartContextType {
    data: CartList[],
    state: CartList[],
    addItem: (item: CartList) => void,
    removeItem: (name: string) => void
    increaseQuantity: (name: string) => void,
    decreaseQuantity: (item: CartList, name: string) => void,
    isInCart: (name: string) => boolean,
    reset: (item: CartList) => void
}

interface CartNode {
    children: ReactNode
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const ACTIONS = {
    FETCH_DATA: 'FETCH_DATA',
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    INCREASE: 'INCREASE',
    DECREASE: 'DECREASE',
    RESET: 'RESET'
}

const cartReducer = (state: CartList[], action: Action): CartList[] => {
    switch (action.type) {
        case ACTIONS.ADD:
            return [action.payload, ...state]
        case ACTIONS.REMOVE:
            return state.filter((s) => s.name !== action.payload.name);
        case ACTIONS.INCREASE:
            return state.map((item) => item.name === action.payload.name ? { ...item, quantity: item.quantity! + 1 } : item
            );
        case ACTIONS.DECREASE:
            return state
                .map(item =>
                    item.name === action.payload.name && (item.quantity || 0) > 1
                        ? { ...item, quantity: (item.quantity || 0) - 1 }
                        : item
                )
                .filter(item => (item.quantity || 0) > 0);
        case ACTIONS.RESET:
            return [];
        default:
            return state;
    }
}

const cartList: CartList[] = []

export const CartProvider: React.FC<CartNode> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, cartList);
    const [data, setData] = useState<CartList[]>([])
    const id = useId();

    useEffect(() => {
        const getData = async() => {
            try {
                const res = await fetch('/data.json');
                if(!res.ok) {
                    throw new Error('Network Response was now ok')
                }

                const data: CartList[] = await res.json();

                const updatedData = data.map((item) => ({
                    ...item,
                    quantity: 1, // Default to 0 if `quantity` is not provided
                    id: `${id}${item.category}`,
                }));
                setData(updatedData)
                // dispatch({type: ACTIONS.FETCH_DATA, payload: updatedData})
            } catch (error) {
                console.error(error)
            }
        }

        getData();
    }, [id])

    const addItem = (item: CartList) => {
        const existingItem = state.find((cartItem) => cartItem.name === item.name);
        if (existingItem) {
            increaseQuantity(item.name!);
        } else {
            dispatch({ type: ACTIONS.ADD, payload: { ...item, quantity: item.quantity } });
        }
    };

    const removeItem = (name: string) => {
        dispatch({type: ACTIONS.REMOVE, payload: { name }});
    }

    const increaseQuantity = (name: string) => {
        dispatch({type: ACTIONS.INCREASE, payload: { name }});
    }

    const decreaseQuantity = (item: CartList, name: string) => {
        dispatch({type: ACTIONS.DECREASE, payload: { name }});
        if(item.quantity === 1) {
            removeItem(name);
        }
    }

    const isInCart = (name: string): boolean => {
        return state.some(item => item.name === name);
    };

    const reset = (item: CartList) => {
        dispatch({ type: ACTIONS.RESET, payload: item });
    }

    return (
        <CartContext.Provider value={{ data, state, addItem, removeItem, increaseQuantity, decreaseQuantity, isInCart, reset }}>
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