import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "./star";


const CartItems=()=>{
    const store=useSelector(state=>state);
    const cart=store.cart;
    console.log(store)
    const user_id=store.user_id;
    const dispatch=useDispatch();
    const removeFromCart=async(product)=>{
        const details={product_id:product._id,_id:user_id}
        try{
            let res=await fetch('/users/cart',{
                method:"delete",
                headers:{"Content-Type":'application/json'},
                body:JSON.stringify(details)
            })
           
           if(res.status==200){
               dispatch({ type: 'remove_from_cart', payload: product })
            }
        }
        catch(err){
            console.log(err);
        }
    }
    if(cart.length===0){
        return <h3 style={{color:'gray',textAlign:'center'}}>The Cart is Empty!</h3>
    }
    return(
        <div>
            {cart.map((each)=>{
                return(
                    <div className='cart_item'>
                        <div className='d-flex flex-row'>
                            <div>
                                 <img src={each.image} className='cart_img'/> 
                            </div>
                           <div>
                               <p>{each.name}</p>
                               <strong>&#8377;{each.current_price}</strong>
                               <p>Quantity: {each.quantity}</p>
                               <StarRating rating={each.rating}/>
                               <button onClick={()=>removeFromCart(each)} className='subtotal_button mt-3'>Remove from Cart</button>
                           </div>
                        </div>
                        
                    </div>
                )
            })}


        </div>

    )
}

export default CartItems;