import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to Our Website</h1>
                    <p>Discover amazing opportunities and connect with top companies.</p>
                    <a href="#about" className="cta-button">Learn More</a>
                </div>
            </section>
            
            <section id="about" className="about">
                <div className="about-container">
                    <h2>About Us</h2>
                    <p>
                        We are dedicated to providing the best services to our customers. Our team is committed to excellence and innovation.
                    </p>
                </div>
            </section>
            
            <section className="features">
                <div className="feature">
                    <img style={{height:'200px', width:'280px'}} src="https://c0.wallpaperflare.com/preview/662/987/712/business-cooperation-handshake-people.jpg" alt="Feature 1" />
                    <h3>Feature One</h3>
                    <p>Description of feature one.</p>
                </div>
                <div className="feature">
                    <img style={{height:'200px', width:'280px'}}  src="https://c1.wallpaperflare.com/preview/482/39/625/workspace-workplace-partnership-office.jpg" alt="Feature 2" />
                    <h3>Feature Two</h3>
                    <p>Description of feature two.</p>
                </div>
                <div className="feature">
                    <img style={{height:'200px', width:'280px'}}  src="https://c4.wallpaperflare.com/wallpaper/128/917/72/architecture-building-construction-design-wallpaper-preview.jpg" alt="Feature 3" />
                    <h3>Feature Three</h3>
                    <p>Description of feature three.</p>
                </div>
            </section>
            
            <section className="cta">
                <div className="cta-container">
                    <h2>Ready to Get Started?</h2>
                    <p>Join us today and take your career to the next level.</p>
                    <a href="/register" className="cta-button">Sign Up Now</a>
                </div>
            </section>
        </div>
    );
};

export default Home;
