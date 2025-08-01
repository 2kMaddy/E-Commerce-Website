const dateFormat = (estimateDeliveryTime) => {
  const date = new Date();
  const daysToAdd = estimateDeliveryTime ?? 3;
  const deliveryDate = new Date(date);
  deliveryDate.setDate(date.getDate() + daysToAdd);
  const formatted = deliveryDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return formatted;
};

export default dateFormat;
