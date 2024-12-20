import remove from '../assets/icon-remove-item.svg'
import carbon_neutral from '../assets/icon-carbon-neutral.svg'
import { useCart } from '../context/CartContext';

// interface CartList {
//   name: string,
//   price: number,
//   category: string,
// }

const Cart = () => {
  const { state, removeItem } = useCart();

  return (
    <aside className='col-span-2 md:col-span-1 md:mt-5'>
      <h1 className='font-bold text-xl text-primary'>Your Cart({state.length})</h1>
      <section className={`${state ? 'grid' : 'hidden'} mt-5 gap-3`}>
        <div className='grid gap-5'>
          {
            state.map((item, i) => (
              <div key={i} className='flex justify-between items-center'>
                <div className=''>
                  <p className='font-bold'>{item.name}</p>
                  <div className='flex items-baseline gap-2'>
                    <p className='font-bold text-primary'>{}</p>
                    <small>@{item.price}</small>
                    <small>$</small>
                  </div>
                </div>
                <div onClick={() => removeItem(item.name)} className='border-2 border-white rounded-full p-1 hover:cursor-pointer'>
                  <img src={remove} alt="remove icon" />
                </div>
              </div>
            ))
          }

          <div className='flex justify-between items-center'>
            <p>Order Total</p>
            <p className='font-bold text-lg'>$</p>
          </div>

          <div className='flex justify-center items-center gap-1'>
            <img src={carbon_neutral} alt="icon" />
            <small>This is a carbon-neutral delivery</small>
          </div>

          <button className='bg-primary text-white w-full p-2 flex justify-center mx-auto rounded-full'>Confirm Order</button>
        </div>
      </section>
    </aside>
  )
}

export default Cart
