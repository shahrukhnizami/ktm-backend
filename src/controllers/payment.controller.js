import { config } from "../config/payfast.config.js";
import {
  generatePaymentData,
  verifyPayment,
} from "../services/payment.service.js";
import { errorHandler, responseHandler } from "../utils/constant.js";
import {
  initiatePaymentSchema,
  paymentStatusSchema,
} from "../validations/index.validation.js";

export const initiatePayment = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = initiatePaymentSchema.validate(req.body);

    if (error) {
      return errorHandler(res, 400, error.details[0].message);
    }

    const paymentData = await generatePaymentData(
      value.donationId,
      value.paymentMethod
    );

    console.log("paymentData" , paymentData);
    

    return responseHandler(res, 200, "Payment initiated successfully", {
      paymentUrl: config.paymentUrl,
      paymentData,
    });
  } catch (error) {
    return errorHandler(res, 500, error.message);
  }
};

export const handlePaymentReturn = async (req, res) => {
    try {
      
      const { error, value } = paymentStatusSchema.validate(req.query);
      
      if (error) {
        return errorHandler(res, 400, error.details[0].message);
      }
      console.log("value" , value);
      
      const paymentStatus = await verifyPayment(value);
      console.log("paymentStatus" , paymentStatus);

      return responseHandler(
        res,
        200,
        'Payment return processed',
        paymentStatus
      );
    } catch (error) {
      return errorHandler(res, 500, error.message);
    }
  };

  export const handlePaymentNotify = async (req, res) => {
    try {
      const { error, value } = paymentStatusSchema.validate(req.body);
      console.log(value);
      if (error) {
        return errorHandler(res, 400, error.details[0].message);
      }
      await verifyPayment(value);
      responseHandler(res, 200, 'Payment notification received');
    } catch (error) {
      errorHandler(res, 500, error.message);
    }
  };

  
export const handlePaymentCancel = async (req, res) => {
    try {
      const { error, value } = paymentStatusSchema.validate(req.query);
      
      if (error) {
        return errorHandler(res, 400, error.details[0].message);
      }
  
      const cancellationData = {
        ...value,
        payment_status: 'CANCELLED' 
      };
  
      const result = await verifyPayment(cancellationData);
      
      res.redirect(`/payment/cancelled?donationId=${value.m_payment_id}&reason=user_cancelled`);
      
    } catch (error) {
      console.error('Payment cancellation error:', error);
      res.redirect('/payment/error?code=cancel_failed');
    }
  };


