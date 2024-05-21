import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="restaurant-owner-home-container">
      <div className="header">
        <h1>Welcome, Owner!</h1>
        <p>Manage your restaurant efficiently</p>
      </div>
      <div className="actions">
        <div className="action-card">
          <h2>Menu Management</h2>
          <p>Manage your restaurant's menu items</p>
          <Link to="/edit-menu">
            <button>Edit Menu</button>
          </Link>
        </div>
        <div className="action-card">
          <h2>Promotions</h2>
          <p>Manage your current promotions and discounts</p>
          <button>Manage Promotions</button>
        </div>
        <div className="action-card">
          <h2>Customer Contact</h2>
          <p> Respond to your customer </p>
          <Link to="/contact">
            <button>Contact Customer</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
