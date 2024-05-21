import ListGroup from "./components/ListGroup";
import {ContactUs} from  "./components/Contact"
import { FoodCard } from "./components/MyMenu";
import { NavBar } from "./components/NavBar";
import EditMenu from "./components/EditMenu";
import Home from "./components/Home";
import { Fragment } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

interface MenuItem {
  _id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}
function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/menuget");
        console.log("Fetched data:", response.data);
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []);
  
  return (
    <Router>
      <Fragment>
        <NavBar></NavBar>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/my-menu"
            element={
              <div className="row">
                {menuItems.map((menuItem) => (
                  <FoodCard
                    key={menuItem._id}
                    price={menuItem.price}
                    CardTitle={menuItem.name}
                    description={menuItem.description}
                    image={"http://localhost:5000/images/" + menuItem.image}
                  />
                ))}
              </div>
            }
          />
          <Route path="/edit-menu" element={<EditMenu />} />
          <Route path="/contact" element={<ContactUs/>}></Route>
        </Routes>
      </Fragment>
    </Router>
  );
}
export default App;
