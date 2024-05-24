const express = require('express');
const path = require('path');
const { getRestaurant, extractObjectFromMongoDB,insertReview,getReviewData,getMenuData,addToCart,getCartData,deleteCartItem,deleteAllCartData,fetchUsername} = require('./calculation.js');
const nodemailer = require('nodemailer');
const twilio = require('twilio');


const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());


app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'client/build')));
const data1={
    hello:"brotha"
}
app.get('/api', (req, res) => {
    getRestaurant()
        .then(data => {
            console.log("yipper",data[0]['res_4'])
            res.json(data);
        })
        .catch(error => {
            console.error('Error fetching restaurant data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});
let get;
app.post('/api/endpoint',(req,res)=>{
    const formData = req.body;
    get=formData
    console.log(get)
  
  console.log('Received form data:', formData);

  // Send a response back to the frontend
})
app.get('/api/restaurant',(req,res)=>{
    extractObjectFromMongoDB(get)
    .then(data => {
        
        console.log(data)
        res.json(data)
    })
    .catch(error => {
        console.error('Error fetching restaurant data:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
})
class Review1 {
    constructor(name, rating,review,username) {
      this.name = name;
      this.rating = rating;
      this.review=review;
      this.username=username;
    }
}
app.post('/api/reviews',(req,res)=>{
    const data=req.body
    console.log(data)

    const review2=new Review1(get.name,data.rating,data.review,data.username)
    console.log("yo",review2)
    insertReview(review2)
    .then((savedReview) => {
      console.log('Insert successful:', savedReview);
       // Close the connection after the operation
    })
    .catch((error) => {
      console.error('Insert failed:', error);
       // Close the connection after the operation
    });
})

app.get('/api/reviews/data',(req,res)=>{
    getReviewData(get.name)
  .then((reviews) => {
    res.json(reviews)
    
    console.log('Reviews retrieved:', reviews);
  })
  .catch((err) => {
    console.error('Error:', err);
  });

})
app.get('/api/menu',(req,res)=>{
     getMenuData(get.name)
     .then((data) => {
      console.log("hello1",data)
      res.json(data)
      
    })
    .catch((err) => {
      console.error('Error:', err);
    });
  
})
let food;
app.post('/api/selected_food',(req,res)=>{
  try {
    const data=req.body;
   food=data
   console.log(data)
    
    res.status(200).json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    
    console.error('Error:', error);
    // Return an appropriate error response
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
  
})
app.get("/api/food_details",(req,res)=>{
  console.log(food)
   res.json(food)
})
let cart
app.post("/api/cart",(req,res)=>{
  cart=req.body
  const object1={
    resName:get.name,
    name:cart.name,
    price: cart.price,
    quantity:cart.quantity,
    variation:cart.variation,
    addons:cart.addons,
    image:cart.image


  }
  addToCart(object1)
    .then((data) => {
      console.log('Insert successful:', data);
       // Close the connection after the operation
    })
    .catch((error) => {
      console.error('Insert failed:', error);
       // Close the connection after the operation
    });
})
app.get("/api/cart/send",(req,res)=>{
  getCartData()
  .then((data) => {
    console.log(data)
    res.json(data)
    console.log('Cart Data fetched:', data);
    
  })
  .catch((error) => {
    console.error('Cart failed:', error);
  });
  

})
app.post("/api/cart/delete",(req,res)=>{

  const data = req.body
  console.log("data fetched",data);
  deleteCartItem(data.itemName,data.restaurantName)
  .then((data1) => {
    console.log(data1)
    res.json(data1)
    console.log('Cart Data fetched:', data1);
    
  })
  .catch((error) => {
    console.error('Cart failed:', error);
  });
})
  // Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure:true,
    logger:true,
    debug:true,
    secureConnection:false,

    auth: {
      user: 'maliirfan200263@gmail.com',
      pass: 'wxpi dbut dlfc aztx'
    },
    tls :{
      rejectUnauthorized:true
    }
  }) 
app.post('/api/checkout',(req,res)=>{
  console.log("arigato16")
  const data = req.body;
  console.log(data)
 const name= data.firstName+" "+data.lastName
  console.log(data.email)
  
  deleteAllCartData()
  .then(() => {
    const mailOptions = {
      from: 'maliirfan200263@gmail.com',
      to: data.email,
      subject: 'Order Confirmation',
      html: `
        <h1>Order Confirmation</h1>
        <p>Hello ${name},</p>
        <p>Your order has been placed successfully!</p>
        <h2>Order Details:</h2>
        <ul>
          ${data.cartItems.map(item => `<li>${item.name}: Rs${item.price*item.quantity}</li>`).join('\n')}
        </ul>
        <p>Total: RS${data.cartItems.reduce((total, item) => total + item.price*item.quantity+100, 0)}</p>
        <p>Payment Method: ${data.paymentMethod} </p>
        <p>Shipping Address: ${data.address}</p>
        <p>Thank you for shopping with us!</p>
      `
    };
    
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.send('Order placed successfully.');
      }
    });
  })
  
  .catch(error => {
    console.error('Error deleting cart data:', error);
    res.status(500).send('Internal server error');
  });
  

})
let location;
app.post("/api/location",(req,res)=>{
  location=req.body
  console.log(location)
})
app.get("/api/location/get",(req,res)=>{

  res.json(location)
})
app.get("/api/usernane",(req,res)=>{
  fetchUsername()
  .then((data1) => {
    console.log("arigato28",data1)
    res.json(data1)
    console.log(' Username fetched:', data1);
    
  })
  .catch((error) => {
    console.error('Username failed:', error);
  });
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
