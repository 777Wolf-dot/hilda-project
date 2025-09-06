import React from 'react';
import '../Styles/Home.css';
import { Link } from 'react-router-dom';

const Home = ({ darkMode, user }) => {
  return (
    <div className={`home-container ${darkMode ? 'dark' : 'light'}`}>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <img
            src="https://i.ibb.co/B5K2z87f/Chat-GPT-Image-Sep-5-2025-11-19-39-PM.png"
            alt="Hero"
            className="hero-img"
          />
          <h1>Welcome to Hilda</h1>
          <p>Explore AI, Entertainment, Productivity, and Smart Features</p>
          <Link to="/register" className="hero-btn1">Get Started</Link>
          <Link to="/features" className="hero-btn1">Explore</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Explore Our Features</h2>
        <div className="feature-cards">

          {/* Entertainment */}
          <div className="card">
            <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80" alt="Entertainment" />
            <h3>Entertainment</h3>
            <p>Music Player & AI Assistant (Chat + Voice)</p>
          </div>

          {/* Productivity */}
          <div className="card">
            <img src="https://i.ibb.co/BHkW3Gpm/product.jpg" alt="Productivity" />
            <h3>Productivity</h3>
            <p>Notes, To-Do, and Task Management</p>
          </div>

          {/* Smart Features */}
          <div className="card">
            <img src="https://i.ibb.co/N6Rf411y/smart.jpg" alt="Smart Features" />
            <h3>Smart Features</h3>
            <p>Weather, News, and Daily Quotes</p>
          </div>

          {/* Admin */}
          <div className="card">
            <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80" alt="Admin" />
            <h3>Admin</h3>
            <p>Admin Dashboard and Management Tools</p>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Sign In to Access All Features</h2>
        <p>Log in to explore the full Hilda experience.</p>
        <Link to="/login" className="cta-btn">Sign In</Link>
      </section>
    </div>
  );
};

export default Home;