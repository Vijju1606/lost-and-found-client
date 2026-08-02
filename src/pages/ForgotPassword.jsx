import { useState } from "react";
import "./ForgotPassword.css";
import { Link,useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authService";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();

    const handleSendOtp =async(e)=>{
        e.preventDefault();
        if(!email.trim()){
            alert("Email is required.");
            return;
        }
        try{
            setLoading(true);
            const result = await forgotPassword(email);
            
            navigate("/verify-otp",{
                state:{
                    email:email
                }
            });
            

        }
        catch(error){
            alert(error.response?.data?.message||"Something went wrong.")
        }
        finally{
            setLoading(false);
        }
    };

   return (
    <div className="login-container">
        <div className="login-card">

            <h2>🔑 Forgot Password</h2>

        <p className="auth-subtitle">Forgot your password? Enter your registered email and we'll send you an  OTP.</p>
        <form onSubmit={handleSendOtp} >
            <div className="form-group">
            <label>Email</label>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>

        <button type="submit" disabled={loading}>{loading ? "Sending OTP....":"Send OTP"}</button>
</form>
    <p className="register-link">Remember your password?{""} <Link to="/login">Login here</Link></p>
        </div>
    </div>
);
}

export default ForgotPassword;