import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteAdminFoundItem, deleteAdminLostItem, deleteAdminUser, getAdminDashboard, getAdminFoundItems, getAdminLostItems, getAdminUsers, updateUserRole } from "../services/adminService";
import "./Admin.css";
import ConfirmLogout from "../components/ConfirmLogout/ConfirmLogout";
import { confirmAction, showNotification } from "../utils/notifications";

const getItemEmail = (item) => item.email || item.userEmail || item.ownerEmail || item.reportedByEmail || item.createdByEmail || "Email unavailable";
const getItemOwner = (item) => item.userName || item.ownerName || item.reportedByName || item.createdByName;

function Admin() {
  const { userId, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUsers, setShowUsers] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const load = async () => {
    const [dashboard, usersResponse, lostResponse, foundResponse] = await Promise.all([getAdminDashboard(), getAdminUsers(), getAdminLostItems(), getAdminFoundItems()]);
    setStats(dashboard.data?.data || dashboard.data || {});
    setUsers(usersResponse.data?.data || usersResponse.data || []);
    setLostItems(lostResponse.data?.data || lostResponse.data || []);
    setFoundItems(foundResponse.data?.data || foundResponse.data || []);
  };

  useEffect(() => { load().catch(() => showNotification("Unable to load admin data.", "error")).finally(() => setLoading(false)); }, []);

  const changeRole = async (user) => {
    if (Number(user.userId) === Number(userId)) return;
    const isAdmin = user.role?.toLowerCase() === "admin";
    const nextRole = isAdmin ? "User" : "Admin";
    const confirmed = await confirmAction({
      title: isAdmin ? "Remove administrator access?" : "Make this user an administrator?",
      message: isAdmin
        ? `${user.name || "This user"} will no longer be able to manage users and items.`
        : `${user.name || "This user"} will be able to manage users and items.`,
      confirmLabel: isAdmin ? "Make User" : "Make Admin",
      destructive: isAdmin,
    });
    if (!confirmed) return;

    await updateUserRole(user.userId, nextRole);
    await load();
  };

  const removeUser = async (user) => {
    if (Number(user.userId) === Number(userId)) return;
    const confirmed = await confirmAction({ title: "Remove this user?", message: `${user.name || "This user"} and their account access will be removed.`, confirmLabel: "Remove user", destructive: true });
    if (!confirmed) return;
    try {
      await deleteAdminUser(user.userId);
      await load();
      showNotification("User removed.", "success");
    } catch (error) {
      showNotification(error.response?.data?.message || "Unable to remove user.", "error");
    }
  };

  const removeItem = async (kind, id) => {
    const confirmed = await confirmAction({ title: "Delete this item?", message: "This item will be permanently removed.", confirmLabel: "Delete item", destructive: true });
    if (!confirmed) return;
    try {
      if (kind === "lost") await deleteAdminLostItem(id); else await deleteAdminFoundItem(id);
      await load();
      showNotification("Item deleted.", "success");
    } catch {
      showNotification("Unable to delete this item.", "error");
    }
  };

  const renderItem = (item, kind) => <div className="admin-row" key={item.id}>
    <div><strong>{item.itemName}</strong><small>{item.location}</small>{getItemOwner(item) && <small>Reported by: {getItemOwner(item)}</small>}<small>Email: {getItemEmail(item)}</small></div>
    <button type="button" className="danger" onClick={() => removeItem(kind, item.id)}>Delete</button>
  </div>;

  if (loading) return <h2>Loading admin dashboard...</h2>;
  return <main className="admin-page">
    <header className="admin-header"><div><span className="admin-eyebrow">ADMINISTRATION</span><h1>Control Center</h1><p>Manage users and marketplace content.</p></div><button type="button" onClick={() => setShowLogoutConfirm(true)}>Logout</button></header>
    <section className="admin-stats">
      <button type="button" className="admin-stat-button" onClick={() => setShowUsers((visible) => !visible)} aria-expanded={showUsers}><strong>{stats?.totalUsers ?? users.length}</strong><span>{showUsers ? "Hide users" : "View all users"}</span></button>
      <div><strong>{stats?.totalLostItems ?? lostItems.length}</strong><span>Lost items</span></div><div><strong>{stats?.totalFoundItems ?? foundItems.length}</strong><span>Found items</span></div>
    </section>
    {showUsers && <section className="admin-panel" aria-label="All users"><h2>All users ({users.length})</h2>{users.length === 0 ? <p>No users found.</p> : users.map((user) => <div className="admin-row" key={user.userId}><div><strong>{user.name}</strong><small>{user.email || "Email unavailable"}</small></div><span className={`role-pill ${user.role?.toLowerCase()}`}>{user.role}</span><button type="button" disabled={Number(user.userId) === Number(userId)} onClick={() => changeRole(user)}>{user.role?.toLowerCase() === "admin" ? "Make User" : "Make Admin"}</button><button type="button" className="danger" disabled={Number(user.userId) === Number(userId)} onClick={() => removeUser(user)}>Remove</button></div>)}</section>}
    <section className="admin-columns"><div className="admin-panel"><h2>Lost items ({lostItems.length})</h2>{lostItems.length === 0 ? <p>No lost items found.</p> : lostItems.map((item) => renderItem(item, "lost"))}</div><div className="admin-panel"><h2>Found items ({foundItems.length})</h2>{foundItems.length === 0 ? <p>No found items found.</p> : foundItems.map((item) => renderItem(item, "found"))}</div></section>
    {showLogoutConfirm && <ConfirmLogout onCancel={() => setShowLogoutConfirm(false)} onConfirm={() => { logout(); navigate("/"); }} />}
  </main>;
}

export default Admin;
