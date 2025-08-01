const priceFormat = (price) => {
  if (price === undefined || price === null) return "Rs. 0.00"; // or a fallback like "-"
  return `Rs. ${price.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export default priceFormat;
