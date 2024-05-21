import mongoose from 'mongoose';

// This is collection not a database 
//we can define schema for documents
//in the collection so means we can have
//multiple schemas for different collections
const tempuser=new mongoose.Schema({
    username:{type:String,required:true}
})
//SChema for menue
const MenuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    restaurantName: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    // image: {
    //     data: { type: Buffer, required: true },
    //     contentType: { type: String, required: true }
    // },
    image:String,
    variation: { type: String, required: true },
    addons: { type: String, required: true }
});
const customerSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const martSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    }
})
const restaurantSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)
const Mart=mongoose.model('martSchema', martSchema);
const tempusername = mongoose.model('tempuser', tempuser)
const Customer=mongoose.model('customerSchema', customerSchema);
const Menu = mongoose.model('Menu', MenuSchema);

export { Menu,Customer,Mart,Restaurant ,tempusername};
