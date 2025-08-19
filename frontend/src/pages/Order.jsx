import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { paymentVerification } from "../services/orderService.js";
import { setClearList, fetchCreateOrder } from "../features/Order/orderSlice";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const orderList = useSelector((state) => state.order.selectedItems);
  const grandTotal = orderList.reduce((acc, item) => acc + item.itemTotal, 0);

  const handleDiscard = () => {
    if (window.confirm("Are you sure, want to go back?")) {
      dispatch(setClearList());
      navigate(-1);
    }
  };

  const handleCreateOrder = async () => {
    try {
      // Step 1: Get Razorpay order from backend
      const orderRes = await dispatch(fetchCreateOrder(grandTotal)).unwrap();
      const razorpayOrder = orderRes.order;

      const options = {
        key: "rzp_live_uBJldbYPcyrYAM", // from Razorpay Dashboard
        amount: grandTotal, // Amount in paise
        currency: "INR",
        name: "Test Company",
        description: "Test Transaction",
        order_id: razorpayOrder.id, // Use the order ID from the result
        handler: async (response) => {
          // Step 2: Send payment verification and order details to backend
          const verifyPayload = {
            ...response,
            userId: user._id,
            items: orderList,
            paymentMethod: "Net banking",
            grandTotal,
            shippingAddress: user.address, // update as needed
          };
          const verifyRes = await paymentVerification(verifyPayload);
          console.log(verifyRes);

          // Show success or failure message
          if (verifyRes.data.success) {
            alert("Payment Successful");
            navigate("/my-orders"); // Added navigation here
          } else {
            alert("Payment Failed");
          }
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <h2>Order</h2>
        <div>
          <ul>
            {Array.isArray(orderList) && orderList.length > 0 ? (
              orderList.map((each, index) => (
                <li key={each._id || index}>
                  <div>
                    <h3>{each.productName}</h3>
                    <img src={each.thumbnailUrl} className="cart-thumbnail" />
                    <p>{`Size: ${each.size}`}</p>
                    <p>{`Quantity: ${each.quantity}`}</p>
                    <p>{`Item total: ${each.itemTotal}`}</p>
                  </div>
                </li>
              ))
            ) : (
              <div>
                <h2>No items to order</h2>
              </div>
            )}
          </ul>
          <div>
            <h3>{`Grand total: ${grandTotal}`}</h3>
            <button type="button" onClick={handleCreateOrder}>
              Place Order
            </button>
            <button type="button" onClick={handleDiscard}>
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
