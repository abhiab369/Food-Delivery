import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const stripe = new Stripe("sk_test_51QZtc1BnBzRa39tCYkB2Mmy54jqs1c3pUCiUvSlHVPDYIREikUS8VNzcJ6i1BDixbXtFnbeByo1lg0EEuMQ3SvKo00XF7kQNQf")

// placing usermodel from frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:4000";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data : {
                    name: item.name
                },
                unit_amount: item.price,
                quantity: item.quantity
            }
            
        }))
        line_items.push({
            currency: "usd",
                product_data : {
                    name: "Deliver Charges"
                },
                unit_amount: 100,
                quantity: 1
        })
        console.log(line_items)
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        res.json({ success: true, session_url: session.url })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error while order placing" })
    }
}

export { placeOrder }