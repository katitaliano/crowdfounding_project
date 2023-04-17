function formatCurrency(value) {
    const formatter = new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    });
  
    return formatter.format(value);
  }
  
  export default formatCurrency;

// The Intl.NumberFormat constructor is used to create a new number formatter with the desired options. The style option is set to 'currency' to format the value as a currency, and the currency option is set to 'AUD' to specify the currency type as AU dollars.