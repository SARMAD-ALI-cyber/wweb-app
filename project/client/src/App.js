import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import NAV from './nav';
import Search from './search';
import Caro from './Caro';
import Body from './body';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Checkout from './checkout';
import Checkout1 from './checkout1';
import Restaurant from './restaurant';
import Food from './food_check';
import Review from "./reviews"
import ReviewForm from "./reviewForm"
import Cart from './components_mart/src/pages/Cart'
import { Provider } from 'react-redux';
import Home from "./components_mart/src/components/main"
function App(props) {''
  
  
  
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <container>
              <NAV />
              <Body />
            </container>
          }
        />
        <Route
          exact
          path="/cart"
          element={
            <container>
              <NAV />
              <Body />


              <Checkout />
            </container>
          }
        />
        <Route
          exact
          path="/cart/checkout"
          element={
            <container>
              <NAV />
              <Body />
              <Checkout1 />
            </container>
          }
        />
        <Route
          exact
          path="/restaurant"
          element={
            <container>
              
              <Restaurant />

            </container>
          }
        />
        <Route
          exact
          path="/food_details"
          element={
            <container>
              <Restaurant />
              <Food />
            </container>
          }
        />
        <Route
          exact
          path="/restaurant/reviews"
          element={
            <container>
              <Review />
              <Restaurant />
            </container>
          }
        />
        <Route
          exact
          path="/reviews/giveReview"
          element={
            <container>
              <ReviewForm />
              <Restaurant />
            </container>
          }
        />
        <Route
          exact
          path="/restaurant/cart"
          element={
            <container>

              <Restaurant />

              
              <Checkout />
            </container>
          }
        />
         <Route
          exact
          path="/restaurant/checkout"
          element={
            <container>

              <Restaurant />
               <Checkout1 />
            </container>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;