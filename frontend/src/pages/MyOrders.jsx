import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { fetchCancelOrder, fetchOrderList } from "../features/Order/orderSlice";
import { useEffect } from "react";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const orderList = useSelector((state) => state.order.orderList);
  console.log("Order List:", orderList);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrderList(user._id));
    } else {
      navigate("/login");
    }
  }, [dispatch, user, navigate]);

  const handleCancelOrder = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      dispatch(fetchCancelOrder({ userId: user._id, orderId }));
    } else {
      console.log("Order cancellation aborted");
    }
  };

  return (
    <div>
      <h1>My Orders</h1>
      <p>Your orders will be displayed here.</p>
      {/* Render order list here */}
      <ul>
        {Array.isArray(orderList) && orderList.length > 0 ? (
          orderList.map((order) => (
            <li key={order._id}>
              <h2>Order Id: {order._id}</h2>
              <p>
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              {Array.isArray(order.orderItems) &&
              order.orderItems.length > 0 ? (
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item._id}>
                      <img src={item.thumbnailUrl} alt={item.productName} />
                      <p>Product: {item.productName}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ₹{item.price}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No items in this order.</p>
              )}
              <div>
                <p>Order Status: {order.orderStatus}</p>
                <p>Grand Total: ₹{order.grandTotal}</p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleCancelOrder(order._id)}
                >
                  Cancel Order
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>No orders found.</li>
        )}
      </ul>
    </div>
  );
};

export default MyOrders;
