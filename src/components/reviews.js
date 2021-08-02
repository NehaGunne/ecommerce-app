import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import StarRating from "./star";
import ReactStars from 'react-rating-stars-component';
import moment from "moment";

const Reviews=()=>{
    const dispatch=useDispatch();
    const store=useSelector(state=>state)
    const productId=store.sel_product._id
    const username=store.username;
    const userId=store.user_id
    const reviews=store.reviews;
    let rating=0,comment='';
    const getAllReviews=async()=>{
        try{
            const result=await fetch(`/reviews/${productId}`)
            const data=await result.json();
            if(result.status===200){
                dispatch({type:'all_reviews',payload:data})
            }

        }catch(err){
            console.log(err)
        }
    }
    const addReview=async()=>{
        const details={productId,rating,comment,username,userId}
        try{
            const result=await fetch(`/reviews/`,{
                method:'post',
                headers:{'Content-Type':"application/json"},
                body:JSON.stringify(details)
            })
            const data=await result.json();
            if(result.status===201){
                dispatch({type:'add_review',payload:data.result})
            }
            else{
                alert('Please Login to add Review!')
            }

        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getAllReviews();
    },[])

    return(
        <div className='reviews d-flex flex-row'>
            <div className='col-7'>
                <h2>Reviews</h2>
                {reviews?reviews.length>0 ? reviews.map((review)=>{
                    return(
                        <div className='card review_details'>
                            <h3>{review.username}</h3>
                            <StarRating rating={review.rating}/>
                            <p>Reviewed {Math.abs(moment(review.createdAt).diff(this,'hours'))<=24?
                           ` at ${moment(review.createdAt).format('hh:mm')}`:` on ${moment(review.createdAt).format('ll')}`}</p>
                            <p>{review.comment}</p>
        
                        </div>
                        )
                }):<h3>There are no reviews yet!</h3>:<h3>Unable to fetch Reviews!</h3>}
            </div>
            <div className='col-4 review_details'>
                <h3>Add a Review</h3>
                <p className='mt-4'>Select rating:</p>
               {/*  <select className='form-control' onChange={(e)=>rating=e.target.value}>
                   { [1,2,3,4,5].map((each)=><option value={each}>{each}</option>) }
                </select> */}
                <ReactStars size={35} onChange={(value)=>{rating=value;console.log(typeof(rating))}}
                isHalf={true}/>
                <p className='mt-2'>Write your review here:</p>
                <textarea className='form-control' rows={5} onChange={(e)=>comment=e.target.value}/>
                <button className='btn btn-info m-3'
                onClick={addReview}>Submit</button>

            </div>

        </div>
    )
}

export default Reviews;