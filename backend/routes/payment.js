const router = require('express').Router();
const Razorpay = require('razorpay')
const crypto = require('crypto');

router.post('/orders',async(req,res)=> {
    try {
        var instance = new Razorpay({
            key_id: 'rzp_test_G37wSN4gO9B2AH',
            key_secret: 'FexULK8eX1E3IZKTbbAFDDJv',
          });
        
        var options = {
            amount: req.body.amount *100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "rcp1"
          };
          instance.orders.create(options, function(err, order) {
            if(err){
                console.log(err);
                return res.status(500).json({message: "Something went wrong"})
            }

            console.log(order);
            res.json({orderId:order.id});
          });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error!"})
        
    }
})


router.post("/verify",async(req,res)=> {
    try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
})
module.exports = router;