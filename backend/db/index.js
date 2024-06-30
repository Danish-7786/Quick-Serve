const  mongoose =require( "mongoose");


const shopSchema =new mongoose.Schema ({
 
    shopName:{
    type: String,
    required:true,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    menu:[{type:mongoose.Schema.Types.ObjectId,ref:'Menu'}]
})

const menuSchema = new mongoose.Schema({
   
    itemName:{
        type: String,
        required:true,
        },
    image: {
          type: String,
          required: true,
        },
    fullPrice: Number,
    Category:String,
    halfPrice: Number,
    quaterPrice: Number,
    adminId: String

})

const adminSchema =new mongoose.Schema({
   
      name:String,
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },  
      paymentQR:String,
      myShop:[{type:mongoose.Schema.Types.ObjectId,ref:'Shop'}],
      myOrder:[{type:mongoose.Schema.Types.ObjectId,ref:'Order'}]
     

})

const userSchema = new mongoose.Schema({
    name:String,
    username: String,
    password:String,
    myOrders:[{type:mongoose.Schema.Types.ObjectId,ref:'Order'}]
})


const orderSchema = new mongoose.Schema({
    itemName:String,
    price:Number,
    image:String,
    adminId:String
},{timestamps:true})
const cartSchema = new mongoose.Schema({
  quantity:Number,
  itemName:String,
  price:Number,
  image:String,
  adminId:String
})
const Admin= mongoose.model("Admin",adminSchema)
const User = mongoose.model("User",userSchema)
const Order= mongoose.model("Order",orderSchema)
const Shop = mongoose.model("Shop",shopSchema)
const Menu = mongoose.model("Menu",menuSchema)
const Cart = mongoose.model("Cart",cartSchema)

module.exports = {
  Admin,
  User,
  Order,
  Shop,
  Menu,
  Cart
};

