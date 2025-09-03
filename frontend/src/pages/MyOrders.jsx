import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { fetchCancelOrder, fetchOrderList } from "../features/Order/orderSlice";
import { useEffect } from "react";
import priceFormat from "../utlis/priceFormat";

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

  const statusColors = {
    Pending: "text-yellow-600",
    Confirmed: "text-green-500",
    Shipped: "text-green-500",
    Delivered: "text-blue-700",
    Cancelled: "text-red-700",
    Returned: "text-red-700",
    Failed: "text-red-700",
    Refunded: "text-green-700",
  };

  return (
    <div className="flex flex-col p-5 min-h-dvh">
      <h1 className="text-[#333] text-2xl font-bold">My Orders</h1>
      <p>Your orders will be displayed here.</p>
      {/* Render order list here */}
      <ul className="flex flex-col w-full gap-4 text-[14px] mt-5">
        {Array.isArray(orderList) && orderList.length > 0 ? (
          orderList.map((order) => (
            <li
              key={order._id}
              className="border border-gray-300 rounded-md p-2 md:p-4 gap-4 flex flex-col md:flex-row justify-between items-start md:items-end"
            >
              <div>
                <p>
                  <span className="font-semibold">Ordered Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-in", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                {Array.isArray(order.orderItems) &&
                order.orderItems.length > 0 ? (
                  <ul className="flex flex-col gap-2 mt-2">
                    {order.orderItems.map((item) => (
                      <li
                        key={item._id}
                        className="flex flex-row gap-4 text-[#333]"
                      >
                        <img
                          src={item.thumbnailUrl}
                          alt={item.productName}
                          className="w-[80px] h-[80px]"
                        />
                        <div>
                          <p>Product: {item.productName}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: {priceFormat(item.price)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No items in this order.</p>
                )}
              </div>
              <div className="self-end flex flex-col">
                <p className="font-semibold text-[#333]">
                  Order Status:{" "}
                  <span className={statusColors[order.orderStatus] || ""}>
                    {order.orderStatus}
                  </span>
                </p>
                <p className="font-semibold text-[#333]">
                  Grand Total: {priceFormat(Number(order.grandTotal))}
                </p>
                <div className="self-end">
                  <button
                    type="button"
                    onClick={() => handleCancelOrder(order._id)}
                    className="cursor-pointer mt-2 text-[12px] text-[#8f49ff] border border-[#8f49ff] rounded-2xl p-2 hover:bg-[#993df5] hover:text-white hover:border-[#993df5] transition-colors duration-300"
                  >
                    Cancel Order
                  </button>
                </div>
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
