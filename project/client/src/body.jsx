import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Search from "./search";
import Caro from "./Caro";
import Form from 'react-bootstrap/Form';
import Footer from "./footer";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import Picture from "./picture"

function Body() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [types, setTypes] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [locationData, setLocationData] = useState({
    area: '',
    province: '',
    city: ''
  });
 const navigate=useNavigate()
  useEffect(() => {
    fetchData();
  }, []);
  const fetchLocationData = async () => {
    try {
      const response = await fetch('/api/location/get');
      if (!response.ok) {
        throw new Error('Failed to fetch location `data');
      }
      const locationData1 = await response.json();
      setLocationData(locationData1)
      return locationData1;
    } catch (error) {
      console.error('Error fetching location data:', error);
      return null;
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch('/api');
      if (!response.ok) {
        throw new Error('Failed to fetch general data');
      }
      const generalData = await response.json();
      console.log('General data:', generalData);
  
      const locationData = await fetchLocationData();
      console.log('Location data:', locationData);
      console.log(generalData)
      const cityFilteredData = generalData.filter(item => item.city === locationData.city);
      extractTypes(cityFilteredData)
      console.log('Filtered data based on city:', cityFilteredData);
       setData(cityFilteredData)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 
  console.log(data)
  useEffect(() => {
    const isModalShown = sessionStorage.getItem('isModalShown');
   
    if (!isModalShown) {
   
   
      setShowModal(true);
      sessionStorage.setItem('isModalShown', 'true');
    }
  }, []);
  const handleSubmit = async () => {
    try {
      setShowModal(false);
      window.location.reload()
      const response = await fetch('/api/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(locationData)
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Location data submitted successfully:', result);
      
    } catch (error) {
      console.error('Error submitting location data:', error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocationData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
 
  
  const extractTypes = (jsonData) => {
    const uniqueTypes = [...new Set(jsonData.map(item => item.Type))];
    setTypes(uniqueTypes);
    console.log(types)
  };
  

  return (
    <div>
      
      <div style={{ position: "relative", width: "100%", height: "600px" }}>
  <img
    src="/pngtree-food-seasoning-food-banner-image_169169.jpg"
    className="imagePlacement"
    alt="Responsive image"
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
  />
  <div style={{ position: "absolute", top: "150px", left: "10px", zIndex: 1, padding: "20px", color: "white" }}>
    <h1 style={{ fontSize: "3em" }}>Cheetah Restaurant</h1>
    <p style={{ fontSize: "1.5em" }}>Here You can place order from our restaurants associated with us </p>
    <p style={{ fontSize: "1.5em" }}>With our riders making sure That you Dont Stay hungry for Long</p>

  </div>
</div>

      <div style={{ display: "flex" }}>
        
        <div className="card1 col-9 offset-1">
          <Search />
          { types.map(type => (
            <React.Fragment key={type}>
              <h1>Some Tasty {type} to try out in {locationData.city} </h1>
              {data.length > 0 &&<Caro data={data.filter(item => item.Type === type)} />}
            </React.Fragment>
          ))}{/* You may want to handle this case separately if data is not available */}
        </div>
      </div>
      <Footer />

      {/* Modal */}
      <Modal show={showModal} onHide={()=>setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Please Give Us Your Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group controlId="formArea">
              <Form.Label>Enter Area</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Normal text" 
                name="area" 
                value={locationData.area}
                onChange={handleInputChange} 
              />
            </Form.Group>
            <br/>
            <Form.Group controlId="formProvince">
              <Form.Label>Select Province</Form.Label>
              <Form.Select 
                aria-label="Select Province" 
                name="province" 
                value={locationData.province}
                onChange={handleInputChange}
              >
                <option value="">Select Province</option>
                <option value="Sindh">Sindh</option>
                <option value="Punjab">Punjab</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Balochistan">Balochistan</option>
              </Form.Select>
            </Form.Group>
            <br />
            <Form.Group controlId="formCity">
              <Form.Label>Select City</Form.Label>
              <Form.Select 
                aria-label="Select City" 
                name="city" 
                value={locationData.city}
                onChange={handleInputChange}
              >
                <option value="">Select City</option>
                <option value="KARACHI">Karachi</option>
                <option value="ISLAMABAD">Islamabad</option>
                <option value="LAHORE">Lahore</option>
                <option value="RAWALPINDI">Rawalpindi</option>
                <option value="MULTAN">Multan</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Body;
