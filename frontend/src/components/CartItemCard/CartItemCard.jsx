import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedItems, setNewList } from "../../features/Order/orderSlice";

const CartItemCard = (props) => {
  const {
    _id,
    thumbnailUrl,
    productId,
    productName,
    totalPrice,
    quantity,
    size,
  } = props.cartItem;
  const { onClickDeleteItem, onClickUpdateItem } = props;
  const dispatch = useDispatch();

  const existingList = useSelector((state) => state.order.selectedItems);
  const exists = existingList.some((item) => item._id === _id);
  const [cardQuantity, setCardQuantity] = useState(quantity);
  const [isItemSelected, setIsItemSelected] = useState(exists);
  console.log(existingList);

  let price = totalPrice / quantity;

  const handleSelectItem = (checked) => {
    setIsItemSelected(checked);

    if (checked) {
      const newObject = {
        _id,
        productId,
        productName,
        thumbnailUrl,
        size,
        quantity: cardQuantity,
        itemTotal: price * cardQuantity,
      };

      const exists = existingList.some((item) => item._id === _id);

      if (!exists) {
        // Add new item
        dispatch(setSelectedItems(newObject));
      } else {
        // Update existing item
        const newList = existingList.map((each) =>
          each._id === _id ? { ...each, ...newObject } : each
        );
        dispatch(setNewList(newList));
      }
    } else {
      // Remove item if unchecked
      const newList = existingList.filter((each) => each._id !== _id);
      dispatch(setNewList(newList));
    }
  };

  const updateCardQuantity = (action) => {
    if (action === "inc") {
      setCardQuantity((prev) => prev + 1);
    } else if (action === "dec" && cardQuantity > 1) {
      setCardQuantity((prev) => prev - 1);
    }
  };

  return (
    <li key={_id} className="cart-item-container">
      <div>
        <input
          type="checkbox"
          checked={isItemSelected}
          onChange={(e) => handleSelectItem(e.target.checked)}
        />
      </div>
      <div>
        <img src={thumbnailUrl} className="cart-thumbnail" alt="thumbnail" />
        <div>
          <p>{productName}</p>
          <p>{price * cardQuantity}</p>
        </div>
      </div>
      <div>
        <div>
          <button type="button" onClick={() => updateCardQuantity("dec")}>
            -
          </button>
          <p>{cardQuantity}</p>
          <button type="button" onClick={() => updateCardQuantity("inc")}>
            +
          </button>
        </div>
        <div>
          <p>{`Size ${size}`}</p>
        </div>
      </div>
      <div>
        <button type="button" onClick={() => onClickDeleteItem(_id)}>
          X
        </button>
        <button
          type="button"
          onClick={() => {
            onClickUpdateItem(_id, cardQuantity);
            handleSelectItem(isItemSelected);
          }}
          disabled={quantity === cardQuantity}
        >
          Update
        </button>
      </div>
    </li>
  );
};

export default CartItemCard;
