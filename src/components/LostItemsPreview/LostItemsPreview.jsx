import "./LostItemsPreview.css";

function LostItemsPreview() {

    const lostItems = [
        {
            id: 1,
            image: "🎒",
            name: "Backpack",
            location: "Hyderabad",
            date: "2 days ago"
        },
        {
            id: 2,
            image: "📱",
            name: "Phone",
            location: "Vizag",
            date: "Today"
        },
        {
            id: 3,
            image: "💳",
            name: "Wallet",
            location: "Vijayawada",
            date: "Yesterday"
        }
    ];

    return (
        <section className="lost-preview">

            <div className="section-header">
                <h2>Latest Lost Items</h2>
                <a href="/lost-items">View All →</a>
            </div>

            <div className="lost-grid">

                {lostItems.map(item => (

                    <div className="lost-card" key={item.id}>

                        <div className="lost-image">
                            {item.image}
                        </div>

                        <h3>{item.name}</h3>

                        <p>{item.location}</p>

                        <small>{item.date}</small>

                        <button className="btn btn-primary">
                            View Details
                        </button>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default LostItemsPreview;