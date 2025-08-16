import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
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
      const orderObject = {
        userId: user._id,
        items: orderList,
        paymentMethod: "Net banking",
        grandTotal: grandTotal,
      };
      const result = dispatch(fetchCreateOrder(orderObject));
      console.log(result);

      const options = {
        key: "rzp_live_uBJldbYPcyrYAM", // from Razorpay Dashboard
        amount: result.amount,
        currency: result.currency,
        name: "Test Company",
        description: "Test Transaction",
        order_id: result.id,
        handler: async (response) => {
          // Step 3: Verify payment in backend
          const verifyRes = await api.post("order/verify-payment", response);
          alert(
            verifyRes.data.status === "success"
              ? "Payment Successful"
              : "Payment Failed"
          );
          console.log(verifyRes);
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
