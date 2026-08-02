import "./ConfirmLogout.css";
function ConfirmLogout({ onCancel, onConfirm }) {
    return <div className="logout-confirm-overlay" role="presentation"><div className="logout-confirm-card" role="dialog" aria-modal="true" aria-labelledby="logout-confirm-title"><div className="logout-confirm-icon">↪</div><h2 id="logout-confirm-title">Confirm Logout</h2><p>Are you sure you want to sign out of your account?</p><div className="logout-confirm-actions"><button className="logout-cancel" onClick={onCancel}>Cancel</button><button className="logout-confirm" onClick={onConfirm}>Logout</button></div></div></div>;
}
export default ConfirmLogout;
