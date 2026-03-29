import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">Foodify</h2>
          <p className="mt-3 text-sm text-gray-400">
            A modern food ordering platform built with the MERN stack.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/menu" className="hover:text-white">Menu</a></li>
            <li><a href="/cart" className="hover:text-white">Cart</a></li>
            <li><a href="/orders" className="hover:text-white">Orders</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p className="text-sm text-gray-400">📍 Mumbai, India</p>
          <p className="text-sm text-gray-400">📧 support@foodify.com</p>
          <p className="text-sm text-gray-400">📞 +91 98765 43210</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Foodify. Built with ❤️ using MERN Stack.
      </div>
    </footer>
  );
};

export default Footer;
