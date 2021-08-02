import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StarRating from "./star";

const Product = (props) => {
    const product = props.product;
    const dispatch = useDispatch();
    return (
        <Link to={`/details/${product._id}`} style={{ textDecoration: 'none' }}>
        <div className='product col-4 shadow' onClick={() => dispatch({ type: 'sel_product', payload: product })}>
            <div className='product_info'>
                    <p>{product.name}</p>
                    <p className='product_price' style={{ color: 'red' }}>
                        <small>&#8377;</small>
                        <strong>{product.current_price}</strong>
                        <span style={{
                            textDecoration: 'line-through', color: 'black',
                            fontSize: '14px', marginLeft: '5px'
                        }}>
                            <small>&#8377;</small>
                            <strong>{product.original_price}</strong>
                        </span>
                    </p>
                    <div className='product_rating'>
                        <StarRating rating={product.rating} />
                    </div>
                
            </div>
            <img src={product.image} />
           {/*  <button onClick={() => addToCart(product)}>Add to Cart</button> */}
        </div>
        </Link>
    )
}
export default Product;