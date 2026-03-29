

import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";

const AddMenu = () => {
  const { axios, navigate, loading, setLoading, category } =
    useContext(AppContext);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: '',
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload an image");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", Number(formData.price));
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("image", file);

      const res = await axios.post("/api/menu/add", data, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/menus");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to add menu"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full flex flex-col gap-5"
      >
        <input
          type="text"
          name="name"
          placeholder="Menu name"
          value={formData.name}
          onChange={handleChange}
          className="input"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="input"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="input"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="input"
        >
          <option value="">Select category</option>
          {category.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          id="fileUpload"
          hidden
          onChange={handleFileChange}
        />

        <label
          htmlFor="fileUpload"
          className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer"
        >
          <Upload />
          <span className="text-sm mt-1">
            {file ? file.name : "Upload image"}
          </span>
        </label>

        {preview && (
          <img src={preview} alt="preview" className="w-24" />
        )}

        <button className="bg-orange-500 text-white py-3">
          {loading ? "Adding..." : "Add Menu"}
        </button>
      </form>
    </div>
  );
};

export default AddMenu;

