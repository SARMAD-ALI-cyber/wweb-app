import React, { useState, useEffect } from "react";
import "./reviews.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

function ReviewForm() {
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [lgShow, setLgShow] = useState(false);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    setLgShow(true);
  }, []);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async () => {
    try {
      // Make a POST request to your backend using fetch
      navigate("/restaurant");
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            
          rating: rating,
          review: reviewText,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      // Navigate to the reviews page
      
      setLgShow(false);
    } catch (error) {
      // Handle error
      console.error("There was an error submitting the review!", error);
    }
  };
  return (
    <>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Reviews
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "10px" }}
        >
          <h6>Give Rating</h6>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
          />
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReviewForm;
