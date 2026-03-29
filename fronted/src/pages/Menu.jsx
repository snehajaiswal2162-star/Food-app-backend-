import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Search, X } from "lucide-react";
import MenuCart from "../components/MenuCart";

const Menu = () => {
  const { menu } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMenu, setFilterMenu] = useState([]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilterMenu(menu);
    } else {
      const filtered = menu.filter((menu) =>
        menu.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilterMenu(filtered);
    }
  }, [searchQuery, menu]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
         <h1 className="text-4xl font-bold text-gray-800">
            Our <span className="text-yellow-500">Menu's</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Explore our delicious selection of handcrafted dishes made with the
            finest ingredients
          </p>
          {/* Search box */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for your favourite dish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-full border-2 border-gray-200 focus:border-yellow-500 focus:outline-none transition-colors text-gray-700 duration-300 placeholder-gray-400 shadow-md"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 tranform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors "
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Result content */}
        <div className="mb-6">
          <p className="text-gray-600 text-center">
            {searchQuery ? (
              <>
                Found{" "}
                <span className="font-semibold text-yellow-500">
                  {filterMenu.length}
                </span>
                {filterMenu.length === 1 ? "result" : "results"} for{" "}
                {searchQuery}
              </>
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-yellow-600">
                  {filterMenu.length}
                </span>
                {filterMenu.length === 1 ? "dish" : "dishes"}
              </>
            )}
          </p>
        </div>

        {/* Menu grid */}
        {filterMenu.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filterMenu.map((item) => (
              <MenuCart item={item} key={item._id} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600">No dishes found for "{searchQuery}"</p>

            <button
              onClick={handleClearSearch}
              className="px-6 py-3 bg-yellow-500 hover:text-yellow-700 text-white rounded-full font-semibold duration-300 transition-colors"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
