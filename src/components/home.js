import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/home.css';
import HomeCarousel from './homeCarousel';
import PaginationControlled from './pagination';
import ProductCont from './product-cont';
const Home=()=>{
    const products=useSelector(state=>state.products);
    const dispatch=useDispatch();
    const [currentPage,setCurrentPage]=useState(1);
    const[productsPerPage,setProductsPerPage]=useState(6);
    useEffect(()=>{
        fetch('/products').then((res)=>res.json())
        .then((data)=>{
            dispatch({type:'get_all_products',payload:data})
        })
    },[])
    if(products.length===0){
        return <h3 className='text-center'>Loading...</h3>
    }
    const indexOfLastProduct=currentPage*productsPerPage;
    const indexOfFirstProduct=indexOfLastProduct-productsPerPage;
    const currentProducts=products.slice(indexOfFirstProduct,indexOfLastProduct);
    const totalPages=Math.ceil(products.length/productsPerPage);
    const paginate=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    return(
        <div>
            <HomeCarousel/>
            <div className='d-flex flex-row justify-content-center home'>
               <ProductCont products={currentProducts} />
            </div>
            <PaginationControlled totalPages={totalPages} paginate={paginate}/>
        </div>
    )
}
export default Home;