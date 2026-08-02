import { Link } from "react-router-dom";
import "./Hero.css";
import { useAuth } from "../../context/AuthContext";

function Hero() {
    const { isAuthenticated, userName } = useAuth();
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>{isAuthenticated ? `Welcome back, ${userName || "there"}!` : "Lost Something? Found Something?"}</h1>
                <p>{isAuthenticated ? "Report an item, check your matches, and help reunite belongings with their owners." : "Lost & Found helps people reconnect with their belongings quickly and securely."}</p>
                <div className="hero-buttons">
                    <Link to="/report-lost-item" className="btn btn-primary">Report Lost Item</Link>
                    <Link to="/report-found-item" className="btn btn-secondary">Report Found Item</Link>
                </div>
            </div>
            <div className="hero-image">
                <img className="hero-visual" src={`${import.meta.env.BASE_URL}lost-found-hero.jpeg`} alt="Lost and found belongings" />
            </div>
        </section>
    );
}
export default Hero;
