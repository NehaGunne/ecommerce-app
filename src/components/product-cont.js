import Product from "./product";

const ProductCont=(props)=>{
    return(
        <div className='container'>
            <div className='row'>
                {props.products.map((each)=><Product key={each._id} product={each}/>)}
            </div>
        </div>
    )
}
export default ProductCont;