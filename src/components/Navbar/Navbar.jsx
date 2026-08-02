import "./Navbar.css";
import {Link,NavLink,useNavigate} from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";
import ConfirmLogout from "../ConfirmLogout/ConfirmLogout";
function Navbar(){
  const navigate=useNavigate();
  const{isAuthenticated, userRole, logout}=useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);


const handleLogout=()=>{
    setShowLogoutConfirm(false);
    logout();
    setMenuOpen(false);
    navigate("/");
};


    return(
        <>
        <nav className="navbar">
            <div className="logo">
                <Link to="/">Lost & Found</Link>
            </div>
            <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div className={`nav-menu ${menuOpen ? "is-open" : ""}`}>
              <div className="nav-links">
                <NavLink to ="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                
                <NavLink to ="/found-items" onClick={() => setMenuOpen(false)}>Found Items</NavLink>
              </div>
               <div className="auth-links">

    {!isAuthenticated ? (
        <>
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
            <NavLink to="/register" onClick={() => setMenuOpen(false)}>Register</NavLink>
        </>
    ) : (
        <>
            <NavLink to="/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink>
            {userRole?.toLowerCase() === "admin" && <NavLink to="/admin" onClick={() => setMenuOpen(false)}>Admin</NavLink>}

            <button
                className="logout-btn"
                onClick={() => setShowLogoutConfirm(true)}
            >
                Logout
            </button>
        </>
    )}

</div>
            </div>
        </nav>
        {showLogoutConfirm && <ConfirmLogout onCancel={() => setShowLogoutConfirm(false)} onConfirm={handleLogout} />}
        </>

    );
}
export default Navbar;
