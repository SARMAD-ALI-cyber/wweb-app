import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Modal,Alert } from 'react-bootstrap';
import { useNavigate  } from 'react-router-dom';

function Checkout() {
  const navigate=useNavigate();
  const [lgShow, setLgShow] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [showSuccessModal,setShowSuccessModal]=useState(false);
  const [showForm,setShowForm]=useState(false)
  const [locationData, setLocationData] = useState({
    area: '',
    province: '',
    city: ''
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    address2: '',
    country: '',
    state: '',
    paymentMethod: 'Cash On Delivery',
    cartItems: []
  });
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    country: '',
    state: '',
  });
  const handleClick=()=>{
    navigate("/")
  }

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const orderPlaced = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSuccessModal(true)
      const formDataWithCartItems = { ...formData, cartItems: cartData };

      console.log("Form data being sent:", formDataWithCartItems);

      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formDataWithCartItems)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Unknown error occurred');
        }

        const data = await response.json();
        console.log('Order placed:', data);
       
        // Optionally, you can handle the response here (e.g., display a success message)
      } catch (error) {
        console.error('Error placing order:', error);
        // Optionally, you can handle errors here (e.g., display an error message)
      }
    } else {
      const formattedErrors = Object.values(formErrors).filter(error => error).join('\n');
      setErrorMessage(formattedErrors);
      setShowErrorModal(true);
    }
  };

  useEffect(() => {
    setLgShow(true);

    const fetchCartData = async () => {
      try {
        const response = await fetch('/api/cart/send');
        const data = await response.json();
        console.log(data);
        setCartData(data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    const fetchLocationData = async () => {
      try {
        const response = await fetch('/api/location/get');
        const data = await response.json();
        console.log('Location data:', data);
        setLocationData(data);
        setFormData(prevData => ({
          ...prevData,
          address: data.area,
          country: data.city,
          state: data.province
        }));
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchLocationData()
    fetchCartData();
  }, []);
 
  const handleCheckboxChange = () => {
    setFormData({ ...formData, paymentMethod: 'Debit card/Credit Card' });
    setShowForm(true); // Show the form for credit/debit card
  };
  
  const handleCheckboxChangeCash = () => {
    setFormData({ ...formData, paymentMethod: 'Cash On Delivery' });
    setShowForm(false); // Hide the form for credit/debit card
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string' && value.trim() === '' && key !== 'address2') {
        errors[key] = 'This field is required';
        valid = false;
      }
    });

    setFormErrors(errors);
    return valid;
  };
  const calculateQuantity = () => {
    return cartData.reduce((total, items) => {
      total += items.quantity;
      return total; // Make sure to return the updated total
    }, 0);
  }

  const calculateTotalPrice = () => {
    return cartData.reduce((total, item) => total + (item.price*item.quantity), 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body style={{ width: '1200px' }}>
          <Container>
            <Row>
              <Col md={4} className="order-md-2 mb-4" style={{width:"350px"}}>
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="badge badge-secondary badge-pill">No Of Items: {calculateQuantity()}</span>
                </h4>
                <ul className="list-group mb-3">
                  {cartData.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6>Restaurant:</h6>
                        <h6 className="my-0">{item.name}</h6>
                        <small className="text-muted">Quantity:</small>
                        <div>
                        <small className="text-muted">Total Price:</small>
                        </div>
                      </div>
                      <div>
                      <div>
                        <span className="text-muted">{item.resName}</span>
                   </div>
                  <div>
                        <span className="text-muted">{item.price}</span>
                   </div>
                <div>
               <small className="text-muted"> {item.quantity}</small>
              </div>
              <div>
               <small className="text-muted">{item.price * item.quantity}</small>
              </div>
                </div>
                      
                    </li>
                  ))}
                  <li className="list-group-item d-flex justify-content-between" >
                    <span>Delivery Charges:</span>
                    <strong>100</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Total (PKR)</span>
                    <strong>{calculateTotalPrice()+100}</strong>
                  </li>
                </ul>
              </Col>
              <Col md={8} className="order-md-1" style={{ overflow: 'auto', height: '500px' }}>
                <h4 className="mb-3">Billing address</h4>
                <Form className="needs-validation" id="checkout-form" onSubmit={orderPlaced} noValidate>
                  <Row>
                    <Col md={6} mb={3}>
                      <Form.Group controlId="firstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="" required />
                        <Form.Control.Feedback type="invalid">{formErrors.firstName}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} mb={3}>
                      <Form.Group controlId="lastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="" required />
                        <Form.Control.Feedback type="invalid">{formErrors.lastName}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId="email">
                    <Form.Label>Email </Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="you@example.com" required/>
                    <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} className="form-control" placeholder="1234 Main St" required />
                    <Form.Control.Feedback type="invalid">{formErrors.address}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="address2">
                    <Form.Label>Address 2 <span className="text-muted">(Optional)</span></Form.Label>
                    <Form.Control type="text" name="address2" value={formData.address2} onChange={handleChange} className="form-control" placeholder="Apartment or suite" />
                  </Form.Group>
                  <Row>
                    <Col md={5} mb={3}>
                      <Form.Group controlId="country">
                        <Form.Label>City</Form.Label>
                        <Form.Control as="select" name="State" value={formData.country} onChange={handleChange} className="custom-select d-block w-100" required>
                          <option value="">Choose...</option>
                          <option>Karachi</option>
                          <option>Islamabad</option>
                          <option>Lahore</option>
                          <option>Multan</option>
                          <option>Hyderabad</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{formErrors.country}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4} mb={3}>
                      <Form.Group controlId="state">
                        <Form.Label>Province</Form.Label>
                        <Form.Control as="select" name="state" value={formData.state} onChange={handleChange} className="custom-select d-block w-100" required>
                          <option value="">Choose...</option>
                          <option>Sindh</option>
                          <option>Punjab</option>
                          <option>KPK</option>
                          <option>Islamabad</option>
                          <option>Balochistan</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{formErrors.state}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <hr className="mb-4" />
                  <Form.Group controlId="same-address" className="custom-control custom-checkbox">
                    <Form.Check type="checkbox" className="custom-control-input" id="same-address" label="Shipping address is the same as my billing address" />
                  </Form.Group>
                  <Form.Group controlId="save-info" className="custom-control custom-checkbox">
                    <Form.Check type="checkbox" className="custom-control-input" id="save-info" label="Save this information for next time" />
                  </Form.Group>
                  <hr className="mb-4" />
                  <h4 className="mb-3">Payment Method</h4>
                  <div className="d-block my-3">
                    <Form.Check type="radio" id="credit" name="paymentMethod" label="Cash On Delivery" className="custom-control-input" onChange={handleCheckboxChangeCash} checked={formData.paymentMethod === 'Cash On Delivery'}  required />
                    <Form.Check type="radio" id="debit" name="paymentMethod" label="Debit card/Credit Card" className="custom-control-input" onChange={handleCheckboxChange} checked={formData.paymentMethod === 'Debit card/Credit Card'} required />
                    
                  </div>
                  {showForm && (
                    <div>
                  <Row>
                    <Col md={6} mb={3}>
                      <Form.Group controlId="cc-name">
                        <Form.Label>Name on card</Form.Label>
                        <Form.Control type="text" name="ccName" value={formData.ccName} onChange={handleChange} className="form-control" placeholder="" required />
                        <small className="text-muted">Full name as displayed on card</small>
                        <Form.Control.Feedback type="invalid">Name on card is required</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} mb={3}>
                      <Form.Group controlId="cc-number">
                        <Form.Label>Credit card number</Form.Label>
                        <Form.Control type="text" name="ccNumber" value={formData.ccNumber} onChange={handleChange} className="form-control" placeholder="" required />
                        <Form.Control.Feedback type="invalid">Credit card number is required</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3} mb={3}>
                      <Form.Group controlId="cc-expiration">
                        <Form.Label>Expiration</Form.Label>
                        <Form.Control type="text" name="ccExpiration" value={formData.ccExpiration} onChange={handleChange} className="form-control" placeholder="" required />
                        <Form.Control.Feedback type="invalid">Expiration date required</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={3} mb={3}>
                      <Form.Group controlId="cc-cvv">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control type="text" name="ccCvv" value={formData.ccCvv} onChange={handleChange} className="form-control" placeholder="" required />
                        <Form.Control.Feedback type="invalid">Security code required</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  </div>
)}
                  <hr className="mb-4" />
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" form="checkout-form" className="btn btn-primary btn-lg btn-block">Place Order</Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {Object.entries(formErrors).map(([key, error], index) => error && (
              <li key={index}>{key}: {error}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccessModal} >
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Alert key='primary' variant='primary'>
          Order SuccessFully Placed
        </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setShowSuccessModal(false)
            handleClick()
          }}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>  );
}

export default Checkout;
