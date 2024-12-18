import { useEffect, useState } from "react"
import cart_icon from './assets/icon-add-to-cart.svg'
import decrease from './assets/icon-decrement-quantity.svg'
import increase from './assets/icon-increment-quantity.svg'
import Cart from "./components/Cart";

interface Image {
  thumbnail: string,
  mobile: string,
  tablet: string,
  desktop: string,
}

interface dessert {
  name: string,
  price: number,
  image: Image,
  category: string,
}
function App() {
  const [data, setData] = useState<dessert[]>([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:5173/data.json');
      const data = await response.json();
      setData(data);
    }

    getData();
  }, []);

  return (
    <main className='w-full h-full grid md:grid-cols-3 gap-6 md:gap-16 px-5 md:px-24 mx-auto py-10'>
      <section className="col-span-2">
        <h1 className='font-bold text-5xl'>Desserts</h1>
        <div className="mt-5 grid md:grid-cols-3 gap-y-6 gap-x-4">
          {data.map((dessert, index) => (
            <div key={index}>
              <div className="grid">
                <img src={dessert.image.desktop} alt="item" className="h-56 md:h-full w-full rounded-md border- border-primary" />

                <button className="w-1/3 h-10 md:w-2/4 px-2 py-1 mx-auto -mt-5 bg-white hidde flex justify-center items-center gap-2 border border-black rounded-full">
                  <img src={cart_icon} alt="cart icon" />
                  <p className="text-xs font-semibold">Add to Cart</p>
                </button>
                <button className="w-1/3 h-10 md:w-2/4 px-2 py-1 mx-auto -mt-5 text-white hidden fle justify-between items-center bg-primary rounded-full">
                  <img src={decrease} alt="decrease icon" className="border-2 border-white rounded-full w-5 h-5 p-1 flex justify-center items-center" />
                  <div>{1}</div>
                  <img src={increase} alt="increase icon" className="border-2 border-white rounded-full w-5 h-5 p-1 flex justify-center items-center" />
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
      <Cart />
    </main>
  )
}

export default App
