import React, { useEffect, useState } from "react";
import { Container, InputGroup, FormControl, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function Search() {
  const [data, setData] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [cardElements, setCardElements] = useState(null);
  const navigate = useNavigate(); 


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    }
  };
  let backspaceHandled = false;
  const searchOption = (event) => {
    var searchInput = document.getElementById("searchInput");
    var inputValue = searchInput.value.trim();
    
    if (event.key === "Backspace" && !backspaceHandled) {
      if(inputValue===""){
        console.log("yo");
       setShowCard(false);
       return;
      }
      else{
        
         console.log("hello")
         console.log(backspaceHandled)
         
      }
      backspaceHandled= true
    }
    if (event.key !== "Backspace") {
      backspaceHandled = false;
      console.log("guminasai")
    }
    if ( (searchInput && data[0])) {
      const data1 = data
      console.log(data1)
      
      const sortedData = data1.filter(item => item.userName.toLowerCase().startsWith(inputValue.toLowerCase()));
      
      console.log(sortedData)
      const maxItems = 6;
      const newArray = sortedData.slice(0, maxItems);
      
      const handleClick = async (name) => {
        navigate("/restaurant");
    
        const requestData = { name };
    
        try {
          const response = await fetch('/api/endpoint', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          console.log('Data sent successfully:', requestData);
        } catch (error) {
          console.error('Error sending data:', error.message);
        }
      };
    
      const elements = newArray.map((item, index) => (
        <div key={index} onClick={() => handleClick(item.userName)} style={{ cursor: 'pointer' }}>
          <h5>{item.userName}</h5>
          <hr />
        </div>
      ));


  
      setCardElements(
        <Card style={{ width: '550px',position:"absolute",zIndex:"1"}}>
          <Card.Body>
            <Card.Text style={{}}>
              
              {elements}
              
            </Card.Text>
          </Card.Body>
        </Card>
      );
      setShowCard(true);
    }
  };
  

  return (
    <Container className="col-6">
      
      <InputGroup className="my-3">
        <FormControl
          id="searchInput"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
          className="form1 rounded "
          onKeyUp={searchOption}
        />
      </InputGroup>

      {showCard && cardElements}
    </Container>
  );
}

export default Search;