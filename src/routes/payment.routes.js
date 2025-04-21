import express from 'express';
import {  handlePaymentNotify,handlePaymentCancel, handlePaymentReturn, initiatePayment } from '../controllers/payment.controller.js';


const router = express.Router();

router.post('/initiate', initiatePayment);
router.get('/return', handlePaymentReturn);
router.post('/notify', handlePaymentNotify);
router.post('/cancel', handlePaymentCancel);


export default router;