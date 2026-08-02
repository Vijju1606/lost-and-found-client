import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFoundItemById, updateFoundItem } from "../services/foundItemService";
import { getItemImageUrl, useImageFallback } from "../services/api";
import "./EditLostItem.css";

function EditFoundItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [dateFound, setDateFound] = useState("");
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getFoundItemById(id)
      .then((response) => {
        const foundItem = response.data;
        setItem(foundItem);
        setItemName(foundItem.itemName || "");
        setDescription(foundItem.description || "");
        setLocation(foundItem.location || "");
        setDateFound(foundItem.dateFound?.split("T")[0] || "");
      })
      .catch(() => alert("Unable to load this found item."));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      alert("Select the original image to replace the missing image.");
      return;
    }

    const formData = new FormData();
    formData.append("ItemName", itemName);
    formData.append("Description", description);
    formData.append("Location", location);
    formData.append("DateFound", `${dateFound}T00:00:00.000Z`);
    formData.append("Image", image);

    try {
      setSaving(true);
      const response = await updateFoundItem(id, formData);
      if (response.success === false) throw new Error(response.message);
      alert(response.message || "Found item image updated.");
      navigate("/my-found-items");
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Unable to update the image.");
    } finally {
      setSaving(false);
    }
  };

  if (!item) return <h2>Loading...</h2>;

  return (
    <main className="edit-container">
      <h2>Replace Found Item Image</h2>
      <p>Select the original photo again to restore it for this report.</p>
      <form onSubmit={handleSubmit}>
        <input value={itemName} onChange={(event) => setItemName(event.target.value)} required />
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} required />
        <input value={location} onChange={(event) => setLocation(event.target.value)} required />
        <input type="date" value={dateFound} onChange={(event) => setDateFound(event.target.value)} required />
        <label>Current image</label>
        <img src={getItemImageUrl(item)} alt={itemName} className="preview-image" onError={useImageFallback} />
        <label htmlFor="replacement-image">Original image</label>
        <input id="replacement-image" type="file" accept="image/jpeg,image/png,image/gif" onChange={(event) => setImage(event.target.files[0] || null)} required />
        <button type="submit" disabled={saving}>{saving ? "Saving..." : "Replace Image"}</button>
      </form>
    </main>
  );
}

export default EditFoundItem;
