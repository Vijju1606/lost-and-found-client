import { useState } from "react";
import "./ReportLostItem.css";
import { getMyLostItems, reportLostItem } from "../services/lostItemService";
import { useNavigate } from "react-router-dom";

function ReportLostItem() {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [dateLost, setDateLost] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(
        !itemName||
        !description ||
        !location ||
        !dateLost ||
        !image 
    ){
        alert("Please fill all fields.");
        return;
    }

    try{
        setLoading(true);
        const formData = new FormData();
        formData.append("ItemName",itemName);
        formData.append("Description",description);
        formData.append("Location",location);
        // The API binds this field as a DateTime; a date-only input causes a
        // server-side save failure.
        formData.append("DateLost", `${dateLost}T00:00:00.000Z`);
        formData.append("Image",image);
         
        const result = await reportLostItem(formData);
        if (result.success === false) {
          throw new Error(result.message || "Unable to report lost item.");
        }
        alert(result.message || "Lost item reported successfully.");

        setItemName("");
        setDescription("");
        setLocation("");
        setDateLost("");
        setImage(null);
        let createdLostItemId = result.data?.id || result.data?.lostItemId || result.id || result.lostItemId;
        if (!createdLostItemId) {
          const mine = await getMyLostItems();
          const items = mine.data || mine || [];
          const newest = [...items].sort((a, b) => new Date(b.dateLost) - new Date(a.dateLost))[0];
          createdLostItemId = newest?.id || newest?.lostItemId;
        }
        navigate(createdLostItemId ? `/matches/${createdLostItemId}` : "/");
        
    }

  catch (error) {
    alert(error.response?.data?.message || error.message || "Unable to report lost item.");
}
finally{
    setLoading(false);
}
    
  };

  return (
    <div className="lost-item-container">
      <div className="lost-item-card">

        <h2>Report Lost Item</h2>
        <p>
          Fill in the details below to report your lost item.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              placeholder="Enter item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="4"
              placeholder="Describe your item"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="Where did you lose it?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Date Lost</label>
            <input
              type="date"
              value={dateLost}
              onChange={(e) => setDateLost(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Report Lost Item"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default  ReportLostItem;
