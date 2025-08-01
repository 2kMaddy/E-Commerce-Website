import { NavLink } from "react-router-dom";
import categoriesConstants from "../../utlis/constants";

const CategoryList = (props) => {
  const { onClose } = props;
  return (
    <div className="nav-category-list">
      <ul className="category-list-container">
        <h3>Categories</h3>
        {categoriesConstants.map((each) => (
          <NavLink
            onClick={onClose}
            to={`/product?category=${each.value}`}
            className="text-decoration-none"
          >
            <li className="category-list-item-container">
              {each.categoryName}
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
