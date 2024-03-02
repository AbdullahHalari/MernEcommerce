const FormatPrice = ({ price }) => {
  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 2,
  }).format(price);
};

export default FormatPrice;
