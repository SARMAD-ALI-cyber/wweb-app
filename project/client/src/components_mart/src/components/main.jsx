import React from "react";

const Home = () => {
  
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/main.png.jpg"
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">Welcome to Cheetah Mart.</h5>
              <p className="card-text fs-5 d-none d-sm-block ">
              Whether you're looking for everyday essentials or something special, our well-organized aisles and convenient layout make finding what you need a breeze. Plus, with regular promotions and discounts, there's always a good deal waiting for you.

Visit us today and discover why we're your ultimate shopping destination!


              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
