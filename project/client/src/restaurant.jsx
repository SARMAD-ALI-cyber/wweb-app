import react from "react";
import Card from "react-bootstrap/Card"
import "./restaurant.css"
import NAV from "./nav"
import { Container,Button ,Modal} from "react-bootstrap";
import Nav from "react-bootstrap/Nav"
import {useState,useEffect,useRef} from "react"
import { BrowserRouter as Router, Route, Routes,Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import ReactStars from 'react-rating-stars-component';


function Restaurant(){
  const location = useLocation(); // useLocation hook to get the current location
const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const [data, setData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [showModal,setShowModal]=useState(false);
  const [review, setReview] = useState([]); // State variable to hold review data
  const [averageRating, setAverageRating] = useState(null);
  
  

  const navigate=useNavigate();
  const fetchReviewData = async () => {
    try {
      const response = await fetch('/api/reviews/data');
      if (!response.ok) {
        throw new Error('Failed to fetch review data');
      }
      const reviewData = await response.json();
      setReview(reviewData);
    } catch (error) {
      console.error('Error fetching review data:', error);
    }
  };
  const handleclick = async (menuItem) => {
    try {
      
      const response = await fetch('/api/selected_food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuItem),
      });


      if (!response.ok) {
        throw new Error('Failed to post data');
      }
      console.log("arigato9")
      navigate("/food_details")
      const result = await response.json();
      console.log('Post successful:', result);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/api/restaurant');
      console.log("arigato1")

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();

      setData(jsonData); 
      console.log(jsonData)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    const locat = location.pathname;
    if (data && data.Opening_Time && locat === "/restaurant") {
      const currentDate = new Date();
      const currentHour = currentDate.getHours()+12; // Add 5 hours to adjust to Pakistani time
      console.log(currentHour);
      const split1 = data.Opening_Time;
      let data1 = split1.split(" ");
      let openingTime = parseInt(data1[0]);
      
      // Adjust opening time based on am/pm
      if (data1[1] === "pm" && openingTime !== 12) {
        openingTime += 12;
      }
  
      const split2 = data.Closing_Time;
      let data2 = split2.split(" ");
      let closingHour = parseInt(data2[0]);
  
      // Adjust closing time based on am/pm and handle midnight
      if (data2[1] === "pm" && closingHour !== 12) {
        closingHour += 12;
      } else if (closingHour === 12) {
        closingHour = 0; // Midnight (12 AM) is represented as 0 in hours format
      }
  
      console.log(closingHour);
  
      // Check if the current time is within the opening hours
      if (
        (currentHour >= openingTime && currentHour < closingHour) ||
        (openingTime > closingHour && (currentHour >= openingTime || currentHour < closingHour))
      ) {
        setShowModal(false); // Restaurant is open
      } else {
        setShowModal(true); // Restaurant is closed
      }
    }
  }, [data]);
  const scrollToHeading = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };
  const fetchMenuData = async () => {
    try {
      const response = await fetch('/api/menu');
      if (!response.ok) {
        throw new Error('Failed to fetch menu data');
        
      }
      const jsonData = await response.json();
      console.log(jsonData)
      setMenuData(jsonData);
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };
  console.log(review)
  useEffect(() => {
    fetchData();
    fetchMenuData();
    fetchReviewData()
  }, []);
  console.log(menuData)
  const handleCloseModal=()=>{
    setShowModal(false)
  }  
  useEffect(() => {
    calculateRating(review); // Calculate average rating when review data changes
  }, [review]);

  const calculateRating = (review) => {
    if (review.length > 0) {
      const totalRating = review.reduce((sum, item) => sum + item.rating, 0);
      const averageRating = totalRating / review.length;
      const roundedRating = Math.round(averageRating * 10) / 10; // Round to one decimal place
      setAverageRating(roundedRating);
    } else {
      // If there are no reviews, set average rating to 0 or another default value
      
    }
  };
  

 
     
  
  
     const renderMenuCards = () => {
    console.log("arigato8",menuData)
    return menuData
      .map((cat, catIndex) => (
        
        <div key={catIndex} >
          <h2 ref={heading1Ref}>{cat.category}</h2> {/* Display the category name */}
          <div className="Placement3" >
            {cat.menu.map((menuItem, index) => (
              <Card key={index} style={{ width: '18rem', margin: '1rem', cursor: 'pointer' }} onClick={() => handleclick(menuItem)}>
                <img />
                <Card.Body>
                  <Card.Title>{menuItem.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Price: {menuItem.price}</Card.Subtitle>
                  <Card.Text>
                    {menuItem.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      ));
  };




 return(
    <div>
    <NAV /> 

    <Card style={{ display:"flex"  }} className="placement" >
      
      <Card.Body>
        <h1>{data.Name}</h1>
        <h6>Address:</h6>
        {averageRating !== null && (
        <ReactStars
          count={5}
          value={averageRating}
          size={24}
          edit={false}
          color1={'#f4f4f4'}
          color2={'#ffd700'}
        />
      )}
        <p><a href="/restaurant/reviews">Reviews</a></p>
        <h6>Opening Time: {data.Opening_Time}</h6>
        <h6>Closing Time:   {data.Closing_Time}</h6>
        <img src="/Dominos-logo.png" className="pic2"/>
      </Card.Body>
    </Card>
    
    <Card>
      <Card.Header>
        <Nav variant="pills" defaultActiveKey="#first">
          
        {menuData.map((category, index) => (
             
              <Nav.Item key={index}>
                <Nav.Link
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHeading(heading1Ref);
                  }}
                >
                  {category.category}
                </Nav.Link>
              </Nav.Item>
            ))}
          
        </Nav>
      </Card.Header>
      </Card>
      
      <Card>
      <Card.Body>
        {renderMenuCards()}

      </Card.Body>
    </Card>
    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Restaurant Closed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The restaurant is currently closed.</p>
          <p>Opening time: 10 AM</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    
    
    </div>

 );








}
export default Restaurant;