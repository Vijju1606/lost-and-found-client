import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReportFoundItem.css";
import { reportFoundItem } from "../services/foundItemService";

function ReportFoundItem() {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [dateFound, setDateFound] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!itemName || !description || !location || !dateFound || !image) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("ItemName", itemName);
      formData.append("Description", description);
      formData.append("Location", location);
      // The API binds this field as a DateTime; a date-only input causes a
      // server-side save failure.
      formData.append("DateFound", `${dateFound}T00:00:00.000Z`);
      formData.append("Image", image);

      const result = await reportFoundItem(formData);
      if (result.success === false) {
        throw new Error(result.message || "Unable to report found item.");
      }
      alert(result.message || "Found item reported successfully.");

      setItemName("");
      setDescription("");
      setLocation("");
      setDateFound("");
      setImage(null);
      event.target.reset();
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Unable to report found item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="found-report-container">
      <div className="found-report-card">
        <h2>Report Found Item</h2>
        <p>Fill in the details below to report an item you found.</p>

        <form onSubmit={handleSubmit}>
          <div className="found-report-form-group">
            <label htmlFor="found-item-name">Item Name</label>
            <input id="found-item-name" type="text" placeholder="Enter item name" value={itemName} onChange={(event) => setItemName(event.target.value)} />
          </div>

          <div className="found-report-form-group">
            <label htmlFor="found-description">Description</label>
            <textarea id="found-description" rows="4" placeholder="Describe the item" value={description} onChange={(event) => setDescription(event.target.value)} />
          </div>

          <div className="found-report-form-group">
            <label htmlFor="found-location">Location</label>
            <input id="found-location" type="text" placeholder="Where did you find it?" value={location} onChange={(event) => setLocation(event.target.value)} />
          </div>

          <div className="found-report-form-group">
            <label htmlFor="date-found">Date Found</label>
            <input id="date-found" type="date" value={dateFound} onChange={(event) => setDateFound(event.target.value)} />
          </div>

          <div className="found-report-form-group">
            <label htmlFor="found-image">Upload Image</label>
            <input id="found-image" type="file" accept="image/*" onChange={(event) => setImage(event.target.files[0] || null)} />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Report Found Item"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportFoundItem;
