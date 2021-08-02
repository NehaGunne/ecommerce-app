import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { totalNoItems } from '../reducers';
import '../styles/payment.css';
import CartItems from './cart-items';
import CheckoutSteps from "./checkout-steps";
const Payment = () => {
    const dispatch=useDispatch();
    const history=useHistory();
    const store = useSelector(state => state);
    const [paymentMethod,setPaymentMethod]=useState('paypal');
    const email = store.email;
    const shippingAddress = store.shippingAddress;
    if(!shippingAddress){
        history.push('/shipping')
    }

    const submitPayment=()=>{
            dispatch({type:'payment_method',payload:paymentMethod})
            history.push('/place-order')
    }

    return (
        <div className='payment'>
            <CheckoutSteps step1 step2 step3/>
            <div className='payment_container'>
                {/* <h3>
                    Checkout(<Link to ='/checkout'>{totalNoItems(cart)} items</Link>)
                </h3> */}
                <h3>
                    Payment Section
                </h3>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Delivery address</h3>
                    </div>
                    <div className='payment_address'>
                        <p>{email}</p>
                        <p>{store.shippingAddress?.address}</p>
                        <p>{store.shippingAddress?.city},{store.shippingAddress?.postalCode}</p>
                        <p>{store.shippingAddress?.country}</p>
                    </div>

                </div>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Review items and Delivery.</h3>
                    </div>
                    <div className='payment_items' style={{ maxWidth: '500px' }}>
                        <CartItems />
                    </div>

                </div>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment_details ml-3'>
                        <div>
                            <input type='radio' id='paypal' name='payment' value='paypal'
                            onChange={(e)=>setPaymentMethod(e.target.value)} checked/>
                            <label htmlFor='paypal'>PayPal</label>
                        </div>
                        <div>
                            <input type='radio' id='gpay'  name='payment' value='Gpay'
                            onChange={(e)=>setPaymentMethod(e.target.value)}/>
                            <label htmlFor='gpay'>Google Pay</label>
                        </div>
                        <div>
                            <input type='radio' id='cod'  name='payment' value='COD'
                            onChange={(e)=>setPaymentMethod(e.target.value)}/>
                            <label htmlFor='cod'>Cash on Delivery</label>
                        </div>
                        <div>
                            <button className='payment_button w-100'
                            onClick={submitPayment}>Continue</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    )
}
export default Payment;