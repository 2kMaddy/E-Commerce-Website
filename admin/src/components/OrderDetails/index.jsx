import "./index.css";

const OrderDetails = (props) => {
  console.log(props.orderData);
  const {
    orderStatus,
    paymentMethod,
    quantity,
    shippingAddress,
    totalPrice,
    userDetails,
    _id,
    productDetails,
  } = props.orderData;

  const { name, phone, email } = userDetails;
  const { productName, price } = productDetails;

  return (
    <div className="order-detail-container">
      <div className="order-detail-form">
        <button type="button" onClick={() => props.onClose()}>
          X
        </button>
        <h2>Order Details</h2>
        <h3>Customer details</h3>
        <p className="detail-row">
          <span>Customer Name : </span>
          {name}
        </p>
        <p className="detail-row">
          <span>Contact No : </span>
          {phone}
        </p>
        <p className="detail-row">
          <span>Email : </span>
          {email}
        </p>
        <p className="detail-row">
          <span>Shipping Address : </span>
          {shippingAddress}
        </p>
        <h3>Product Details</h3>
        <p className="detail-row">
          <span>Product Name : </span>
          {productName}
        </p>
        <p className="detail-row">
          <span>Price : </span>
          {price}
        </p>
        <p className="detail-row">
          <span>Qunatity : </span>
          {quantity}
        </p>
        <p className="detail-row">
          <span>Total Price : </span>
          {totalPrice}
        </p>
        <p className="detail-row">
          <span>Payment Method : </span>
          {paymentMethod}
        </p>
        <p className="detail-row">
          <span>Order Status : </span>
          {orderStatus}
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;
