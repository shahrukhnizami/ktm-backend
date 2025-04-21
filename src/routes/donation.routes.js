import express from "express";
import { getDonation, initiateDonation, updateDonationStatus } from "../controllers/donation.controller.js";


const router = express.Router();

router.post('/', initiateDonation);
router.get('/:id', getDonation);
router.put('/:id/status', updateDonationStatus);


export default router;
