import { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { resetPassword } from "../services/authService";
import "./ResetPassword.css";
import {FaEye,FaEyeSlash} from "react-icons/fa";

function ResetPassword(){
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || sessionStorage.getItem("passwordResetEmail");

    const[newPassword,setNewPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");
    const[showPassword,setShowPassword]=useState(false);
    const[showConfirmPassword,setShowConfirmPassword]=useState(false);
    const[loading,setLoading]=useState(false);

    useEffect(() => {
        if (!email || sessionStorage.getItem("passwordResetVerified") !== "true") {
            navigate("/forgot-password", { replace: true });
        }
    }, [email, navigate]);
    

    const handleResetPassword = async(e)=>{
        e.preventDefault();
        if(!newPassword.trim() || !confirmPassword.trim()){
 

            alert("All fields are required.");
            return;
        }
        if(newPassword !== confirmPassword){
            alert("Passwords do not match.");
            return;
        }
        if (newPassword.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }
        try{
            setLoading(true);
            const result = await resetPassword(
                email,
                newPassword,
                confirmPassword
            );
            sessionStorage.removeItem("passwordResetEmail");
            sessionStorage.removeItem("passwordResetVerified");
            alert(result.message || "Password changed successfully.");
            navigate("/login");
        }
        catch(error){
            alert(error.response?.data?.message || "Unable to reset your password. Please request a new OTP and try again.");
        }
        finally{
            setLoading(false);
        }
    };

    return(
        <div className="login-container">
        <div className="login-card">

                <h2>Reset Password</h2>
                <p className="auth-subtitle">
                    Enter new password and change your password.
                </p>

                <form onSubmit={handleResetPassword}>

                    

                    

                     <div className="form-group">
                        <label>New Password</label>
                       <div className="password-input">
    <input
        type={showPassword ? "text" : "password"}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter your password"
        minLength="8"
        required
        autoComplete="new-password"
    />

    <span
        className="password-toggle"
        onClick={() => setShowPassword(!showPassword)}
    >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
</div>
                    </div>

                     <div className="form-group">
                        <label>Confirm New Password</label>
                       <div className="password-input">
    <input
        type={showConfirmPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Enter your password"
        minLength="8"
        required
        autoComplete="new-password"
    />

    <span
        className="password-toggle"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    >
        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
</div>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading? "Changing Password": "Change Password"}
                    </button>

                   

                </form>

            </div>
            </div>

    );
}
export default ResetPassword;
