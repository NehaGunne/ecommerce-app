import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router";

const OrderHistory=()=>{
    const store=useSelector(state=>state);
    const dispatch=useDispatch();
    const history=useHistory();
    const orders=store.allOrders;
    const ordersList=async()=>{
        try{
            const result=await fetch(`/orders/${store.user_id}`,{
                headers:{Authorization:`Bearer ${store.token}`}
            })
            const data=await result.json();
             dispatch({type:'get_orders_of_user',payload:data})  
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        ordersList();
    },[])
    if(!store.isAuth){
        return <h3 style={{textAlign:'center',color:'purple',padding:'30px'}}>Please Login to view your Orders!</h3>
    }
    else if(orders.length===0){
        return <h3 style={{textAlign:'center',color:'teal',padding:'30px'}}>Orders are Empty!</h3>
    }
    return(
        <div>
            <h1>Order History</h1>
            <table className='table'>
                <thead>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>ACTIONS</th>
                </thead>
                <tbody>
                    {orders?orders.map((order)=>{
                        return(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid? moment(order.paidAt).format('ll') : 'No'}</td>
                                <td>{order.isDelivered? moment(order.deliveredAt).format('ll'):'Not Delivered'}</td>
                                <td>
                                    <button className='table_btn' onClick={()=>history.push(`/order-details/${order._id}`)}
                                    >Details</button>
                                </td>
                            </tr>
                        )
                    }):<h5>There are no Orders</h5>} 
                </tbody>
            </table>

        </div>
    )
}

export default OrderHistory