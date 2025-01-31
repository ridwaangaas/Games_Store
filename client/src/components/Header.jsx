import React from "react";
import { cartlogo, defaultLogo } from "../assets";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImSearch } from "react-icons/im";
import { useState, useEffect} from "react";
import Products from "./Products";

const Header = () => {
  //these are the states that we are using in this component from redux store such as img of user
  const productData = useSelector((state) => state.store.productData);
  const userInfo = useSelector((state) => state.store.userInfo);


  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
    const filtered = productData.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, productData]);


  return (
    <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-800 font-titleFont sticky top-0 z-50">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between">
        <Link to="./">
          <div>
            <img className="w-28" src={defaultLogo} alt="" />
          </div>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <Link to="/">
              <li className="text-base text-black font-bold hover:text-orange-900 hove:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 font-titleFont">
                Home
              </li>
            </Link>
            <Link to="/products">
              <li className="text-base text-black font-bold hover:text-orange-900 hove:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300  font-titleFont">
                Products
              </li>
            </Link>
            <Link to="/news">
              <li className="text-base text-black font-bold hover:text-orange-900 hove:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300  font-titleFont">
                News
              </li>
            </Link>
            <Link to="/contact">
              <li className="text-base text-black font-bold hover:text-orange-900 hove:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300  font-titleFont">
                Contact
              </li>
            </Link>
            {userInfo?.email === "abd.aldukhn@gmail.com" || userInfo?.email === "isdhisa@gmail.com" && (
              <Link to="/create">
                <li className="text-base text-black font-bold hover:text-orange-900 hove:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300  font-titleFont">
                  Add new Game
                </li>
              </Link>
            )}
          </ul>
          <Link to="/cart">
            <div className="relative">
              <img className="w-6" src={cartlogo} alt="" />
              <span className="absolute w-6 top-2 left-4  text-sm flex items-center justify-center font-semibold font-titleFont">
                {productData.length}
              </span>
            </div>
          </Link>
          <Link to={userInfo ? "/myaccount" : "/login"}>
            <img
              className="w-8 h-8 rounded-full"
              src={
                userInfo
                  ? userInfo.image
                  : "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
              }
              alt="user"
            />
          </Link>
          {userInfo && (
            <p className=" text-base font-titleFont font-semibold underline underline-offset-2 ">
              {userInfo.name}
            </p>
          )}

<div className="flex items-center gap-8 flex-grow">
      <div className="flex-grow">
        {filteredProducts.map((product, index) => (
          <Products key={index} product={product} />
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
          placeholder="Search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <span className="absolute top-3 left-3 text-gray-400">
          <ImSearch />
        </span>
      </div>
    </div>

        </div>
      </div>
    </div>
  );
};

export default Header;
