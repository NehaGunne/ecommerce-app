import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const AllUsers=()=>{
    const [users,setUsers]=useState([]);
    const req=useSelector(state=>state.adminRequest);
    const history=useHistory();
    const usersList=async()=>{
        try{
            const result=await fetch(`/users`);
            const data=await result.json();
            setUsers(data)
        }
        catch(err){
            console.log(err)
        }
    }
    const sellersList=async()=>{
        try{
            const result=await fetch(`/users/sellers`);
            const data=await result.json();
            setUsers(data)
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{ 
        if(req==='users'){
            usersList()
        }else{
            sellersList()
        }
    },[])
    if(users.length===0){
        return <h3 style={{textAlign:'center',color:'teal',padding:'30px'}}>There are no {req==='users'?'Users':'Sellers'}!</h3>
    }
    return(
        <div>
            <h3 style={{color:'teal',padding:'20px',margin:'20px',textAlign:'center'}}>
                {req==='users'?'Users':'Sellers'} Of eStore</h3>
            <table className='table m-1'>
                <thead style={{color:'purple'}}>
                    <th>ID</th>
                    <th>USERNAME</th>
                    <th>EMAIL</th>
                    <th>PHONE</th>
                   {/*  <th>ACTIONS</th> */}
                </thead>
                <tbody style={{color:'rgb(194, 55, 194)'}}>
                    {users?users.map((user)=>{
                        return(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.number}</td>
                               {/*  <td>
                                    <button className='table_btn' onClick={()=>history.push(`/order-details/${user._id}`)}
                                    >Details</button>
                                </td> */}
                            </tr>
                        )
                    }):<h5>There are no Orders</h5>} 
                </tbody>
            </table>

        </div>

    )
}
export default AllUsers;