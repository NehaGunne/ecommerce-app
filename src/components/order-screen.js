import { useDispatch, useSelector } from "react-redux"
import '../styles/place-order.css';
import { useEffect, useState } from "react";
import {PayPalButton} from 'react-paypal-button-v2'
import { useParams } from "react-router";
import moment from "moment";

const OrderScreen = () => {
    const {_id}=useParams();
    const store = useSelector(state => state);
    const successPay=store.successPay;
    const [sdkReady,setSdkReady]=useState(false);
    const [order,setOrder]=useState(null)
    const dispatch=useDispatch();
    const getOrdersById=async()=>{
        try{
            const result=await fetch(`/orders/created-order/${_id}`,{
                headers:{Authorization:`Bearer ${store.token}`}
            })
            const data=await result.json();
            if(result.status===200){
                await setOrder(data)
            }else if(data.message){
                setOrder('invalid user')
            }
            
        }
        catch(err){
            console.log(err)
        }
    }
    const addPaypalScript=async()=>{
        try{
            const result=await fetch('/orders/config/paypal')
            const data=await result.json();
            console.log(data)
            const script=document.createElement('script');
            script.type='text/javascript'
            script.src=`https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async=true;
            script.onload=()=>{
                setSdkReady(true);
            }
            document.body.appendChild(script);

        }catch(err){
            console.log(err);
        }
    }
    const successPaymentHandler=async(paymentResult)=>{
        const token=store.token;
        try{
            const result=await fetch(`/orders/${order._id}/pay`,{
                method:'post',
                headers:{'Authorization':`Bearer ${token}`,
                            'Content-Type':'application/json'},
                body:JSON.stringify(paymentResult)
                })
            const data=await result.json();
            console.log(result,data)
            if(result.status===201){
                dispatch({type:'order_pay_success',payload:data})
            }
        }
        catch(err){
            console.log(err)
        }
    }
    
    useEffect(()=>{
        if(order===null || successPay){
            getOrdersById();
        }else{
            if(!store.createdOrder.isPaid){  
                if(!window.paypal){
                    addPaypalScript();
                }
                else{
                    setSdkReady(true)
                }
            }
        }
    },[dispatch,order,sdkReady,successPay])
    if(order===null){
        return <h1>Loading...</h1>
    }
    else if(order==='invalid user'){
        return <h3 className='text-danger text-center m-3'>401 You are not Authorized to view these details!</h3>
    }
    return (
        <div className='place_order'>
            <div className='row top'>
                    <h3 className='mt-5 ml-5 p-2'>Order {order._id}</h3>
                <div className='col-8'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {order.shippingAddress.fullName}<br />
                                    <strong>Address:</strong> {order.shippingAddress.address},
                                    {order.shippingAddress.city},{order.shippingAddress.postalCode}
                                    ,{order.shippingAddress.country}
                                </p>
                                {order.isDelivered?<p className='message_success'>Delivered At: {order.deliveredAt}</p>
                                :<p className='message_danger'>Not Delivered</p>}
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {order.paymentMethod}
                                </p>
                                {order.isPaid?<p className='message_success'>Paid At: {moment(order.paidAt).format('hh:mm')} on {moment(order.paidAt).format('ll')}</p>
                                :<p className='message_danger'>Not Paid</p>}
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Order Items</h2>
                                {order.orderItems && order.orderItems.map((item) => {
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
                                    <div className='summary_values'>&#8377;{order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div className='summary_attributes'>Shipping</div>
                                    <div className='summary_values'>&#8377;{order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div className='summary_attributes'>Tax</div>
                                    <div className='summary_values'>&#8377;{order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row mb-3'>
                                    <div className='summary_attributes' style={{fontWeight:800}}>Order Total</div>
                                    <div className='summary_values' style={{fontWeight:800}}>&#8377;{order.totalPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                               {!order.isPaid && sdkReady &&
                               <PayPalButton amount={order.totalPrice}
                               onSuccess={successPaymentHandler}></PayPalButton>}
                            </li>
                        </ul>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default OrderScreen;