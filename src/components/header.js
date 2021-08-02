import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
//import SearchIcon from '@material-ui/icons/Search';
import '../styles/header.css';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { totalNoItems } from '../reducers';

const Header = () => {
  const store=useSelector(state=>state);
  const dispatch=useDispatch();
  const history=useHistory();
  const username=store.username;
  const isAuth=store.isAuth;
  const isAdmin=store.isAdmin;
  const isSeller=store.isSeller;
  const [category, setCategory] = useState(null)
  let search_category='All';
  let search_text='';
  useEffect(() => {
    fetch('/products/category')
      .then((res) => res.json())
      .then((data) => {
        setCategory(data)
      })
      .catch((err) => console.log(err))
  }, [])

  const searchProducts=async()=>{
    if(search_text==='' && search_category!=='All'){
      try{
        let res=await fetch('/products/category/'+search_category);
        let data=await res.json();
        if(res.status===200){
          dispatch({type:'search_products',payload:data})
          history.push('/searched-products');
        }
      }catch(err){
        console.log(err)
      }
    }
    else if(search_text==='' && search_category==='All'){
      history.push('/')
    }
    else{
      try{
        let result=await fetch('/products/search?q='+search_text)
        let data=await result.json();
        if(result.status===200){
          dispatch({type:'search_products',payload:data})
          history.push('/searched-products');
        }
      }
      catch(err){
        console.log(err)
      }
    }
  }

  const signOut=async()=>{
    try{
      let res=await fetch('/users/logout')
      if(res.status===200){
        dispatch({type:'log_out'})
      }

    }
    catch(err){
      console.log(err)
    }

  }
  return (
    <div className='header'>
      <Link to='/'>
        {/* <h3 className='store_name'>My store</h3> */}
        <img src='https://actshousing.org/wp-content/uploads/2014/10/High_Res_Logo_Teal_Shadow.png'
         className='header_logo'/>
      </Link>
      <div className='header_search'>
        <select className='header_searchInput header_select' onChange={(e)=>search_category=e.target.value}>
          <option value='All'>All</option>
          {category && category.map((each) => {
            return <option value={each} key={each}>{each}</option>
          })}

        </select>
        <input className='header_searchInput' onChange={(e)=>search_text=e.target.value} type='text' />
       {/*  <SearchIcon className='search_icon' /> */}
       <img onClick={searchProducts}
       src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/600px-Search_Icon.svg.png' className='search_icon'/>
      </div>
      {!isAuth && <div className='header_nav'>
        <Link to='/login'>
          <div className='header_option'>
            <span className='option_lineOne'>Hello,{username}</span>
            <span className='option_lineTwo'>Sign in</span>
          </div>
        </Link>
      </div>}
      {isAuth && <div className='header_nav'>
        <Link to='/'>
          <div className='header_option' onClick={signOut}>
            <span className='option_lineOne'>Hello,{username}</span>
            <span className='option_lineTwo'>Sign out</span>
          </div>
        </Link>
      </div>}
      <Link to='/order-history'>
        <div className='header_nav'>
          <div className='header_option'>
            <span className='option_lineOne'>Returns</span>
            <span className='option_lineTwo'>& Orders</span>
          </div>
        </div>
      </Link>
      {isAdmin && 
      <Link to='admin-dashboard'>
       <div className='header_nav'>
        <div className='header_option'>
          <span className='option_lineOne'>Admin</span>
          <span className='option_lineTwo'>Dashboard</span>
        </div>
      </div>
      </Link>}
      {isSeller && 
      <Link to='add-product'>
       <div className='header_nav'>
        <div className='header_option'>
          <span className='option_lineOne'>Add</span>
          <span className='option_lineTwo'>Products</span>
        </div>
      </div>
      </Link>}
      <Link to='/checkout'>
        <div className='basket'>
          <ShoppingCartIcon />
          <span className='option_lineTwo basket_count'>{totalNoItems(store.cart)}</span>
        </div>
      </Link>

    </div>
  );
}

export default Header;
