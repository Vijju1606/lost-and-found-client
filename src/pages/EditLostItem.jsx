import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getLostItemById,
    updateLostItem
} from "../services/lostItemService";
import { getAssetUrl, useImageFallback } from "../services/api";

import "./EditLostItem.css";

function EditLostItem() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [dateLost, setDateLost] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        loadItem();
    }, []);

    const loadItem = async () => {

        try {

            const response = await getLostItemById(id);

            if (response.success) {

                const item = response.data;

                setItemName(item.itemName);
                setDescription(item.description);
                setLocation(item.location);
                setDateLost(item.dateLost.split("T")[0]);
                setImageUrl(item.imageUrl);

            }

        } catch (error) {

            alert(error.response?.data?.message || "Unable to load item.");

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        

        const formData = new FormData();

        formData.append("ItemName", itemName);
        formData.append("Description", description);
        formData.append("Location", location);
        formData.append("DateLost", dateLost);

        if (image) {
            formData.append("Image", image);
        }

        try {
            

            const response = await updateLostItem(id, formData);

            if (response.success) {

                alert(response.message);

                navigate("/my-lost-items");

            }

        } catch (error) {

            alert(error.response?.data?.message || "Update failed.");

        }

    };

    return (

        <div className="edit-container">

            <h2>Edit Lost Item</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Item Name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />

                <input
                    type="date"
                    value={dateLost}
                    onChange={(e) => setDateLost(e.target.value)}
                    required
                />
 
                
                <label>Current Image</label>
                {imageUrl && (

                    <img
                        src={getAssetUrl(imageUrl)}
                        alt={itemName}
                        className="preview-image"
                        onError={useImageFallback}
                    />

                )}
                
                  <label>Add new image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
              

                <button type="submit">
                    Update Item
                </button>

            </form>

        </div>

    );

}

export default EditLostItem;
