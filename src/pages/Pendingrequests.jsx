import { useEffect, useState } from "react";
import {
  getPendingRequests,
  approveRequest,
  rejectRequest,
} from "../services/contactService";
import "./PendingRequests.css";
import { markFoundItemReturned } from "../services/foundItemService";
import { confirmAction, showNotification } from "../utils/notifications";

function PendingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const[selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const response = await getPendingRequests();
      setRequests(response.data || []);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

const confirmApprove = async () => {
    try {

        const response = await approveRequest(
            selectedRequest.contactRequestId,
            phoneNumber
        );

        setSelectedRequest(null);
        setPhoneNumber("");

        await loadRequests();
        showNotification(response.message, "success");

        setSelectedRequest(null);
        setPhoneNumber("");

        loadRequests();

    } catch (error) {
        showNotification("Unable to approve request.", "error");
    }
};


  const handleReject = async (ContactRequestId) => {
    try {
      const response = await rejectRequest(ContactRequestId);
      showNotification(response.message, "success");
      loadRequests();
    } catch {
      showNotification("Unable to reject request.", "error");
    }
  };

  const handleReturned = async (request) => {
    const confirmed = await confirmAction({ title: "Mark item as returned?", message: "This confirms that the owner has received the item.", confirmLabel: "Mark returned" });
    if (!confirmed) return;
    try {
      const response = await markFoundItemReturned(request.foundItemId);
      showNotification(response.message, "success");
      loadRequests();
    } catch (error) {
      showNotification(error.response?.data?.message || "Unable to mark item as returned.", "error");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="my-lost-items">
      <h2>Pending Requests</h2>

      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
       <div className="items-grid">

    {requests.map((request) => (

        <div
            className="item-card"
            key={request.contactRequestId}
        >

            <h3>{request.lostItemTitle}</h3>

            <p>
                <strong>Description :</strong>{" "}
                {request.lostItemDescription}
            </p>

            <p>
                <strong>Found Item :</strong>{" "}
                {request.foundItemTitle}
            </p>

            <p>
                <strong>Found Description :</strong>{" "}
                {request.foundItemDescription}
            </p>

            <p>
                <strong>Requester :</strong>{" "}
                {request.requestedByName}
            </p>

            <p>
                <strong>Email :</strong>{" "}
                {request.requestedByEmail}
            </p>

            {request.matchScore !== null && request.matchScore !== undefined && (
              <p>
                  <strong>Match Score :</strong>{" "}
                  {request.matchScore}%
              </p>
            )}

            <p>
                <strong>Date :</strong>{" "}
                {new Date(request.requestedAt).toLocaleDateString()}
            </p>

            {request.status?.toLowerCase() === "pending" && (
              <>
                <button className="btn btn-success" onClick={() => {setSelectedRequest(request); setPhoneNumber("");}}>
                    Approve
                </button>
                <button className="btn btn-danger" onClick={() => handleReject(request.contactRequestId)}>
                    Reject
                </button>
              </>
            )}

            {request.status?.toLowerCase() === "approved" && (
              <button className="btn btn-primary" onClick={() => handleReturned(request)}>
                Item Returned
              </button>
            )}

        </div>

    ))}

</div>
      )}

      {selectedRequest && (
<div className="approve-modal-overlay" role="presentation">
    <div className="approve-modal" role="dialog" aria-modal="true" aria-labelledby="approve-request-title">

        <h3 id="approve-request-title">Approve Contact Request</h3>

        <p className="approve-text">
            Share your phone number (Optional)
        </p>

        <input
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e)=>setPhoneNumber(e.target.value)}
        />

        <small>
            Leave blank if you don't want to share your number.
        </small>

        <div className="approve-buttons">

            <button
                className="cancel-btn"
                onClick={()=>{
                    setSelectedRequest(null);
                    setPhoneNumber("");
                }}
            >
                Cancel
            </button>

            <button
                className="approve-btn"
                onClick={confirmApprove}
            >
                Approve
            </button>

        </div>

    </div>
</div>
)}

      



    </div>
  );
}

export default PendingRequests;
