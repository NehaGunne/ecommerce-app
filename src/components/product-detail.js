import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/details.css';
import _ from 'lodash';
import StarRating from './star';
import Reviews from './reviews';
function ProductDetails() {
    let quantity=1;
    const dispatch = useDispatch();
    const store=useSelector(state=>state);
    let product=store.sel_product;
    const user_id=store.user_id;
    const addToCart =async () => {
        
        const details={product:{...product,quantity},_id:user_id}
        product={...product,quantity}
        try{
            let res=await fetch('/users/cart',{
                method:"post",
                headers:{"Content-Type":'application/json'},
                body:JSON.stringify(details)
            })
           if(res.status==201){
               dispatch({ type: 'add_to_cart', payload: product })
            }
            else{
                alert('Please login to add items to Cart!')
            }
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div>
        <div className='details'>
            <div>
                <img src={product.image} className='details_image' />
            </div>
            <div className="details-info">
                <h4>{product.name}</h4>
                <p>Brand: {product.brand}</p>
                <div className='product_rating'>
                    <StarRating rating={product.rating} />
                </div>
                <p>
                    MRP:
                    <span style={{ textDecoration: 'line-through' }}>
                        <small> &#8377;</small>
                        <strong>{product.original_price}</strong>
                    </span>
                </p>
                <p>
                    Price:
                    <span style={{ color: 'red' }}>
                        <small> &#8377;</small>
                        <strong>{product.current_price}</strong>
                    </span>
                </p>
                <p>You Save: <small> &#8377;</small>
                    <strong>{product.original_price - product.current_price} ({product.offer})</strong>
                </p>
                <hr/>
                <p className='desc'>Description:</p>
                    <ul>
                        {product.description.map((item)=><li key={item}>{item}</li>)}
                    </ul>
            </div>
            <div className='add_to_cart'>
                <h5>Price: <small>&#8377;</small><strong>{product.current_price}</strong></h5>
                <div className='d-flex flex-row'>
                <label htmlFor='quantity'>Quantity:</label>
                <select id='quantity' onChange={(e)=>{quantity=parseInt(e.target.value)}} className='form-control sel_inp'>
                    {_.range(1,product.count_in_stock+1).map((value)=><option key={value} value={value}>{value}</option>)}
                </select>
                </div>
                <button className='cart_btn' onClick={addToCart}>Add to Cart</button>
            </div>
        </div>
        <Reviews/>
        </div>

    )
}
export default ProductDetails;
