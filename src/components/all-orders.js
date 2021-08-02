import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router";

const AllOrders=()=>{
    const history=useHistory();
    const [orders,setOrders]=useState([]);
    const getAllOrders=async()=>{
        try{
            const result=await fetch(`/orders`)
            const data=await result.json(); 
            setOrders(data)
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getAllOrders();
    },[])
    if(orders.length===0){
        return <h3 style={{textAlign:'center',color:'teal',padding:'30px'}}>Orders are Empty!</h3>
    }
    return(
        <div>
            <h3 style={{color:'teal',padding:'20px',margin:'20px',textAlign:'center'}}>All Orders</h3>
            <table className='table'>
                <thead style={{color:'purple'}}>
                    <th>ID</th>
                    <th>USERNAME</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>ACTIONS</th>
                </thead>
                <tbody style={{color:'rgb(194, 55, 194)'}}>
                    {orders && orders.map((order)=>{
                        return(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.shippingAddress.fullName}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid? order.paidAt.substring(0,10) : 'No'}</td>
                                <td>{order.isDelivered?order.deliveredAt.substring(0,10):'Not Delivered'}</td>
                                <td>
                                    <button className='table_btn' style={{backgroundColor:'rgb(216, 213, 216)'}} onClick={()=>history.push(`/order-details/${order._id}`)}
                                    >Details</button>
                                </td>
                            </tr>
                        )
                    })} 
                </tbody>
            </table>

        </div>
    )
}

export default AllOrders