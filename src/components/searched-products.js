import { useSelector } from "react-redux";
import ProductCont from "./product-cont";
const SearchedProducts=()=>{
    const products=useSelector(state=>state.searched_products)
    if(products.length===0){
        return <h3 className='text-center'>No matched items!</h3>
    }
    return(
        <div className='d-flex flex-row justify-content-center'>
               <ProductCont products={products} />
        </div>
    )
}
export default SearchedProducts;