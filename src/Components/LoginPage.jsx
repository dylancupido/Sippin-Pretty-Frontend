import React from 'react'
import '../Styles/LoginPage.css'
import { FaUser,FaLock } from "react-icons/fa";


const LoginForm=()=>{
    return (
        <div className="Wrapper">
            <form action="">
                <h1>Login</h1>
                <div className="inputbox">
                    <input type="text" placeholder='Username' required/>  
                    <FaUser className="icon"/>             
                </div>
                <div className="inputbox">
                    <input type="password" placeholder="Password" required/>
                    <FaLock className="icon"/>
                </div>
                <div className="RemembermeBox-forget">
                    <label><input type="checkbox"/> Remember me</label>
                    <a href="#" id="ForgetPAssword">Forget Password?</a>
                    </div>
                    <button id="BtnLogin" type="Submit" >LogIn</button>
                    <div className="registerLink">
                        <p>Don't have an account?<a href="#">Register</a></p>
                        
                    </div>
                
            </form>

        </div>
    )
}
export default LoginForm;