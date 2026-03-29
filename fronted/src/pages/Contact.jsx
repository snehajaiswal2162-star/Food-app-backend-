import React from "react"

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">
            Contact <span className="text-yellow-500">Us</span>
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Have a question, feedback, or need help? We’d love to hear from you.
          </p>
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Image Section */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="Contact us"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Get in Touch
            </h2>

            <form className="space-y-5">
              <div>
                <label className="block text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-yellow-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-center">

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">📍 Address</h3>
            <p className="text-gray-600 mt-2">Mumbai, India</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">📧 Email</h3>
            <p className="text-gray-600 mt-2">support@yourapp.com</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">📞 Phone</h3>
            <p className="text-gray-600 mt-2">+91 98765 43210</p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Contact
