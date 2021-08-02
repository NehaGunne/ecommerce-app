import { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import SignupDialog from './signup-dialog';
import '../styles/login.css';
import { useDispatch } from "react-redux";
const Signup=()=>{
    const history=useHistory();
    const dispatch=useDispatch();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [username,setUsername]=useState('');
    const [number,setNumber]=useState('');
    const [dialog,setDialog]=useState(false);
    const [isSeller,setIsSeller]=useState(false);
    const sendOtp=async(e)=>{
        e.preventDefault()
        const details={"number":number}
        try{
            let res=await fetch('/users/otp',{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(details)
            })
            let data=await res.json();
            console.log(res,data);
        }catch(err){
            console.log(err);
        }
        setDialog(true);
    }
    const handleClose = () => {
        setDialog(false);
      };

    const register=async(code)=>{
        const details={username,number,email,password,isSeller,code}
        try{
            let res=await fetch('/users/signup',{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(details)
            })
            let data=await res.json();
            console.log(res,data);
            if(res.status===201){
                dispatch({type:'user_login',payload:data})
                history.push('/')
                setDialog(false);
            }
        }
        catch(err){
            console.log(err)
        }
    }
    
    return(
        <div className='login'>
            <Link to ='/'>
                <img src='https://actshousing.org/wp-content/uploads/2014/10/High_Res_Logo_Teal_Shadow.png'
                className='login_logo'/>
            </Link>
            <div className='login_container'>
                <h1>Sign-up</h1>
                <form>
                <   h5>Your Name</h5>
                    <input value={username} type='text'
                    onChange={(e)=>setUsername(e.target.value)}/>
                    <h5>Mobile Number</h5>
                    <input value={number} type='tel'
                    onChange={(e)=>setNumber(e.target.value)}/>
                    <h5>E-mail</h5>
                    <input value={email} type='text'
                    onChange={(e)=>setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input type='password' value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
                    <h5>Sign up as:</h5>
                    <select onChange={(e)=>e.target.value==='seller'?setIsSeller(true):setIsSeller(false)}>
                        <option value='user'>User</option>
                        <option value='seller'>Seller</option>
                    </select>
                    <button className='login_signin'
                    type="submit" onClick={sendOtp}>Continue</button>
                    <SignupDialog state={dialog} handleClose={handleClose}
                    register={register}/>
                </form>
            </div>

        </div>

    )
}

export default Signup;