import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoredContext'
import './PlaceOrder.css'

export const PlaceOrder = () => {
  
  const {getTotalCartAmount } = useContext(StoreContext);

  return (
   <form action="" className='place-order'>
    <div className="place-order-left">
      <p className="title">Delivery Information</p>
      <div className="multi-fields">
        <input type="text" placeholder='First name'/>
        <input type="text" placeholder='Last name'/>
      </div>
      <input type="text" placeholder='Email address'/>
      <input type="text" placeholder='Address'/>
      <div className="multi-fields">
        <input type="text" placeholder='City'/>
        <input type="text" placeholder='State'/>
      </div>
      <div className="multi-fields">
        <input type="text" placeholder='Zip code'/>
        <input type="text" placeholder='Country'/>
      </div>
      <input type="text" placeholder='Phone'/>
    </div>
    <div className="place-order-right">
    <div className="cart-total">
          <h2>Cart Totalss</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount() == 0 ? 0 : 100}</p>
            </div>
            <hr />
            <div className="cart-total-details">
            <p>Total</p>
            <p>₹{getTotalCartAmount() == 0 ? 0 : getTotalCartAmount()+100}</p>
            </div>
          </div>
          <button >PROCEED TO PAYMENT</button>
        </div>
    </div>
   </form>
  )
}
