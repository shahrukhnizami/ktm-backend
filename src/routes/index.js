import { Router } from "express";
import donationRoute from "./donation.routes.js"
import paymentRoute from "./payment.routes.js"

const router = Router()


router.use("/donation" , donationRoute)
router.use("/payment" , paymentRoute)
router.get("/", (req, res) => {
    res.status(200).json({ message: "API is running ✅" });
});



export default router