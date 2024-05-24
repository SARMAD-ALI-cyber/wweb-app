import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import ReactStars from 'react-rating-stars-component';
import { useNavigate } from "react-router-dom";

function Review() {
  const navigate = useNavigate();
  const [lgShow, setLgShow] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log("arigato4")
        const response = await fetch('/api/reviews/data'); 
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const reviewData = await response.json();
        setReviews(reviewData);
        console.log(reviewData)
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
     setLgShow(true)
    fetchReviews(); 
  }, []);

  const ratingChanged = (newRating) => {

  };

  const handleSubmit = () => {
    navigate('/reviews/giveReview');
    setLgShow(false);
  };

  return (
    <>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() =>{  navigate("/restaurant");setLgShow(false)}}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "10px" }}>
          <Container>
            {reviews.map((review, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <h6>{review.username} </h6>
                  <ReactStars
                    count={5}
                    value={review.rating} 
                    size={24}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p>{review.review}</p>
                </Card.Body>
              </Card>
            ))}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Give a review
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Review;
