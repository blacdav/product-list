// import React from 'react'
interface ConfirmOrderState {
  isConfirmed: boolean,
  setIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>
}

const ConfirmOrder: React.FC<ConfirmOrderState> = ({isConfirmed, setIsConfirmed}) => {
  return (
    <section className={`${isConfirmed ? 'flex' : 'hidden'} inset-0 bg-black bg-opacity-75 absolute justify-center items-center h-full`} id='wrapper'>
      <div onClick={() => setIsConfirmed(false)} className="bg-white shadow-2xl h-3/5 w-1/4 rounded-xl p-3">CONFIRMED</div>
    </section>
  )
}

export default ConfirmOrder
