import remove from '../assets/icon-remove-item.svg'
import carbon_neutral from '../assets/icon-carbon-neutral.svg'

const Cart = () => {
  return (
    <aside className='col-span-2 md:col-span-1 md:mt-5'>
      <h1 className='font-bold text-xl text-primary'>Your Cart(7)</h1>
      <section className='mt-5 grid gap-3'>
        <div className='grid gap-5'>
          {
            Array(5).map((_, i) => (
              <div key={i} className='flex justify-between items-center'>
                <div className=''>
                  <p className='font-bold'>1</p>
                  <div className='flex gap-2'>
                    <p className='font-bold text-primary'>2x</p>
                    <p>@</p>
                    <p>$</p>
                  </div>
                </div>
                <img src={remove} alt="remove icon" />
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
