import '../styles/checkout.css';
import Subtotal from './subtotal';
import {useSelector} from 'react-redux';
import CartItems from './cart-items';
import CartCarousel from "./cart-carousel";
const Checkout=()=>{
    const store=useSelector(state=>state)
    
    return(
        <div className='checkout'>
            <div className='checkout_left'>
                <CartCarousel/>
                {/* <img className='checkout_add'
                src='https://tse4.mm.bing.net/th?id=OIP.C2IP63a6JAYGTCDgSYl8bQHaCe&pid=Api&P=0&w=434&h=145.jpg'/> */}
                <div>
                    <h2 className='checkout_title'>Your Shopping Cart</h2>
                </div>
                <CartItems/>
            </div>
            <div className='checkout_right'>
               <Subtotal/>
            </div>

        </div>

    )
}

export default Checkout;