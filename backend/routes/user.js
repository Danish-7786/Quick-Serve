const express = require('express');
const { authenticateJwt, SECRET } = require("../middleware/auth");
const { User,Shop, Order,Admin,Menu} = require("../db");

const jwt  = require("jsonwebtoken")
const router = express.Router();

  router.post('/signup', async (req, res) => {
    const {name, username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({name, username, password });
      await newUser.save();
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  });

  router.post('/login',async(req,res)=> {
    console.log("inside login");
    const {username,password} = req.body;
    const user = await User.findOne({username,password});
    if(user){
      const token = jwt.sign({username,role:'user'},SECRET,{expiresIn: '1h'})
      res.json({message: 'Loggsed in successfully',token});

    }
    else{
      res.status(403).json({message: "Invalid username or password"})
    }
  })



  router.get("/shops",authenticateJwt,async (req,res)=> {
    const shops = await Shop.find({});
    console.log(shops);
    if(shops){
      res.json({shops});
    }
    else{
      res.status(400).json({"message": " no shop found"})
    }
  })
  router.get("/menu/:shopId",authenticateJwt,async (req,res)=> {
    const shop = await Shop.findById(req.params.shopId).populate('menu');
    if  (shop){
      console.log(shop.menu);
      res.json(shop.menu)
    }
  })

 
  router.get("/menu",authenticateJwt,async (req,res)=> {
    const menu = await Menu.find({});
    console.log(menu);
    if(menu){
      res.json({menu});
    }
    else{
      res.status(400).json({"message": " no menu found"})
    }
  })
  
  router.post("/order/:menuId", authenticateJwt, async(req,res)=> {
    try{
      
     
      const user = await User.findOne({ username: req.user.username });
      const menu = await Menu.findById(req.params.menuId);
      console.log("menu:",menu);
      if(menu){

        const adminId = menu.adminId;
        console.log(adminId);
        const admin = await Admin.findById(adminId);
        console.log("admin:"+admin);
        
        const newOrder = new Order({ 
          itemName: menu.itemName,
          price: menu.fullPrice,
          image: menu.image,
          adminId: adminId,
        })
        await newOrder.save();
        user.myOrders.push(newOrder);
        await user.save();
        console.log("user"+user);
        admin.myOrder.push(newOrder);
        await admin.save();
        
        res.json({message: "Order placed!"});
      }
      else{
        res.status(500).json({message: "Menu not found"})
      }
   
  }
   catch(error){
       console.log(error);
       res.status(500).json({message: "Internal  Server Error"})
   }
      
  })

  router.get("/myOrder",authenticateJwt,async(req,res)=>{
    const user = await User.findOne({username:req.user.username}).populate('myOrders');
    if(user){
      res.json({myOrder: user.myOrders || [] });
    }
    
    else{

      res.status(403).json({message: "user not found!"})
    }
  })



  module.exports = router;