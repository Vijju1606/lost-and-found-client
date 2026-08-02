import { useEffect, useState } from "react";
import { getSentRequests } from "../services/contactService";
import "./PendingRequests.css";

function SentRequests(){
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSentRequests()
            .then((response) => setRequests(response.data || []))
            .catch(() => alert("Unable to load sent requests."))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <h2>Loading...</h2>;

    return (
        <div className="sent-requests-page">
            <div className="sent-requests-header"><span>ACTIVITY</span><h2>Requests sent by me</h2><p>Track your conversations with found-item owners.</p></div>
            {requests.length === 0 ? <p>No contact requests sent.</p> : (
                <div className="items-grid">
                    {requests.map((request) => (
                        <div className="sent-request-card" key={request.contactRequestId}>
                            <div className="sent-request-card-top"><h3>{request.foundItemName}</h3><span className={`request-status ${request.status?.toLowerCase()}`}>{request.status}</span></div>
                            <p><strong>To:</strong> {request.requestedTo}</p><p><strong>Your lost item:</strong> {request.lostItemName || "Not reported"}</p>
                            {request.sharedPhoneNumber && <p className="shared-phone"><strong>Phone shared:</strong> {request.sharedPhoneNumber}</p>}
                            <small>Sent {new Date(request.requestedAt).toLocaleDateString()}</small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default SentRequests;
