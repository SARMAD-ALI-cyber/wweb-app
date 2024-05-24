import React from "react";
import Slider from "react-slick";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Caro.css'; // Import your custom CSS file
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import App from "./App";

const CustomPrevArrow = (props) => {
    const {onClick} = props;
    return (
        <button className="custom-arrow-right" onClick={onClick}>
            <img src="/left-arrow.png"/>
        </button>
    );
};

const CustomNextArrow = (props) => {
    const {onClick} = props;
    return (
        <button className="custom-arrow-left" onClick={onClick}>
            <img src="/right-arrow.png"/>
        </button>
    );
};

function Caro(props) {
    const navigate = useNavigate(); // Initialize useNavigate hook
    console.log(props)
    function CARD1(props) {
        const handleClick = async () => {
            navigate("/restaurant");
            const requestData = {
                name: props.name,
            };
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

        return (
            <Card
                style={{width: '18rem', height: '300px', cursor: 'pointer'}}
                className="Card"
                onClick={handleClick}
            >
                <Card.Img variant="top" src={props.pic} style={{border: 'solid black 1px',height:"200px"}}/>
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <p>{props.Type}</p>
                    <Card.Text style={{display: 'flex'}}>
                       
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }

    const data1 = props.data;
    console.log(data1)
    const itemsCount = data1.length;
    const isSliderEnabled = itemsCount > 4;

    if (isSliderEnabled) {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: <CustomPrevArrow/>,
            nextArrow: <CustomNextArrow/>,
        };

        const divElements = data1.map((item, index) => (
            <div key={index}>
                <CARD1
                    name={item.Name}
                    time={item.Opening_Time}
                    delivery={item.Delivery_Fee}
                    pic={item.image}
                    Type={item.Type}
                />
            </div>
        ));

        return (
            <Slider {...settings}>
                {divElements}
            </Slider>
        );
    } else {
        const divElements = data1.map((item, index) => (
            
                <CARD1
                    key={index}
                    name={item.userName}
                    pic={item.image}
                    Type={item.Type}
                />
            
        ));

        return <div style={{display:"flex"}}>{divElements}</div>;
    }
}

export default Caro; 
