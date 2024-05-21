import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import "./food_check.css";

function Food() {
  const [lgShow, setLgShow] = useState(false);
  const [foodData, setFoodData] = useState({});
  const [quantity, setQuantity] = useState(1); // Track the quantity of items
  const [successShow, setSuccessShow] = useState(false); // State to show success modal

  const navigate = useNavigate();

  useEffect(() => {
    setLgShow(true);
    // Fetch data from server
    const fetchData = async () => {
      try {
        const response = await fetch('/api/food_details'); // Update the URL to your actual endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFoodData(data);
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClose = () => {
    setLgShow(false);
    navigate('/restaurant');
  };

  const handleAddToCart = async () => {
    setSuccessShow(true)
    try {
      const cartItem = {
        name: foodData.name,
        price: foodData.price,
        quantity: quantity
      };

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),

      });
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
      console.log('Item added to cart successfully');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  const handleQuantityPlus = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    console.log(quantity)
  };

  const handleQuantityMinus = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  console.log(successShow)

  return (
    <>
      <Modal
        size="lg"
        show={lgShow}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body style={{ height: "600px", overflow: "auto" }}>
          <img src={foodData.imageUrl || '/istockphoto-1442417585-612x612.jpg'} style={{ width: "100%", height: "400px" }} alt="Food"/>
          <h1>{foodData.name || 'Pizza'}</h1>
          <p>{foodData.description || 'Description'}</p>
          <h4>{foodData.price ? `PKR ${foodData.price}` : 'Price'}</h4>
          <Alert key={"info"} variant={"info"}>
            Variations:
          </Alert>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Specifications:</Form.Label>
            <Form.Control as="textarea" rows={3} defaultValue={foodData.specifications} />
          </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button className="bt1" onClick={handleQuantityPlus}>
            <img src="/plus.png" style={{ height: "80%", width: "100%" }} alt="Plus" />
          </Button>
          <p className="placement3">{quantity}</p>
          <Button className="bt2" onClick={handleQuantityMinus}>
            <img src="/minus.png" style={{ height: "100%", width: "100%" }} alt="Minus"  />
          </Button>
          <Button style={{ width: "60%", height: "80%" }} onClick={handleAddToCart}>Add to Cart</Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={successShow}
        onHide={() => setSuccessShow(false)}
        aria-labelledby="success-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="success-modal">Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success">
            Item added to cart successfully!
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => { navigate("/restaurant");setSuccessShow(false)}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Food;