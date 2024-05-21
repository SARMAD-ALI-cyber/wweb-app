const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/FoodDilievryApp'; 

mongoose.connect(uri, {  })
  .then(() => {
    console.log('Connected to MongoDB');
  })

  
module.exports= mongoose
