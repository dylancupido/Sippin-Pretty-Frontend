import React from "react";
import { FaUser,FaLock } from "react-icons/fa";
import"../Styles/Register.css"

const CusRegisterForm=()=>{
    return (
        <div className="Wrapper">
            <form action="">
                <h1>Create Account</h1>
                <div className="Inputbox">
                <input type="text" placeholder="First Name*" require/>
                </div>
                <div className="Inputbox">
                    <input type="text" placeholder="Last Name*"/>
                </div>
                <div className="Inputbox">
                    <input type="text" placeholder="Email Address*"required/>
                </div>
                <div className="Inputbox">
                    <input type="text" placeholder="Mobile Number*" required/>
                </div>
                <div className="Inputbox">
                    <input type="Password" placeholder="Password*" required/>
                </div>
                <button>Register</button>               
            </form>

        </div>
    )
}
export default CusRegisterForm;