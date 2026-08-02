import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./VerifyOtp.css";
import { verifyOtp } from "../services/authService";
import { useNavigate } from "react-router-dom";

function VerifyOtp(){
    const location = useLocation();
    const email =location.state?.email;
    const[otp,setOtp]=useState("");
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const handleVerifyOtp=async(e)=>{
        e.preventDefault();
        if(!otp.trim()){
            alert("OTP is requried.");
            return;
        }

        try{
            setLoading(true)
            const result = await verifyOtp(email,otp);
            navigate("/reset-password",{
                state:{email}
            })
            
        }
        catch(error){
            alert(error.response?.data?.message||error.message);

        }
        finally{
            setLoading(false);
        }
    };


    return(
        <div className="login-container">
            <div className="login-card">

            <h2>Verify</h2>
        <p className="auth-subtitle">If you have registered, OTP has been sent to<strong> {email} </strong>. Please enter the OTP below.</p>
         <form onSubmit={handleVerifyOtp} >
            <div className="form-group">
            <label>OTP</label>
            <input
                type="text"
                placeholder="Enter OTP"
                
                onChange={(e) => setOtp(e.target.value)}
            />
            </div>

        <button type="submit" disabled = {loading}>{loading ? "Verifying OTP....": "Verify OTP"}</button>
</form>
        
        </div>
        
        
        
        </div>
    )
}
export default VerifyOtp;