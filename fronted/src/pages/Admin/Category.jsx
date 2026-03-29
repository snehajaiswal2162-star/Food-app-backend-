import React, { useContext } from "react";
import { AppContext } from "./../../context/AppContext";
import { CircleX } from "lucide-react";
import { toast } from "react-hot-toast";

const Category = () => {
  const { category, fetchCategory, axios } = useContext(AppContext);

  const deleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(`/api/category/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Cannot delete category");
    }
  };

  return (
    <div className="py-4">
      <h1 className="text-3xl mb-3 font-bold">All Categories</h1>
      <div className="border border-gray-400 max-w-5xl mx-auto p-3">
        <div className="grid grid-cols-3 font-semibold text-gray-700">
          <div>Image</div>
          <div>Name</div>
          <div>Active</div>
        </div>
        <hr className="w-full my-4 text-gray-400" />
        <ul>
          {category.map((item) => (
            <div key={item._id}>
              <div className="grid grid-cols-3 font-semibold text-gray-700">
                <div className="flex items-center gap-2 max-w-md">
                  <img
                    src={item.image}
                    alt="Image of food"
                    className="w-20 h-20"
                  />
                </div>
                <p>{item.name}</p>
                <p
                  className="text-red-600 cursor-pointer hover:underline"
                  onClick={() => deleteCategory(item._id)}
                >
                  <CircleX />
                </p>
              </div>
              <hr className="text-gray-300 w-full" />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
