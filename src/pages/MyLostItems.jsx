import { useEffect, useState } from "react";
import { getMyLostItems, deleteLostItem } from "../services/lostItemService";
import MyLostItemCard from "../components/MyLostItemCard/MyLostItemCard";
import "./MyLostItems.css";
import { confirmAction, showNotification } from "../utils/notifications";

function MyLostItems() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            const response = await getMyLostItems();
            if (response.success) {
                setItems(response.data);
            }

        } catch (error) {
            showNotification(error.response?.data?.message || "Failed to load items.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {

        const confirmed = await confirmAction({ title: "Delete this item?", message: "This lost-item report will be permanently removed.", confirmLabel: "Delete item", destructive: true });
        if (!confirmed)
            return;

        try {

            const response = await deleteLostItem(id);

            if (response.success) {
                showNotification(response.message, "success");
                loadItems();
            }

        } catch (error) {

            showNotification(error.response?.data?.message || "Delete failed.", "error");

        }
    };

    const handleEdit = (id) => {
        showNotification("Editing is available from the item details page.");
    };

    const handleMatch = (id) => {
        showNotification("Matching is available after an item is reported.");
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="my-lost-items">

            <h2>My Lost Items</h2>

            {
                items.length === 0
                    ? <p>No lost items found.</p>
                    : (
                        <div className="items-grid">

                            {
                                items.map(item => (

                                    <MyLostItemCard
                                        key={item.id}
                                        item={item}
                                        onDelete={handleDelete}
                                        onEdit={handleEdit}
                                        onMatch={handleMatch}
                                    />

                                ))
                            }

                        </div>
                    )
            }

        </div>
    );
}

export default MyLostItems;
