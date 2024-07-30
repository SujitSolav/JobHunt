import React from 'react';
import './About.css';

const About = () => {
    return (
        <section className="about-us">
            <div className="about-container">
                <h2>About Us</h2>
                <p className="about-description">
                    Welcome to our company! We are dedicated to providing the best services to our customers. Our team is committed to excellence and innovation. We believe in creating a positive impact in the world through our work.
                </p>
                <div className="values-mission">
                    <div className="value">
                        <h3>Our Mission</h3>
                        <p>To deliver high-quality products that bring value to our customers and positively impact their lives.</p>
                    </div>
                    <div className="value">
                        <h3>Our Vision</h3>
                        <p>To be a global leader in our industry, known for our innovation, customer satisfaction, and commitment to sustainability.</p>
                    </div>
                    <div className="value">
                        <h3>Our Values</h3>
                        <p>Integrity, Excellence, Innovation, Customer Focus, and Sustainability.</p>
                    </div>
                </div>
                <div className="team">
                    <h3>Meet Our Team</h3>
                    <div className="team-members">
                        <div className="team-member">
                            <img src="team-member1.jpg" alt="Team Member 1" className="team-photo"/>
                            <h4>John Doe</h4>
                            <p>CEO</p>
                        </div>
                        <div className="team-member">
                            <img src="team-member2.jpg" alt="Team Member 2" className="team-photo"/>
                            <h4>Jane Smith</h4>
                            <p>CTO</p>
                        </div>
                        <div className="team-member">
                            <img src="team-member3.jpg" alt="Team Member 3" className="team-photo"/>
                            <h4>Emily Johnson</h4>
                            <p>COO</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
