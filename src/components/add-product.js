import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import '../styles/checkout.css';
import { useHistory } from "react-router";

const AddProduct = () => {
    const history=useHistory();
    const [name,setName]=useState('')
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [original_price, setOriginal_price] = useState('');
    const [current_price, setCurrent_price] = useState('');
    const [count_in_stock, setCount_in_stock] = useState('');
    const [brand, setBrand] = useState('');
    const [gender, setGender] = useState('');
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');
    const [errMsg,setErrMsg]=useState('')
    const dispatch = useDispatch();
    const offer=(parseInt((original_price)-parseInt(current_price))/parseInt(original_price))*100
    const addProduct = async(e) => {
         e.preventDefault();
         offer=Math.ceil(offer)
         const details={name,category,image,
          original_price:parseInt(original_price),current_price:parseInt(current_price),
          count_in_stock:parseInt(count_in_stock),
          brand,gender,rating:parseFloat(rating),description,offer:`${offer}%`
        }
       try{
         let result=await fetch('/products',{
           method:'post',
           headers:{'Content-Type':'application/json'},
           body:JSON.stringify(details)
         })
         let data=await result.json();
         console.log(data)
         if(result.status===201){
           alert('Product added Successfully')
           setErrMsg('');
         }
         else{
          setErrMsg('!Please fill all details')
         }
       }
       catch(err){
         console.log(err)
       }
        
    }
    return (
        <div>
        <div className="form">
          <form onSubmit={addProduct} >
            <ul className="form-container">
              <li>
                <h2 style={{color:'rgb(88, 170, 202)'}}>Add Product</h2>
              </li>
    
              <li>
                <label htmlFor="name">
                  Name
              </label>
                <input type="text" className='form-control' name="name" id="name" onChange={(e) => setName(e.target.value)}>
                </input>
              </li>
              <li>
                <label htmlFor="category">
                Category
              </label>
                <input type="text" className='form-control' name="category" id="category" onChange={(e) => setCategory(e.target.value)}>
                </input>
              </li>
              <li>
                <label htmlFor="image">
                  Image
              </label>
                <input type="text" className='form-control' name="image" id="image" onChange={(e) => setImage(e.target.value)}>
                </input>
              </li>
              <div className='row'>
                <li className='col-6'>
                  <label htmlFor="original_price">
                    MRP price
                </label>
                  <input type="number" className='form-control' name="original_price" id="original_price" onChange={(e) => setOriginal_price(e.target.value)}>
                  </input>
                </li>
                <li className='col-6'>
                  <label htmlFor="current_price">
                    Discount price
                </label>
                  <input type="number" className='form-control' name="current_price" 
                  id="current_price" onChange={(e) => setCurrent_price(e.target.value)}>
                  </input>
                </li>

              </div>
              <div className='row'>
                <li className='col-6'>
                  <label htmlFor="count_in_stock">
                    In Stock
                </label>
                  <input type="number" className='form-control' name="count_in_stock" 
                  id="count_in_stock" onChange={(e) => setCount_in_stock(e.target.value)}>
                  </input>
                </li>
                <li className='col-6'>
                  <label htmlFor="brand">
                  Brand
                </label>
                  <input type="text" className='form-control' name="brand" 
                  id="brand" onChange={(e) => setBrand(e.target.value)}>
                  </input>
                </li>
              </div>
              <div className='row'>
                <li className='col-6'>
                  <label htmlFor="gender">
                    For Gender
                </label>
                  <input type="text" className='form-control' name="gender" 
                  id="gender" onChange={(e) => setGender(e.target.value)}>
                  </input>
                </li>
                <li className='col-6'>
                  <label htmlFor="rating">
                  Rating
                </label>
                  <input type="number" className='form-control' name="rating" 
                  id="rating" onChange={(e) => setRating(e.target.value)}>
                  </input>
                </li>
              </div>
              <li>
                <label htmlFor="description">
                 Description
              </label>
                <textarea type="text" className='form-control' name="description" 
                id="description" onChange={(e) => setDescription(e.target.value)}>
                </textarea>
              </li>
    
    
              <li>
                <button type="submit" className="subtotal_button">Add Product</button>
              </li>
              <li className='err_msg'>{errMsg}</li>
            </ul>
          </form>
        </div>
      </div>
    )
}
export default AddProduct;