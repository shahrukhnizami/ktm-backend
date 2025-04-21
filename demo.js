async getAccessToken(basketId, txnAmt, CURRENCY_CODE) {
    try {
      // Define the token API endpoint and parameters
      const tokenApiUrl = process.env.PAYFAST_API_URL;
      const merchantId = process.env.YOUR_MERCHANT_ID;
      const securedKey = process.env.YOUR_SECURED_KEY;
      // const basketId = basketId
      // const txnAmt = txnAmt
      // Make the POST request to the API
      console.log("===>", {
        MERCHANT_ID: merchantId,
        SECURED_KEY: securedKey,
        BASKET_ID: basketId,
        TXNAMT: txnAmt,
        CURRENCY_CODE,
      });
      // Make the POST request to the token API
      const response = await axios.post(tokenApiUrl, {
        MERCHANT_ID: merchantId,
        SECURED_KEY: securedKey,
        BASKET_ID: basketId,
        TXNAMT: txnAmt,
        CURRENCY_CODE,
      });
      console.log("access resp", response.data);
      // Extract and return the access token from the response
      return response.data.ACCESS_TOKEN;
    } catch (error) {
      console.log(error.response);
      throw error;
    }
  }
  async redirectToPayfast({
    accessToken,
    basketId,
    txnAmt,
    email,
    mobileNumber,
    items,
    fullname,
    userId,
    currency,
    desc,
  }) {
    try {
      // Define the PAYFAST redirection API endpoint
      const payfastApiUrl = process.env.PAYFAST_REDIRECT_URL;
      // Define form parameters
      const formData = {
        MERCHANT_ID: process.env.YOUR_MERCHANT_ID,
        MERCHANT_NAME: "QRinsight",
        TOKEN: accessToken,
        PROCCODE: "00",
        TXNAMT: txnAmt,
        CUSTOMER_MOBILE_NO: mobileNumber,
        CUSTOMER_EMAIL_ADDRESS: email,
        SIGNATURE: Math.ceil(Math.random() * 1000000).toString(),
        VERSION: "v1",
        TXNDESC: desc,
        SUCCESS_URL: process.env.SUCCESS_URL,
        FAILURE_URL: process.env.FAILURE_URL,
        BASKET_ID: basketId, // Assuming id is the order ID
        ORDER_DATE: new Date().toDateString(),
        CHECKOUT_URL: "immediate",
        CUSTOMER_NAME: fullname,
        MERCHANT_CUSTOMER_ID: userId,
        CUSTOMER_IPADDRESS: "192.168.100.55",
        ITEMS: items,
        CURRENCY_CODE: currency,
      };
      // Make the POST request to the PAYFAST redirection API
      let form =
        '<form id="payfastForm" action="' + payfastApiUrl + '" method="POST">';
      for (const key in formData) {
        form +=
          '<input type="hidden" name="' +
          key +
          '" value="' +
          formData[key] +
          '">';
      }
      form += "</form>";
      // Add script to auto-submit the form
      form +=
        '<script>document.getElementById("payfastForm").submit();</script>';
      // Return the HTML form
      return form;
    } catch (error) {
      throw error;
    }
  }