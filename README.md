# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it. 

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- Tailwind Grid
- Mobile-first workflow
- [Tailwind](https://) - TailwindCSS
- [React](https://reactjs.org/) - JS library
- [Vite](https://) - Vite

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

I Would Basically Said I learnt to use TypeScript, especially because i used useReducer and useContext hooks, with typescript beacaues i used to find this combination difficult even with javaScript, but here i used them with TypeScript, and i'm proud of that.

```ts
import { createContext, useContext, useReducer, useState } from "react";

interface CartList {
    name: string,
    price?: number,
    category?: string,
}

interface Action {
    type: string,
    payload: CartList
}

interface CartContextType {
    state: CartList[],
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
            return [action.payload, ...state]
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
        dispatch({type: ACTIONS.REMOVE, payload: { name }});
    }

    return (
        <CartContext.Provider value={{ state, added, setAdded, addItem, removeItem }}>
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
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/blacdav)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**