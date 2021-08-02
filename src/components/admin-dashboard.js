import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import '../styles/admin.css';

const Dashboard=()=>{
    const history=useHistory();
    const dispatch=useDispatch();
    return(
        <div class='m-5'>
            <div className='each_div'>
                <p onClick={()=>{dispatch({type:'admin_request',payload:'users'});history.push('/all-users')}}>View All Users</p>
            </div>
            <div className='each_div'>
                <p onClick={()=>history.push('/all-orders')}>View All Orders</p>
            </div>
            <div className='each_div'>
                <p onClick={()=>{dispatch({type:'admin_request',payload:'sellers'});history.push('/all-users')}}>View All Sellers</p>
            </div>
           {/*  <div className='each_div'>
                <p onClick={()=>history.push('/all-orders')}>View Requests</p>
            </div> */}
            <div className='each_div'>
                <p onClick={()=>history.push('/add-product')}>Add Product</p>
            </div>

        </div>
    )
}

export default Dashboard;