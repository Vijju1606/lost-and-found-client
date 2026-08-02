import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFoundItemById } from "../services/foundItemService";
import { sendContactRequest } from "../services/contactService";
import { useAuth } from "../context/AuthContext";
import { getAssetUrl, useImageFallback } from "../services/api";
import "./FoundItemDetails.css";

function FoundItemDetails(){

    const{id }= useParams();
    const[item,setItem]=useState(null);
    const[loading,setLoading]=useState(true);
    const [showContactCard, setShowContactCard] = useState(false);
    const [sendingRequest, setSendingRequest] = useState(false);
    const { isAuthenticated, userId } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=> {loadFoundItem();},[id])
   const loadFoundItem= async () => {
    try{
        const response = await getFoundItemById(id);
        setItem(response.data)
    }
    catch(error){
    }
    finally{
        setLoading(false);
    }
   };

   if(loading){
    return<h2>Loading....</h2>
   }
   if(!item){
    return <h2> Item Not found.</h2>
   }

   const isOwnItem = userId && Number(item.userId) === Number(userId);

   const openContactCard = () => {
    if (!isAuthenticated) {
        navigate("/login", { state: { from: location } });
        return;
    }
    setShowContactCard(true);
   };

   const submitContactRequest = async (event) => {
    event.preventDefault();
    try {
        setSendingRequest(true);
        const response = await sendContactRequest({
            foundItemId: Number(item.id || id),
            lostItemId: null,
            matchScore: null,
        });
        alert(response.message || "Contact request sent successfully.");
        setShowContactCard(false);
    } catch (error) {
        alert(error.response?.data?.message || "Unable to send contact request.");
    } finally {
        setSendingRequest(false);
    }
   };



    return(

<>
 <h1>Found Item Details </h1>
 
 

<section className="found-details">

    <div className="details-container">

        <div className="details-image">
            <img
                src={getAssetUrl(item.imageUrl)}
                alt={item.itemName}
                onError={useImageFallback}
            />
        </div>

        <div className="details-content">

            <h1>{item.itemName}</h1>

            <p>
                <strong>Location:</strong> {item.location}
            </p>

            <p>
                <strong>Date Found:</strong> {item.dateFound}
            </p>

            <p>
                <strong>Description:</strong>
            </p>

            <p>{item.description}</p>

            <button className="btn btn-primary" onClick={openContactCard} disabled={isOwnItem}>
                {isOwnItem ? "It’s yours" : "Contact Owner"}
            </button>

        </div>

    </div>

</section>

{showContactCard && (
    <div className="contact-request-overlay" role="presentation">
        <div className="contact-request-card" role="dialog" aria-modal="true" aria-labelledby="contact-request-title">
            <h2 id="contact-request-title">Request Contact Details</h2>
            <p>You are requesting the contact details for <strong>{item.itemName}</strong>. The finder can approve or reject your request.</p>

            <form onSubmit={submitContactRequest}>
                <small>Your request will appear in the finder’s Pending Requests list.</small>
                <div className="contact-request-actions">
                    <button type="button" className="contact-request-cancel" onClick={() => setShowContactCard(false)}>Cancel</button>
                    <button type="submit" className="contact-request-send" disabled={sendingRequest}>
                        {sendingRequest ? "Sending..." : "Send Request"}
                    </button>
                </div>
            </form>
        </div>
    </div>
)}


       
        </>
  
        );  
    
}
export default FoundItemDetails;
