import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./nav.css"
import { useLocation,useNavigate } from 'react-router-dom';
import {Badge} from "react-bootstrap"
import {useState,useEffect,useRef} from "react"



const styles= {
    backgroundColor: "yellow",
}
const styles1={
    height:"80px"
    
}

function NAV() {
  const location = useLocation();
  const currentPath=location.pathname
  const [cartItems, setCartItems] = useState([]);
  const prevCartItemsRef = useRef(cartItems); // To store previous state
  const [isFetching, setIsFetching] = useState(false);
  const [locationData,setLocationData]=useState([]);
  const [username,setUsername]=useState("..loading")
  const navigate=useNavigate();
  
  const handleSignOut= ()=>{

    window.location.href = 'http://localhost:5000/mainMenue';

  }

   

  console.log(currentPath)
  let relativePath = "/cart";
  if(currentPath=="/restaurant"){
      relativePath=`${currentPath}/cart`
  }
  useEffect(() => {
    fetchCartItems();
    fetchLocationData(); 
    fetchUsername(); 

}, []);
console.log(cartItems)
const calculateTotalQuantity = () => {
  return cartItems.length;
};
const fetchLocationData = async () => {
  try {
      const response = await fetch('/api/location/get');
      if (!response.ok) {
          throw new Error('Failed to fetch location data');
      }
      const locationData1 = await response.json();
      setLocationData(locationData1)
      console.log('Location data:', locationData);
  } catch (error) {
      console.error('Error fetching location data:', error);
  }
};
const fetchUsername = async () => {
  try {
    console.log('heeyaw')
    const response = await fetch('/api/usernane'); // Update the URL to your actual endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch username');
    }
    const data = await response.json();
    console.log(data)
    setUsername(data[0].username);
  } catch (error) {
    console.error('Error fetching username:', error);
  }
};


const fetchCartItems = async () => {
    try {
        const response = await fetch('/api/cart/send');
        if (!response.ok) {
            throw new Error('Failed to fetch cart items');
        }
        const cartData = await response.json();
       
          setCartItems(cartData);
          
        }
    catch (error) {
        console.error('Error fetching cart items:', error);
    }
};

  return (
    <div>
    <Navbar expand="lg" className="" style={styles}>
      <Container fluid style={styles1}>
        <Navbar.Brand href="#"><img src="/logo.png" className="logo1"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            
          >
            <Nav.Link href="/" >Home</Nav.Link>
            <Nav.Link href="http://localhost:3001/" >Cheetah Mart</Nav.Link>
            
          
            
          <div className="location">
             
             <p className="location1"><img src="/placeholder.png"/>{locationData.area+" "+locationData.city}</p>
          </div>
           <NavDropdown title={username} id="basic-nav-dropdown" className=" name">
              <NavDropdown.Item href="#action/3.1">Settings</NavDropdown.Item>
            
                <Button className="btn btn-dark" style={{position:"relative",left:"15px",marginAbove:"40px"}} onClick={handleSignOut}>Sign Out</Button>
              
              
            </NavDropdown>
            <div >
            <a href={relativePath}  >
           
             <img src="/cart.png" className="cart1" />{cartItems.length !== 0 && (
    <span style={{ position: "relative", right: "10px", borderRadius: "50%", backgroundColor: "blue" }} className="badge badge-dark ms-2">
        {calculateTotalQuantity()}
    </span>
)}
                </a>
           
           
            </div>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default NAV;