import { useDispatch, useSelector } from "react-redux"
import CheckoutSteps from "./checkout-steps"
import '../styles/place-order.css';
import { getTotalBill } from "../reducers";
import { useHistory } from "react-router";
const PlaceOrder = () => {
    const store = useSelector(state => state);
    let flag=false;
    const itemsPrice=getTotalBill(store.cart);
    const shippingPrice=itemsPrice>1000?0:50;
    const taxPrice=0.15*itemsPrice;
    const totalPrice=itemsPrice+shippingPrice+taxPrice;
    const dispatch=useDispatch();
    const history=useHistory();
    const handlePlaceOrder=async()=>{
        const details={orderItems:store.cart,shippingAddress:store.shippingAddress,
            paymentMethod:store.paymentMethod,itemsPrice,shippingPrice,taxPrice,totalPrice,
            user:{_id:store.user_id}
        }
        try{
            let result=await fetch('/orders',{
                method:'post',
                headers:{'Content-Type':'application/json',
                    'authorization':`Bearer ${store.token}`},
                body:JSON.stringify(details)
            }) 
            let data=await result.json();
            console.log(data)
            if(result.status===201){
                await dispatch({type:'create_order_success',payload:data.order}) 
                history.push(`/order-details/${data.order._id}`)
            }

        }catch(err){
            console.log(err)
        }

    }
    return (
        <div className='place_order'>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className='row top'>
                <div className='col-8'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {store.shippingAddress.fullName}<br />
                                    <strong>Address:</strong> {store.shippingAddress.address},
                                    {store.shippingAddress.city},{store.shippingAddress.postalCode}
                                    ,{store.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {store.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Order Items</h2>
                                {store.cart && store.cart.map((item) => {
                                    return (
                                        <div className='m-1 p-2 d-flex flex-row justify-content-around'>
                                            <img src={item.image} className='place_order_img' />
                                            <p className='col-6 para'>{item.name}</p>
                                            <p>{item.quantity} x &#8377;{item.current_price} = &#8377;{item.quantity*item.current_price}</p>
                                        </div>

                                    )
                                })}
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='col-4 p-2'>
                    <div className='card card-body'>
                        <ul>
                            <li>
                                <div>
                                    <h4>Order Summary</h4>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div className='summary_attributes'>Items</div>
                                    <div className='summary_values'>&#8377;{itemsPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div className='summary_attributes'>Shipping</div>
                                    <div className='summary_values'>&#8377;{shippingPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div className='summary_attributes'>Tax</div>
                                    <div className='summary_values'>&#8377;{taxPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div className='summary_attributes' style={{fontWeight:800}}>Order Total</div>
                                    <div className='summary_values' style={{fontWeight:800}}>&#8377;{totalPrice}</div>
                                </div>
                            </li>
                            <li>
                                <button className='place_order_button' onClick={handlePlaceOrder}>Place Order</button>
                            </li>
                        </ul>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default PlaceOrder