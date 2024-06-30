const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const paymentRouter = require('./routes/payment') 
const bodyParser = require('body-parser')
const Razorpay = require('razorpay')
const app = express();
app.use(bodyParser.json({type: 'application/*+json' }))

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter)
app.use("/user", userRouter)

app.use('/payment',paymentRouter)
app.get("/", (req, res) => res.json({msg: "hello world after the class"}));

// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
// mongoose.connect('mongodb+srv://Danish:9099@cluster0.ebjrffo.mongodb.net/quickServe').then;
const connectDB = async ()=> {
    try {
        
       const connectionInstance = await mongoose.connect(`mongodb+srv://Danish:9099@cluster0.ebjrffo.mongodb.net/quickServe`);
       if(connectionInstance){
           console.log("Mongodb successfully connected !!");
       }
         
        
    } catch (error) {
        console.log("Error in connecting with data base",error);
        process.exit(1) //The process.exit() method is used to
        // end the process which is running at the same time with an exit code in NodeJS.
        // 0 means end the process without any kind of failure and 1 means end the process 
        //with some failure.
    }
}
connectDB();
app.listen(4000, () => console.log('Server running on port 4000'));