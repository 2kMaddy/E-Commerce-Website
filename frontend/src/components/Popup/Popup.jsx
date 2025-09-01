import { NavLink } from "react-router-dom";
import { VscMenu } from "react-icons/vsc";
import categoriesConstants from "../../utlis/constants";

const CategoryListItems = () => {
  return (
    <ul className="pl-5 p-2 md:p-5 flex flex-col gap-3 text-[#333] text-[16px] divide-black">
      <h2 className="hidden md:block font-bold text-[#333]">Categories</h2>
      {categoriesConstants.map((category) => (
        <li key={category.id} className="text-[14px]">
          <NavLink
            to={`/product?page=1&category=${category.value}`}
            className="hover:text-purple-600 hover:font-semibold"
          >
            {category.categoryName}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export const CategoryList = () => {
  return (
    <el-dropdown className="inline-block">
      <button className="relative inline-block text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#993df5] after:transition-transform after:duration-300 after:origin-left after:scale-x-0 hover:after:scale-x-80 hover:text-[#993df5]">
        Category
      </button>

      <el-menu
        anchor="bottom center"
        popover
        className="mt-3 w-[300px] origin-top-right rounded-md bg-[#f4edff] outline-1 -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <CategoryListItems />
      </el-menu>
    </el-dropdown>
  );
};

export const NavList = () => {
  return (
    <el-dropdown className="inline-block">
      <button className="text-xl font-semibold">
        <VscMenu />
      </button>

      <el-menu
        anchor="bottom end"
        popover
        className="mt-4 w-full origin-top-right rounded-md bg-[#f4edff] outline-1 -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1 flex flex-col">
          <NavLink
            to="/"
            className="block px-4 py-2 text-sm text-[#333] font-semibold"
          >
            Home
          </NavLink>

          <NavLink
            to="/product?page=1"
            className="block px-4 py-2 text-sm text-[#333] font-semibold"
          >
            Product
          </NavLink>

          <div className="block font-bold md:font-semibold px-4 py-2 text-sm text-[#333]">
            <p>Category</p>
          </div>
          <div>
            <CategoryListItems />
          </div>

          <NavLink
            to="/my-orders"
            className="block px-4 py-2 text-sm text-[#333] font-semibold"
          >
            Orders
          </NavLink>

          <NavLink
            to="/contact"
            className="block px-4 py-2 text-sm text-[#333] font-semibold"
          >
            Contact
          </NavLink>
        </div>
      </el-menu>
    </el-dropdown>
  );
};
