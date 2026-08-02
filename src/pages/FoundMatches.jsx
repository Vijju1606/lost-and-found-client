import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMatches } from "../services/matchService";
import FoundMatchCard from "../components/FoundMatchCard";
import {sendContactRequest} from "../services/contactService";
import "./FoundMatches.css";
function FoundMatches() {
    const { lostItemId } = useParams();

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [sendingRequest, setSendingRequest] = useState(false);

    useEffect(() => {
        loadMatches();
    }, []);

    const loadMatches = async () => {
        try {
            const response = await getMatches(lostItemId);

            setMatches(response || []);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    const handleContact= (match)=>{
        setSelectedMatch(match);
    };

    const confirmContact = async () => {
        try{
            setSendingRequest(true);
            const response = await sendContactRequest({lostItemId:Number(lostItemId),foundItemId:selectedMatch.foundItemId,matchScore:selectedMatch.matchPercentage});
            setSelectedMatch(null);
            alert(response.message);
        }catch(error){
            alert(error.response?.data?.message || "Unable to send request.");
        } finally {
            setSendingRequest(false);
        }
    };

   return (
    <>
    <div className="my-lost-items">

        <h2>Found Matches</h2>

        {
            matches.length === 0 ? (
                <p>No matching items found.</p>
            ) : (

                <div className="items-grid">

                    {
                        matches.map(match => (

                            <FoundMatchCard
                                key={match.foundItemId}
                                match={match}
                                onContact={handleContact}
                            />

                        ))
                    }

                </div>

            )
        }

    </div>

    {selectedMatch && (
        <div className="match-contact-overlay" role="presentation">
            <div className="match-contact-card" role="dialog" aria-modal="true" aria-labelledby="match-contact-title">
                <h3 id="match-contact-title">Request Contact Details</h3>
                <p>You found a possible match for your lost item:</p>
                <p><strong>{selectedMatch.itemName}</strong></p>
                <p className="match-contact-score">Match score: {selectedMatch.matchPercentage}%</p>
                <p>The found-item owner can approve or reject your request.</p>
                <div className="match-contact-actions">
                    <button type="button" className="match-contact-cancel" onClick={() => setSelectedMatch(null)}>Cancel</button>
                    <button type="button" className="match-contact-confirm" onClick={confirmContact} disabled={sendingRequest}>
                        {sendingRequest ? "Sending..." : "Send Request"}
                    </button>
                </div>
            </div>
        </div>
    )}
    </>
);
}

export default FoundMatches;
