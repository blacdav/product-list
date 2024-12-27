import { useEffect, useState } from "react"
import cart_icon from '/assets/icon-add-to-cart.svg'
import decrease from '/assets/icon-decrement-quantity.svg'
import increase from '/assets/icon-increment-quantity.svg'
import Cart from "./components/Cart";
import { useCart } from "./context/CartContext";
import ConfirmOrder from "./modals/ConfirmOrder";
// import data from "../data.json"

interface CartImage {
  thumbnail?: string,
  desktop?: string,
  tablet?: string,
  mobile?: string,
}

interface CartList {
  name: string,
  price: number,
  category: string,
  image: CartImage,
  quantity: number,
}

const App: React.FC = () => {
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const { isInCart, addItem, increaseQuantity, decreaseQuantity } = useCart()
  const [data, setData] = useState<CartList[]>([])

  useEffect(() => {
    const getData = async() => {
      const res = await fetch('/data.json');
      const data = await res.json();
      setData(data);
    }

    getData();
  }, [])

  return (
    <>
      <main className='w-full h-full grid md:grid-cols-3 gap-6 md:gap-16 px-5 md:px-24 mx-auto py-10'>
        <section className="col-span-2">
          <h1 className='font-bold text-5xl'>Desserts</h1>
          <div className="mt-5 grid md:grid-cols-3 gap-y-6 gap-x-4">
            {data.map((dessert, index: number) => (
              <div key={index}>
                <div className="grid">
                  <img src={dessert.image.desktop} alt={dessert.image.desktop} className={`${ isInCart(dessert.name) ? 'border-2' : ''} h-56 md:h-full w-full rounded-md border-primary`} />

                  <button onClick={() => addItem(dessert)} className={`${ isInCart(dessert.name) ? 'hidden' : 'flex'} w-2/5 h-10 md:w-2/4 px-2 py-1 mx-auto -mt-5 bg-white justify-center items-center gap-2 border border-black rounded-full`}>
                    <img src={cart_icon} alt="cart icon" />
                    <p className="text-xs font-semibold">Add to Cart</p>
                  </button>
                  <button className={`${ isInCart(dessert.name) ? 'flex' : 'hidden'} w-2/5 h-10 md:w-2/4 px-2 py-1 mx-auto -mt-5 text-white justify-between items-center bg-primary rounded-full`}>
                    <img onClick={() => decreaseQuantity(dessert, dessert.name)} src={decrease} alt="decrease icon" className="border-2 border-white rounded-full w-6 h-6 p-1 flex justify-center items-center" />
                    <div>{1}</div>
                    <img onClick={() => increaseQuantity(dessert.name)} src={increase} alt="increase icon" className="border-2 border-white rounded-full w-6 h-6 p-1 flex justify-center items-center" />
                  </button>
                </div>
                <div className="w-full">
                  <div className="mt-3">
                    <small>{dessert.category}</small>
                    <p className="font-bold">{dessert.name}</p>
                    <p className="font-bold">${dessert.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Cart isConfirmed={isConfirmed} setIsConfirmed={setIsConfirmed} />
      </main>
      <ConfirmOrder isConfirmed={isConfirmed} setIsConfirmed={setIsConfirmed} />
    </>
  )
}

export default App
