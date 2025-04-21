import crypto from 'crypto';
import { config } from '../config/payfast.config.js';
import { getDonationById  } from './donation.service.js';
import { PAYFAST_RETURN_URL, PAYFAST_CANCEL_URL, PAYFAST_NOTIFY_URL } from '../utils/constant.js';


export const generatePaymentData = async (donationId, paymentMethod) => {
  const donation = await getDonationById(donationId);
  
  if (!donation) {
    throw new Error('Donation not found');
  }
  
  const paymentData = {
    merchant_id: config.merchantId,
    merchant_key: config.merchantKey,
    return_url: PAYFAST_RETURN_URL,
    cancel_url: PAYFAST_CANCEL_URL,
    notify_url: PAYFAST_NOTIFY_URL,
    email_address: donation.email,
    m_payment_id: donationId,
    amount: donation.amount.toFixed(2),
    item_name: `${donation.donationtype} Donation`,
    item_description: donation.message || `${donation.donationtype} donation`,
    payment_method: paymentMethod
  };
  
  // Generate signature without passphrase
  const signatureData = Object.entries(paymentData)
    .filter(([_, value]) => value !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  
  const signature = crypto
    .createHash('md5')
    .update(signatureData)
    .digest('hex');
  
  return {
    ...paymentData,
    signature
  };
};


export const verifyPayment = async (data) => {
    try {
      // 1. Input Validation
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid payment data');
      }
  

      const { 
        m_payment_id: donationId, 
        pf_payment_id: pfPaymentId, // Model ke saath match
        payment_status: paymentStatus,
        merchant_payment_id: merchantPaymentId  
      } = data;
  
      // 3. Check Required Fields
      const requiredFields = {
        donationId: 'm_payment_id',
        pfPaymentId: 'pf_payment_id',
        paymentStatus: 'payment_status',
        merchantPaymentId: 'merchant_payment_id'
      };
  
      const missingFields = Object.entries(requiredFields)
        .filter(([key, val]) => !data[val])
        .map(([key]) => key);
  
      if (missingFields.length > 0) {
        throw new Error(`Missing fields: ${missingFields.join(', ')}`);
      }
  
      // 4. Map PayFast Status → Model Status
      const statusMap = {
        'COMPLETE': 'completed',
        'FAILED': 'failed',
        'CANCELLED': 'cancelled',
        'PENDING': 'pending',
        'PROCESSING': 'processing' // Model mein add karna hoga
      };
  
      const status = statusMap[paymentStatus];
      if (!status) throw new Error(`Invalid status: ${paymentStatus}`);
  
      // 5. Update Donation
      const updatedDonation = await Donation.findByIdAndUpdate(
        donationId,
        {
          "payment.status": status,
          "payment.pfPaymentId": pfPaymentId,
          "payment.merchantPaymentId": merchantPaymentId
        },
        { new: true }
      );
  
      if (!updatedDonation) {
        throw new Error("Donation not found");
      }
  
      return { 
        success: true,
        status,
        pfPaymentId,
        merchantPaymentId,
        donation: updatedDonation
      };
  
    } catch (error) {
      console.error('Payment verification failed:', error);
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  };