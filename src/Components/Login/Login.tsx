import React,{useState} from 'react'
import './Login.css'
import content from '../../Assets/Content'
import { useNavigate } from 'react-router-dom'
import { FaEyeSlash,FaEye } from "react-icons/fa";

interface Props {
   displayNav : boolean
   setDisplayNav : any
   isLogin : boolean
   setIsLogin : any
 }

export const Login = ({displayNav,setDisplayNav,isLogin,setIsLogin}:Props) => {
  const Navigate = useNavigate();
  const [passwordType, setPasswordType] = useState<string>("password")
   const [passwordInput, setPasswordInput] = useState<string>("");
  const handleLogin = () => {
     setDisplayNav(true)
     setIsLogin(true)
     Navigate('/plans')
  }

const handlePasswordChange =(evnt : any)=>{
   setPasswordInput(evnt.target.value);
}

const togglePassword =()=>{
 if(passwordType==="password")
 {
  setPasswordType("text")
  return;
 }
 setPasswordType("password")
}
    return(
        
        <div className='login-container'>
          
           <div className='login-logo'><img src={content.images.logo} className="login-logo-image" alt=""/></div>
          
          
        
           <div className='login-content'>
          
           <div className='login-text1'>
           Welcome back!
           </div>
           <div className='login-text2'>
               We visualize you to be One and Only. 
           </div>
           <div className='login-google'>
              
              <img src={content.images.google} alt = ''/><span className='login-google-text' >Continue with Google</span>
              
            </div>
            <div className='login-text4'> 
              - OR -
           </div>

           

            <form action="" >

            <div className="login-email-input-container">
            <div className='login-email-icon'><i className="zmdi zmdi-email material-design-iconic-font"></i></div>
                 <input className="login-email-input-field" autoComplete='off' type="text" placeholder='Type your email' name="email"/>
             </div>

             <div className="login-pwd1-input-container">
            <div className='login-pwd1-icon1'>< i className="zmdi zmdi-lock material-design-iconic-font"></i></div>
                 <input className="login-pwd1-input-field" autoComplete='off'  name="password1" type={passwordType} onChange={handlePasswordChange} value={passwordInput} placeholder='Type your password' />
                 <div className='login-pwd1-icon2'  onClick={togglePassword}>{ passwordType==="password"? <FaEyeSlash/> :<FaEye/> }</div>
             </div>
             <div className='login-forgot-pwd'>
             Forgot your password?
             </div>
             

             
            <div className='login-checkbox-content'>
               <input type="checkbox" id="terms" name="terms" value="terms"/>
               <label htmlFor="terms"> Keep me signed in</label>
            </div>
            <button className='login-button' type='submit' id='submitBtn' onClick={()=>handleLogin()}>LOGIN</button>
           
              </form>
              <div className='text6'>Do you not have an account?&nbsp;<span className='login-boldtext' onClick={()=>Navigate('/signup')}>Sign Up</span>
                 </div>  
          
           </div>
           </div>
           
           
           
           
    )}