import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import multer from 'multer';
import {Menu,Customer,Mart,Restaurant,tempusername} from "./DataModel.js"
import path from 'path'
import {connectDB} from "./DataBase.js"
import { fileURLToPath } from 'url';
connectDB();
const port=5000;
const app = express();
app.use(express.json({ extended: false }));
app.use(express.static("public"))
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);
//we need cors middleware here because frontend and backend run on different ports.
import cors from "cors"
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"./public/images")
  },
  filename:(req,file,cb)=>{
    cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });


let username=""
app.post('/api/userName', (req,res) => {
  username = req.body;
  console.log(username)
  
})

app.post('/api/tempuserName',async (req,res) => {
  username = req.body;
  console.log(username)
  const newtempusername= new tempusername({username:username['un']})
  await newtempusername.save();
  
})

// POST route to add a new menu item
app.post('/api/menuupdate', upload.single('image'), (req, res) => {
  console.log(req.file)
  const { name, price, description, variation, addons} = req.body;
  const image = req.file.filename;
  console.log(username)
  const newMenuItem = new Menu({ name,restaurantName: username['un'], price, description, image, variation, addons});

  newMenuItem.save()
    .then(() => res.status(201).json({ message: 'Menu item added successfully' }))
    .catch(err => res.status(400).json({ error: err.message }));
});



app.get('/api/menuget', async (req, res) => {
  try {
    console.log(username)
    var restaurantName = username
    const menuItems = await Menu.find({restaurantName:restaurantName['un']}); // find data of each retaurant
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//======================= Msis haseeb api===============

//main menue route
app.get("/shopSetup", function(req, res){
  const filePath = path.join(__dirname, 'public', 'HTML', 'shopSetup.html');
  res.sendFile(filePath);
})

//main menue route
app.get("/mainMenue", function(req, res){
  const filePath = path.join(__dirname, 'public', 'HTML', 'main.html');
  res.sendFile(filePath);
})

//Authorization page route
app.use(express.static(__dirname+"/public"));
app.get("/authorization", function(req, res){
  const filePath = path.join(__dirname, 'public', 'HTML', 'authorization.html');
  res.sendFile(filePath);
})

// Define POST route to add a new customer
app.post('/api/customers', async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      const customer = new Customer({ userName, email, password });
      await customer.save();
      res.status(201).json({ message: 'Customer created successfully', customer });
      console.log("customer saved")
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Define GET route to get all usernames and passwords
app.get('/api/customers', async (req, res) => {
  try {
    // Query the database to retrieve all customers
    const customers = await Customer.find({}, 'userName password');

    // Extract usernames and passwords
    const userData = customers.map(customer => ({
      userName: customer.userName,
      password: customer.password
    }));

    // Send the usernames and passwords as JSON response
    res.status(200).json(userData);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});



// Define POST route to add a new mart
app.post('/api/marts',upload.single('image'), async (req, res) => {
  try {
    const { userName, email, password, city ,Type} = req.body;
    const image = req.file.filename;
    console.log(image)
    const mart = new Mart({ userName, email, password,city,image:image,Type });
    await mart.save();
    res.status(201).json({ message: 'mart created successfully', mart });
    console.log("mart saved")
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Define GET route to get all usernames and passwords
app.get('/api/marts', async (req, res) => {
try {
  // Query the database to retrieve all marts
  const marts = await Mart.find({}, 'userName password');

  // Extract usernames and passwords
  const userData = marts.map(mart => ({
    userName: mart.userName,
    password: mart.password,
    city: mart.city
  }));

  // Send the usernames and passwords as JSON response
  res.status(200).json(userData);
} catch (error) {
  // Handle errors
  res.status(500).json({ error: error.message });
}
});



// Define POST route to add a new restaurant
app.post('/api/restaurants', upload.single('image'), async (req, res) => {
  try {
    const { userName, email, password, city,Type } = req.body;
    const image = req.file.filename;
    console.log(image)
    const restaurant= new Restaurant({ userName, email, password, city ,image:image,Type});
    await restaurant.save();
    res.status(201).json({ message: 'restaurant created successfully', restaurant });
    console.log("restaurant saved")
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Define GET route to get all usernames and passwords
app.get('/api/restaurants', async (req, res) => {
try {
  // Query the database to retrieve all restaurants
  const restaurants = await Restaurant.find({}, 'userName password');
  res.json(restaurants);
  // Extract usernames and passwords
  const userData = restaurants.map(restaurant => ({
    userName: restaurant.userName,
    password: restaurant.password,
    city:restaurant.city,
    image:restaurant.image
  }));







  // Send the usernames and passwords as JSON response
  // res.status(200).json(userData);
} catch (error) {
  // Handle errors
  res.status(500).json({ error: error.message });
}
});

//======================================================


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

