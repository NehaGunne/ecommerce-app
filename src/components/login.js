import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import '../styles/login.css';

const Login=()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const history=useHistory();
    const dispatch=useDispatch();
    const signIn=async(e)=>{
        e.preventDefault();
        const details={email:email,password:password}
        try{
            let res=await fetch('/users/login',{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(details)
            })
            let data=await res.json()
            
           if(res.status===200){
               dispatch({type:'user_login',payload:data})
               history.push('/');
            }
        }catch(err){
            console.log(err);
        }
    }
    const register=(e)=>{
        e.preventDefault();
        history.push('/signup')
        
    }
    return(
        <div className='login'>
            <Link to ='/'>
                <img src='https://actshousing.org/wp-content/uploads/2014/10/High_Res_Logo_Teal_Shadow.png'
                className='login_logo'/>
            </Link>
            <div className='login_container'>
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input value={email} type='text'
                    onChange={(e)=>setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input type='password' value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
                    <button className='login_signin'
                    type="submit" onClick={signIn}>Sign In</button>
                    <h5 style={{marginTop:'5px'}}>Don't have an account yet?</h5>
                    <button className='login_register'
                    onClick={register}>Create an account</button>
                </form>
            </div>

        </div>

    )
}

export default Login;