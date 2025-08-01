import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setClearList } from "../features/Order/orderSlice";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.order.selectedItems);
  const grandTotal = orderList.reduce((acc, item) => acc + item.itemTotal, 0);

  const handleDiscard = () => {
    if (window.confirm("Are you sure, want to go back?")) {
      dispatch(setClearList());
      navigate(-1);
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
            <button type="button">Place Order</button>
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
