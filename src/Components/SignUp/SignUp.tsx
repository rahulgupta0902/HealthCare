import React,{useState}  from 'react';
import content from '../../Assets/Content'
import './SignUp.css'
import { useNavigate } from 'react-router';
import { FaEyeSlash,FaEye } from "react-icons/fa";

interface Props {
   displayNav : boolean
   setDisplayNav : any
   isLogin : boolean
   setIsLogin : any
 }

export const SignUp = ({displayNav,setDisplayNav,isLogin,setIsLogin}:Props) => {

   const Navigate = useNavigate();
   const [passwordType,setPasswordType] = useState<string>("password")
   const [passwordInput,setPasswordInput] = useState<string>("");
   const [x,setX] = useState<string>('');
   const [y,setY] = useState<string>('progress-bar progress-bar-danger');
   const [z,setZ] = useState<number>(0);

   const handleSignup =()=>{
      setDisplayNav(true)
      setIsLogin(true)
      Navigate("/plans")
   }

   const handleGoToLogin = () => {
      setDisplayNav(false)
      Navigate("/login")
   }

   const handlePasswordChange =(event : any)=>{

      if(event.target.value.length>=8)
      setY('progress-bar progress-bar-success')
      else
      setY('progress-bar progress-bar-danger')

      setPasswordInput(event.target.value)
      setX(String((event.target.value.length)*10) + '%')
      setZ(event.target.value.length)
      //console.log(event.target.value.length)
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
        <div className='signup-container'>
         
           <div className='logo'><img src={content.images.logo} className="logo-image" alt=""/></div>
           
           <div className='signup-content'>
          
           <div className='text1'>
           Lovely to meet you!
           </div>
           <div className='text2'>
               We visualize you to be One and Only. 
           </div>
           <div className='google'>
              
              <img src={content.images.google} alt =''/><span className='google-text'>Continue with Google</span>
              
            </div>
            <div className='text4'> 
              - OR -
           </div>

         

            <form action="" >

            <div className="email-input-container">
            <div className='email-icon'><i className="zmdi zmdi-email material-design-iconic-font"></i></div>
                 <input className="email-input-field" autoComplete='off' type="text" placeholder='Type your email' name="email"/>
             </div>

             <div className="pwd1-input-container">
            <div className='pwd1-icon1'>< i className="zmdi zmdi-lock material-design-iconic-font"></i></div>
                 <input className="pwd1-input-field" name="password1" autoComplete='off' type={passwordType} onChange={handlePasswordChange} value={passwordInput} placeholder='Type your password' />
                 <div className='pwd1-icon2' onClick={togglePassword}>{ passwordType==="password"? <FaEyeSlash/> :<FaEye/> }</div>
             </div>
             {(z>=1 && z<=7)?(
             <div id='pwd-progress-bar' className='pwd-progress-bar'>
             <div className="progress">
               <div className={y} role="progressbar" 
               
               aria-valuemin={0} aria-valuemax={100} style={{width:x}}>
                 
               </div>
             </div>
             {(z>=1 && z<=7)?(<>
             Password is too small.
             </>):('')}
             </div>):('')}


             <div className='text5'> 
              - OR -
              <br></br>
              <br></br>
              If you are signing up as a part of an organization, enter your passcode:
           </div>
              
           <div className="pwd2-input-container">
           
                 <input className="pwd2-input-field" autoComplete='off' type="password" placeholder='Organisation passcode' name="password2"/>
                
             </div>

             
            <div className='checkbox-content'>
               <input type="checkbox" id="terms" name="terms" value="terms"/>
               <label htmlFor="terms" className='terms'> I agree to terms & conditions</label>
            </div>
            <button  className='button' type='submit' id='submitBtn' onClick={() => handleSignup()}>SIGN UP</button>
           
              </form>
              <div className='text6'>Do you already have an account?&nbsp;<span className='signup-boldtext' onClick={()=>handleGoToLogin()}>Login</span>
                 </div>         
           </div>
           </div>
       
        )}
          
          
    