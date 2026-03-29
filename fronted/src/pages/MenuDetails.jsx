import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "./../context/AppContext";
import { ArrowLeft, CheckCircle, ShoppingCart, XCircle } from "lucide-react";

const MenuDetails = () => {
  const { id } = useParams();
  const { navigate, menu, addToCart } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  const menus = menu.find((item) => item._id.toString() === id);

  if (!menus)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 ">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Menu not found
          </h2>
          <p className="text-gray-600 mb-4">
            The item you are looking for doesn't exist
          </p>
          <button
            onClick={() => navigate("/menu")}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-700 text-white rounded-full font-semibold transition-colors"
          >
            Back to menu
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back button */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate("/menu")}
          className="flex items-center gap-2 text-gray-600 hover:text-yellow-500 transition-colors group "
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform " />
          <span className="font-semibold">Back to menu</span>
        </button>
      </div>

      {/* Main contain */}
      <div className="container mx-auto pb-16 px-4">
        <div className="grid md:grid-cols-2 items-start gap-12">
          {/* Image section */}
          <div className="relative">
            <div className="sticky top-8">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={menus.image}
                  alt={menus.name}
                  className="w-full h-[30rem] object-cover"
                />

                {/* Availability Badge */}
                <div className="absolute top-6 right-6">
                  {menus.isAvailable ? (
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center font-semibold gap-2 shadow-lg">
                      <CheckCircle className="h-5 w-5" />
                      <span>Available</span>
                    </div>
                  ) : (
                    <div className="bg-red-500 text-white px-4 py-2 rounded-full items-center font-semibold gap-2 shadow-lg">
                      <XCircle className="w-5 h-5" />
                      <span>Unavailable</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Details section */}
          <div className="space-y-6">
            {/* Title & Price */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {menus.name}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-yellow-500">
                  ${menus.price}
                </span>
                <span className="text-gray-500 text-lg">per item</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-2xl ">
              <h3 className="text-lg  font-semibold text-gray-800">Description :-</h3>
              <p className="text-gray-600 leading-relaxed">{menus.description}</p>
            </div>

            {/* Toal & Add cart */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-6 shadow-xl ">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg text-white font-semibold ">Total Amount</span>
                <span className="text-white text-3xl font-bold">$20</span>
              </div>

              <button disabled={!menus.isAvailable} onClick={() => addToCart(menus._id)} className={`cursor-pointer w-full rounded-xl py-4 font-bold text-lg transition-all duration-300 flex items-center justify-center gap3
                 ${menus.isAvailable
                 ? "bg-white text-yellow-500 hover:bg-gray-50 hover:scale-105 active:scale-95 shadow-lg" : 
                 "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
                <ShoppingCart className="w-6 h-6 "/> {menus.isAvailable ? 'Add to cart' : "Unavailable"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;
