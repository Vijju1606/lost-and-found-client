import "./Register.css";
import {FaEye,FaEyeSlash} from "react-icons/fa";
import{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { register } from "../services/authService";

function Register() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const navigate = useNavigate();
const handleRegister= async(e)=>{
    e.preventDefault();

if(!name.trim()){
    alert("Full Name is required");
    return;
}
if(!email.trim()){
    alert("Email is required");
    return;
}
if(!password.trim()){
    alert("Password is required");
    return;
}
if(password != confirmPassword)
{
    alert("Passwords do not match.");
    return;

}


setLoading(true);
try{
    const response= await register({
        name,
        email,
        password
    });
    if(response.success){
        alert(response.message);
        navigate("/login", { state: { registeredFullName: name.trim() } });
    }
    else{
        alert(response.message)
    }
}
catch(error){
        alert(error.response?.data?.message|| "Registration failed.")
    }
    finally{
        setLoading(false);
    }
}









    return (
        <div className="login-container">
            <div className="login-card">

                <h2>📝 Create Account</h2>
                <p className="auth-subtitle">
                    Join Lost & Found to report and recover lost belongings.
                </p>

                <form onSubmit={handleRegister}>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                        />
                    </div>

                     <div className="form-group">
                        <label>Password</label>
                       <div className="password-input">
    <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
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
                        <label>Confirm Password</label>
                       <div className="password-input">
    <input
        type={showConfirmPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Enter your password"
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
                        {loading? "Registering...": "Register"}
                    </button>

                    <p className="register-link">
                        Already have an account?{" "}
                        <Link to="/login">Login here</Link>
                    </p>

                </form>

            </div>
        </div>
    );
}

export default Register;
