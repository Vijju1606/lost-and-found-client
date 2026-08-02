import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./VerifyOtp.css";
import { verifyOtp } from "../services/authService";
import { useNavigate } from "react-router-dom";

function VerifyOtp(){
    const location = useLocation();
    const email = location.state?.email || sessionStorage.getItem("passwordResetEmail");
    const[otp,setOtp]=useState("");
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();

    useEffect(() => {
        if (!email) {
            navigate("/forgot-password", { replace: true });
        }
    }, [email, navigate]);

    const handleVerifyOtp=async(e)=>{
        e.preventDefault();
        const normalizedOtp = otp.trim();
        if (!/^\d{6}$/.test(normalizedOtp)) {
            alert("Enter the 6-digit OTP sent to your email.");
            return;
        }

        try{
            setLoading(true)
            await verifyOtp(email, normalizedOtp);
            sessionStorage.setItem("passwordResetVerified", "true");
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
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength="6"
                required
            />
            </div>

        <button type="submit" disabled = {loading}>{loading ? "Verifying OTP....": "Verify OTP"}</button>
</form>
        
        </div>
        
        
        
        </div>
    )
}
export default VerifyOtp;
