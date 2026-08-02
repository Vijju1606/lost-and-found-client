import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {FaEye,FaEyeSlash} from "react-icons/fa";
import{login} from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

function Login() {
   const[email,setEmail]=useState("");
   const[password,setPassword]=useState("");
   const[loading,setLoading]=useState(false);
   const[showPassword,setShowPassword]=useState(false);
   const navigate = useNavigate();
   const location = useLocation();
   const {login:saveLogin, userRole}=useAuth();
   const handleLogin = async (e)=>{
    e.preventDefault();
    setLoading(true);
    try{
        const response = await 
        login({
            email,password
        });
        if(response.success){
          const fullName = response.fullName || response.user?.fullName || response.user?.name || response.name || location.state?.registeredFullName;
          saveLogin(response.token, fullName);
            alert(response.message)
            const destination = location.state?.from;
            const claims = jwtDecode(response.token);
            const role = claims.role || claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || userRole;
            navigate(destination ? `${destination.pathname}${destination.search}${destination.hash}` : (role?.toLowerCase() === "admin" ? "/admin" : "/"), { replace: true });
        }
        else{
            alert(response.message);
        }
    }catch(error){
        alert(error.response?.data?.message || "Login failed.")
    }
    finally{
        setLoading(false);
    }
   }


    return (
        <div className="login-container">
            <div className="login-card">

                <h2>Login</h2>

                <form onSubmit={handleLogin}>

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
                    <div className="forgot-password"><Link to="/forgot-password">Forgot Password?</Link></div>

                    <button type="submit" disabled={loading}>
                        { loading ? "Logging in....": "Login"}
                        
                    </button>
                    <p className="register-link">Don't have an account?{" "}
                        <Link to="/register">Register</Link>
                    </p>

                </form>

            </div>
        </div>
    );
}

export default Login;
