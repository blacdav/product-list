// import React from 'react'
import checked from '/assets/icon-order-confirmed.svg'
import { useCart } from '../context/CartContext';
interface ConfirmOrderState {
  isConfirmed: boolean,
  setIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>
}

const ConfirmOrder: React.FC<ConfirmOrderState> = ({isConfirmed, setIsConfirmed}) => {
  const { state, reset } = useCart();
  const totalPrice = state.reduce((total, item) => total + ((item.price || 1) * (item.quantity || 1)), 0);

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if(target.id === 'wrapper') {
      setIsConfirmed(false);
    }
  }

  return (
    <section onClick={handleClose} className={`${isConfirmed ? 'flex' : 'hidden'} inset-0 bg-black bg-opacity-75 fixed justify-center items-end md:items-center min-h-lvh`} id='wrapper'>
      <div className="bg-white shadow-2xl w-full md:w-1/4 rounded-xl py-5 px-8">
        <img src={checked} alt="checked icon" />
        <div className='mt-5'>
          <h1 className='text-3xl font-bold'>Order Confirmed</h1>
          <p className='text-xs'>We hope you enjoyed your food!</p>

          <div className='mt-6 mx-3'>
            {
              state.map((item, i) => (
                <div key={i} className='flex justify-between items-center'>
                  <div className=''>
                    <p className='font-bold'>{item.name}</p>
                    <div className='flex items-baseline gap-2'>
                      <p className='font-bold text-primary'>x{item.quantity}</p>
                      <small>@{item.price}</small>
                    </div>
                  </div>
                  <small>${item.price && item.quantity ? item.price * item.quantity : 0}</small>
                </div>
              ))
            }
          </div>
          <div className='flex justify-between items-center mt-8 mx-3'>
            <p className='text-xs'>Order Total</p>
            <p className='text-lg font-bold'>${totalPrice}</p>
          </div>
        </div>
        <button onClick={() => { reset({}); setIsConfirmed(false)}} className='bg-primary text-white w-full mt-12 p-2 flex justify-center mx-auto rounded-full'>Start New Order</button>
      </div>
    </section>
  )
}

export default ConfirmOrder
