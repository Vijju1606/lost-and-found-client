import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";
import ConfirmLogout from "../components/ConfirmLogout/ConfirmLogout";

function Profile() {
    const navigate = useNavigate();
    const { logout, userName } = useAuth();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const cards = [
        ["L", "lost-icon", "/my-lost-items", "My Lost Items", "View, edit, delete and match your lost items."],
        ["F", "found-icon", "/my-found-items", "My Found Items", "View all found items you have reported."],
        ["↗", "requests-icon", "/contact-requests", "Contact Requests", "Track requests sent by you and their status."],
        ["!", "pending-icon", "/pending-requests", "Pending Requests", "Approve or reject requests from other users."],
    ];
    return <div className="profile-container">
        <div className="profile-header"><h1>My Profile</h1><p className="profile-welcome">Welcome, <strong>{userName || "there"}</strong>.</p><p>Manage your lost and found activities.</p></div>
        <div className="profile-grid">
            {cards.map(([icon, iconClass, to, title, description]) => <Link to={to} className="profile-card" key={to}><div className={`icon ${iconClass}`}>{icon}</div><h3>{title}</h3><p>{description}</p></Link>)}
            <button className="profile-card logout-card" onClick={() => setShowLogoutConfirm(true)}><div className="icon logout-icon">↪</div><h3>Logout</h3><p>Sign out of your account.</p></button>
        </div>
        {showLogoutConfirm && <ConfirmLogout onCancel={() => setShowLogoutConfirm(false)} onConfirm={() => { logout(); navigate("/"); }} />}
    </div>;
}
export default Profile;
