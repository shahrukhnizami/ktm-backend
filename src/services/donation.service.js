import { Donation } from '../models/donation.model.js';

export const createDonation = async (donationData) => {
  try {
    const donation = new Donation(donationData);
    console.log("Donation data",donationData);
    return await donation.save();
  } catch (error) {
    throw new Error('Failed to create donation');
    
  }
};

export const getDonationById = async (id) => {
    try {
        const donation = await Donation.findById(id);
        return donation;
        
    } catch (error) {
        throw new Error('Failed to get donation by ID');
        
    }
};


export const updateDonationStatusService = async ({
    donationId,
    status,
    gatewayPaymentId = null,
    merchantPaymentId = null,
  }) => {
    try {
      // Validate required fields
      if (!donationId) throw new Error('Donation ID is required');
      if (!status) throw new Error('Status is required');
  
      // Create update object
      const updateData = { 
        status,
        updatedAt: new Date() 
      };
  
      // Add optional fields if provided
      if (gatewayPaymentId) updateData.gatewayPaymentId = gatewayPaymentId;
      if (merchantPaymentId) updateData.merchantPaymentId = merchantPaymentId;
  
      // Update the donation
      const updatedDonation = await Donation.findByIdAndUpdate(
        donationId,
        updateData,
        { new: true, runValidators: true }
      );
  
      if (!updatedDonation) {
        throw new Error('Donation not found');
      }
  
      return {donation: updatedDonation}
      
    } catch (error) {
      console.error('Update donation status error:', error);
      throw new Error(`Failed to update donation status: ${error.message}`);
    }
  };