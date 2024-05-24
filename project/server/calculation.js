const mongoose = require('./database.js');

const emptySchema = new mongoose.Schema({});

const User = mongoose.model('restaurants', emptySchema, 'restaurants');

function getRestaurant() {
   console.log("yo")
    return User.find({}).exec();
}
const insertReview = async (reviewData) => {
  try {
    // Log the reviewData for debugging
    console.log("Review data:", reviewData);
    
    // Check if the reviewData object is valid
    if (!reviewData || typeof reviewData.rating !== 'number' || typeof reviewData.review !== 'string'|| typeof reviewData.username !== 'string') {
      throw new Error('Invalid review data');
    }
    
    // Define the schema
    const reviewSchema = new mongoose.Schema({
      name:{
        type:String,
        required:true
      },
      rating: {
        type: Number,
        required: true
      },
      review: {
        type: String,
        required: true,
        trim: true
      },
      username:{
        type:String,
        required:true,
        trim:true
      }
    });
    
    // Define the model
    const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema, 'reviews');
    
    // Create a new review instance
    const review = new Review({
      name:reviewData.name,
      rating: reviewData.rating,
      review: reviewData.review.trim(),
      username: reviewData.username
    });
    
    // Ensure the database connection is established
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database connection not established');
    }

    // Save the review instance
    const savedReview = await review.save();
    console.log('Review saved:', savedReview);
    return savedReview;
  } catch (error) {
    console.error('Error inserting review:', error);
    throw error;
  }
};
async function extractObjectFromMongoDB(condition) {
  try {
      console.log(condition);
      console.log("arigato");

      let Restaurant;
      try {
          Restaurant = mongoose.model('restaurants');
      } catch (error) {
          Restaurant = mongoose.model('restaurants', new mongoose.Schema({}, { strict: false }));
      }

      const restaurant = await Restaurant.findOne({ userName: condition.name });

      if (restaurant) {
          console.log(restaurant);
          return restaurant;
      } else {
          console.log('No restaurant found with the given name');
          return null;
      }
  } catch (error) {
      console.error('Error:', error);
      return null;
  }
}


async function getReviewData(nameValue) {
  try {

    const emptySchema = new mongoose.Schema({}, { strict: false });
    const Review = mongoose.models.reviews || mongoose.model('reviews', emptySchema, 'reviews');
    const reviews = await Review.find({ name: nameValue });

    console.log("Reviews fetched:", reviews);

    return reviews;
  } catch (err) {
    console.error('Error getting reviews:', err);
    throw err;
  }
}

async function getMenuData(nameValue){
  try {

    const emptySchema = new mongoose.Schema({}, { strict: false });
    const food = mongoose.models.menus || mongoose.model('menus', emptySchema, 'menus');
    
    const menu = await food.find({ restaurantName: nameValue });


    return menu;
  } catch (err) {
    console.error('Error getting reviews:', err);
    throw err;
  }
}
const addToCart = async (itemData) => {
  try {
    // Log the itemData for debugging
    console.log("Item data:", itemData);
    
    // Check if the itemData object is valid
    if (!itemData || typeof itemData.name !== 'string' || typeof itemData.price !== 'number' || typeof itemData.quantity !== 'number') {
      throw new Error('Invalid item data');
    }
    
    // Define the schema
    const cartItemSchema = new mongoose.Schema({
      resName:{
        type:String,
        required:true
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      variation:{
        type:String,
        required:true
      },
      addons:{
        type:String,
        required:true
      },
      image:{
        type:String,
        required:true
      }
    });
    
    // Define the model
    const CartItemModel = mongoose.models.CartItem || mongoose.model('CartItem', cartItemSchema, 'cart');
    
    // Create a new cart item instance
    const cartItem = new CartItemModel({
      resName:itemData.resName,
      name: itemData.name,
      price: itemData.price,
      quantity: itemData.quantity,
      variation:itemData.variation,
      addons:itemData.addons,
      image:itemData.image
    });
    
    // Ensure the database connection is established
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database connection not established');
    }

    // Save the cart item instance
    const savedCartItem = await cartItem.save();
    console.log('Cart item saved:', savedCartItem);
    return savedCartItem;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

const getCartData= async ()=>{
  try {
    const cartItem = mongoose.models.cart || mongoose.model('cart', new mongoose.Schema({}, { strict: false }), 'cart');

    const cartCheck = await cartItem.find({});

    console.log("Reviews fetched:", cartCheck);

    return cartCheck;
  } catch (err) {
    console.error('Error getting reviews:', err);
    throw err;
  }



     
}
async function deleteCartItem(itemName, resName) {

  try {
    console.log(itemName, resName);
    const emptySchema = new mongoose.Schema({}, { strict: false });

// Create or retrieve the CartItemModel
    const CartItemModel = mongoose.models.cart || mongoose.model('cart', emptySchema, 'cart');


    // Find and delete the cart item document
    const deletedItem = await CartItemModel.findOneAndDelete({ name: itemName, resName: resName });

    if (!deletedItem) {
      console.log('Item not found in cart');
      return { success: false, message: 'Item not found in cart' };
    }

    console.log('Item deleted successfully:', deletedItem);
    return { success: true, message: 'Item deleted successfully', deletedItem };
  } catch (error) {
    console.error('Error deleting item from cart:', error);
    return { success: false, message: 'Server error' };
  }

}
async function deleteAllCartData() {
  try {
    const cartSchema = new mongoose.Schema({});

    const CartItemModel = mongoose.models.cart || mongoose.model('cart', cartSchema, 'cart');


    const result = await CartItemModel.deleteMany({});
    console.log(`${result.deletedCount} documents deleted from the cart collection.`);
  } catch (error) {
    console.error('Error deleting cart data:', error);
    throw error; // Optional: Throw the error for handling in the calling function
  }
}
async function fetchUsername() {
  try {
    // Define schema
    const emptySchema = new mongoose.Schema({});
 console.log("yo4")
    // Define model
    const YourModel = mongoose.models['tempusers'] || mongoose.model('tempusers', emptySchema, 'tempusers');

    // Get data from database
    const data = await YourModel.find({});
    console.log('Data:', data);
    // Process data here

    return data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


// Example usage
const exampleReview = {
  rating: 5,
  reviewText: 'Excellent service and food!'
};




module.exports = {
  getRestaurant: getRestaurant,
  extractObjectFromMongoDB: extractObjectFromMongoDB,
  insertReview:insertReview,
  getReviewData:getReviewData,
  getMenuData:getMenuData,
  addToCart:addToCart,
  getCartData:getCartData,
  deleteCartItem:deleteCartItem,
  deleteAllCartData:deleteAllCartData,
  fetchUsername:fetchUsername

};