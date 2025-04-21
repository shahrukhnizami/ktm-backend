import { createDonation, getDonationById , updateDonationStatusService } from '../services/donation.service.js';
import { errorHandler, responseHandler } from '../utils/constant.js';
import { updateDonationStatusSchema } from '../validations/donation.validation.js';
import { createDonationSchema, donationIdSchema } from '../validations/index.validation.js';

export const initiateDonation = async (req, res) => {
  try {
    // Validate request body
    // console.log("Request body",req.body);
    const { error, value } = createDonationSchema.validate(req.body);
    if (error) {
      return errorHandler(res, 400, error.details[0].message);
    }
    
    console.log("Creating donation with:", value);
    const donation = await createDonation(value);
    console.log("Donation result:", donation);
    return responseHandler(
      res, 
      201, 
      'Donation initiated successfully', 
      donation
    );
  } catch (error) {
    return errorHandler(res, 500, error.message);
  }
};

export const getDonation = async (req, res) => {
  try {
    // Validate donation ID
    const { error, value } = donationIdSchema.validate({ id: req.params.id });
    console.log("Validate donation ID",value);
    if (error) {
      return errorHandler(res, 400, error.details[0].message);
    }
    
    const donation = await getDonationById(value.id);
    
    if (!donation) {
      return errorHandler(res, 404, 'Donation not found');
    }
    
    return responseHandler(
      res,
      200,
      'Donation retrieved successfully',
      donation
    );
  } catch (error) {
    return errorHandler(res, 500, error.message);
  }
};


export const updateDonationStatus = async (req, res) => {
  try {
    const { error, value } = updateDonationStatusSchema.validate({ id: req.params.id });
    console.log(value);
    
    if (error) {
      return errorHandler(res, 400, error.details[0].message);
    }
    const updatedDonation = await updateDonationStatusService(value.id, value.status);

    if (!updatedDonation) {
      return errorHandler(res, 404, 'Donation not found');
    }

    return responseHandler(
      res,
      200,
      'Donation status updated successfully',
      updatedDonation
    );
  } catch (error) {
    return errorHandler(res, 500, error.message || 'Failed to update donation status');
  }
};