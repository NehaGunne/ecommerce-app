import CurrencyFormat from 'react-currency-format';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { getTotalBill, totalNoItems } from '../reducers';
const Subtotal=()=>{
    const history=useHistory();
    const cart=useSelector(state=>state.cart);
    return(
        <div className='subtotal'>
            <CurrencyFormat
            renderText={(value)=>(
                <>
                <p>
                    Subtotal ({totalNoItems(cart)} items):
                    <strong>&#8377;{value}</strong>
                </p>
                <small className='subtotal_gift'>
                    <input type='checkbox'/>
                    This order contains a gift
                </small>
                </>
            )}
            decimalScale={2}
            value={getTotalBill(cart)}
            displayType={'text'}
            thousandSeperator={true}
            
            />
            <button onClick={()=>history.push('/shipping')} className='subtotal_button'>Proceed to checkout</button>

        </div>
    )
}
export default Subtotal;