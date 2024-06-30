const express = require("express");
const {Admin,Shop,Menu} = require("../db/index.js")
const {authenticateJwt,SECRET} = require("../middleware/auth.js")
const router = express.Router();
const jwt = require('jsonwebtoken')

router.get("/me",authenticateJwt, async(req,res)=> {
  const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
      res.status(403).json({msg: "Admin doesnt exist"})
      return
    }
    res.json({
        username: admin.username
    })
})

router.post('/signup',async (req, res) => { 
  const {name, username, password } = req.body;
  const admin  = await Admin.findOne({username})
 
    if (admin) {
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.status(403).json({ message: 'Admin already exists' ,token});
    } 
    else{
      const obj = {name:name, username: username, password: password };
      const newAdmin = new Admin(obj);
      newAdmin.save();

      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Admin created successfully', token });
    }
  

});


router.post("/login",async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
})

router.get("/shops",authenticateJwt,async(req,res)=> {
  const admin = await Admin.findOne({username:req.user.username}).populate('myShop')
  console.log(admin);
  if(admin){
    res.status(200).json({myShop: admin.myShop ||[] })
  }
  else{
    res.status(403).json({message: "Admin not found"})
  }
})


router.post("/createShop",authenticateJwt,async(req,res)=> {
   const {shopName,location,image} = req.body;

   console.log(req.user);
   const admin = await Admin.findOne({ username: req.user.username });
   if(admin){
    const newShop = new Shop({shopName,location,image});
    const saveNewShop=  await newShop.save();
  
    console.log(saveNewShop);
    admin.myShop.push(saveNewShop)
    admin.save();
    console.log("admin"+admin);
    const shopId = saveNewShop._id;
    console.log(shopId);
    res.json({message: "new shop created succesfully",shopId})
   }
   else{
   
 res.status(400).json({message: "admin didnt exist"})
   }
})

router.post("/createMenu/:shopId", authenticateJwt, async (req, res) => {
  try {
    const { itemName, image, fullPrice, Category } = req.body;
    const shop = await Shop.findById(req.params.shopId);
    const admin = await Admin.findOne({ username: req.user.username });
    
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const adminId = admin._id;
    console.log(adminId);

    const menu = new Menu({ itemName, image, fullPrice, Category, adminId });
    const savedMenu = await menu.save();

    console.log("savedMenu", savedMenu);

    shop.menu.push(savedMenu);
    await shop.save();

    res.json({ message: "Menu created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getMenu/:shopId",authenticateJwt,async(req,res)=> {
  const menu = await Shop.findById(req.params.shopId).populate('menu');
  if(menu){
    res.status(200).json({"menu" :menu.menu})

  }
  else{
    res.status(400).json({"message": "error not found"})
  }
})

// router.delete('/shops/:shopId', function (req, res) {

//   var id = req.params.shopId;
//   const delete = await Shop.deleteOne({})

//   //DELETE YOUR RECORD WITH YOUR PARAM.

//   return res.status(200);
// })
router.get("/myOrder",authenticateJwt,async(req,res)=>{
  const admin = await Admin.findOne({username:req.user.username}).populate('myOrder');
  if(admin){
    res.json({myOrder: admin.myOrder || [] });
  }
  else{
    res.status(403).json({message: "admin not found!"})
  }
})


module.exports = router;