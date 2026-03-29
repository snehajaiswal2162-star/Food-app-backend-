import React, { useContext, useState } from "react"
import { AppContext } from "../../context/AppContext"
import { toast } from "react-hot-toast"
import { Upload } from "lucide-react"

const AddCategory = () => {
  const { axios, navigate, loading, setLoading } = useContext(AppContext)

  const [name, setName] = useState("")
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error("Category name is required")
      return
    }

    if (!file) {
      toast.error("Please upload an image")
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB")
      return
    }

    try {
      setLoading(true)

      const data = new FormData()
      data.append("name", name)
      data.append("image", file)

      const res = await axios.post("/api/category/add", data, {
        withCredentials: true,
        timeout: 15000
      })

      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/admin/category")
      } else {
        toast.error(res.data.message)
      }

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Upload failed"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full flex flex-col gap-5"
      >
        {preview && <img src={preview} alt="preview" className="w-1/2" />}

        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />

        <input
          type="file"
          id="fileUpload"
          className="hidden"
          onChange={(e) => {
            const selected = e.target.files[0]
            if (!selected) return
            setFile(selected)
            setPreview(URL.createObjectURL(selected))
          }}
        />

        <label
          htmlFor="fileUpload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer"
        >
          <Upload className="w-8 h-8 mb-2" />
          <span className="text-sm">
            {file ? file.name : "Click to upload image"}
          </span>
        </label>

        <button
          disabled={loading}
          className={`px-8 py-3 text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500"
          }`}
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  )
}

export default AddCategory
