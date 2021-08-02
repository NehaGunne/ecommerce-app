import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "./checkout-steps";
import '../styles/checkout.css';
import { useHistory } from "react-router";

const Shipping = () => {
    const history=useHistory();
    const fullName=useSelector(state=>state.username);
    const isAuth=useSelector(state=>state.isAuth);
    if(!isAuth){
        history.push('/login')
    }
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch({type:'save_shipping_address',payload:{fullName,address,city,postalCode,country}}) 
        history.push('/payment')
    }
    return (
        <div>
        <CheckoutSteps step1 step2 ></CheckoutSteps>
        <div className="form">
          <form onSubmit={submitHandler} >
            <ul className="form-container">
              <li>
                <h2 style={{color:'rgb(88, 170, 202)'}}>Shipping</h2>
              </li>
    
              <li>
                <label htmlFor="address">
                  Address
              </label>
                <input type="text" className='form-control' name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
                </input>
              </li>
              <li>
                <label htmlFor="city">
                  City
              </label>
                <input type="text" className='form-control' name="city" id="city" onChange={(e) => setCity(e.target.value)}>
                </input>
              </li>
              <li>
                <label htmlFor="postalCode">
                  Postal Code
              </label>
                <input type="text" className='form-control' name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}>
                </input>
              </li>
              <li>
                <label htmlFor="country">
                  Country
              </label>
                <input type="text" className='form-control' name="country" id="country" onChange={(e) => setCountry(e.target.value)}>
                </input>
              </li>
    
    
              <li>
                <button type="submit" className="subtotal_button">Continue</button>
              </li>
    
            </ul>
          </form>
        </div>
      </div>
    )
}
export default Shipping;