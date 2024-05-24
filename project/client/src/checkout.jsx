import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  MDBBtn,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography
} from 'mdb-react-ui-kit';

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [lgShow, setLgShow] = useState(false);
  const [cartData, setCartData] = useState([]);

  const handleCart= ()=>{
     const path=location.pathname;
     console.log(path)
     if(path==="/cart"){
      navigate("/cart/checkout")
     }
     else{
      
      navigate("/restaurant/checkout")
     }


  }
  
  const handleDelete = async (itemName, restaurantName) => {
    try {
      
     const response= await fetch('/api/cart/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemName, restaurantName })
      });
      if (response.ok) {
        setCartData(prevCartData => prevCartData.filter(item => !(item.name === itemName && item.resName === restaurantName)));
      } else {
        console.error('Error deleting item:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleHide = () => {
    if (location.pathname === '/cart') {
      setLgShow(false);
      navigate('/');
    } else {
      setLgShow(false);
      navigate('/restaurant');
    }
  };

  useEffect(() => {
    setLgShow(true);

    // Fetch cart data from the backend
    const fetchCartData = async () => {
      try {
        const response = await fetch('/api/cart/send'); // Update the URL to your actual cart endpoint
        const data = await response.json();
        setCartData(data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);
  console.log(cartData)
  // Function to calculate total quantity
  const calculateTotalQuantity = () => {
    if (!cartData) return 0;
    
    return cartData.reduce((total, item) => total + item.quantity, 0);
  };
  const calculatePrice = () => {
    let price = 0;
    
    for (const item of cartData) {
      price += (item.price*item.quantity);
    }
  
    price += 100;  // Adding 100 as an additional cost
    console.log(price);
    return price;
  };

  return (
    <>
      <Modal
        size="lg"
        show={lgShow}
        onHide={handleHide}
        aria-labelledby="example-modal-sizes-title-lg"
        
      >
        <Modal.Body style={{ overflow: 'auto', height: '600px' }}>
          <section className="h-100 h-custom" style={{ backgroundColor: 'white' }}>
            <MDBCardBody className="p-0">
              <MDBRow className="g-0">
                <MDBCol lg="8">
                  <div className="p-5">
                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                        Food Cart
                      </MDBTypography>
                      <MDBTypography className="mb-0 text-muted">
                        {cartData  ? `${calculateTotalQuantity()} items` : '0 items'}
                      </MDBTypography>
                    </div>

                    {/* Render cart items */}
                    { cartData.map((item, index) => (
                      <div key={index}>
                        <hr className="my-4" />
                        <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                          <MDBCol md="2" lg="2" xl="2">
                            <MDBCardImage src={item.image} fluid className="rounded-3" alt={item.name} />
                          </MDBCol>
                          <MDBCol md="3" lg="3" xl="3">
                            <MDBTypography tag="h6" className="text-muted">{item.resName}</MDBTypography>
                            <MDBTypography tag="h6" className="text-black mb-0">{item.name}</MDBTypography>
                          </MDBCol>
                          <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                            <MDBBtn color="link" className="px-2">
                              <MDBIcon fas icon="minus" />
                            </MDBBtn>
                            <MDBInput type="number" min="0" defaultValue={item.quantity} size="sm" />
                            <MDBBtn color="link" className="px-2">
                              <MDBIcon fas icon="plus" />
                            </MDBBtn>
                          </MDBCol>
                          <MDBCol md="3" lg="2" xl="2" className="text-end">
                            <MDBTypography tag="h6" className="mb-0">PKR {item.price}</MDBTypography>
                          </MDBCol>
                          <MDBCol md="3" lg="2" xl="2" className="text-end">
                            <MDBTypography tag="h6" className="mb-0" style={{cursor:"pointer"}} onClick={() => handleDelete(item.name, item.resName)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className="bi bi-trash styling" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                              </svg>
                            </MDBTypography>
                          </MDBCol>
                          <MDBCol md="1" lg="1" xl="1" className="text-end">
                            <a href="#!" className="text-muted">
                              <MDBIcon fas icon="times" />
                            </a>
                          </MDBCol>
                        </MDBRow>
                      </div>
                    ))}

                    <hr className="my-4" />

                    <div className="pt-5">
                      <MDBTypography tag="h6" className="mb-0">
                        <MDBCardText tag="a" href="/" className="text-body">
                          <MDBIcon fas icon="long-arrow-alt-left me-2" />
                          Back to Main Menu
                        </MDBCardText>
                      </MDBTypography>
                    </div>
                  </div>
                </MDBCol>

                <MDBCol lg="4" className="bg-grey">
                  <div className="p-5">
                    <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                      Summary
                    </MDBTypography>
                    <hr className="my-4" />
                    <div className="d-flex justify-content-between mb-4">
                      <MDBTypography tag="h5" className="text-uppercase">
                        Items {cartData.length===0 ? '0': calculateTotalQuantity()}
                      </MDBTypography>
                      <MDBTypography tag="h5">PKR {cartData.length===0 ? '0.00': calculatePrice()-100}</MDBTypography>
                    </div>
                    <hr className="my-4" />
                    <h5 class="text-uppercase mb-3">Delivery Charges</h5>

                    <div class="mb-4 pb-2">
                    <MDBTypography tag="h5" className="text-uppercase">
                        PKR 100
                      </MDBTypography>
                    
                          <hr className="my-4" />
                        </div>
                    <div className="d-flex justify-content-between mb-5">
                      <MDBTypography tag="h5" className="text-uppercase">
                        Total price
                      </MDBTypography>
                      <MDBTypography tag="h5">PKR {calculatePrice()}</MDBTypography>
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </section>
        </Modal.Body>
        <Modal.Footer>
          
            <MDBBtn color="dark" block size="lg" onClick={handleCart}>
              Checkout
            </MDBBtn>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Checkout;
