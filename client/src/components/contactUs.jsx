import { Mail, User, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { Api } from "../API";
import { toast } from 'react-toastify';
import axios from 'axios';
import { motion } from 'framer-motion';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const AdminMail = 'eduportal@gmail.com';

  const handleContactUs = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(Api + "/auth/contact-us", { name, email, message }, { withCredentials: true });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-orange-50 to-orange-100 flex flex-col items-center py-10 px-4 overflow-y-auto">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl font-extrabold text-orange-800 mb-8"
      >
        Contact <span className="text-orange-600">Us</span>
      </motion.h2>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-lg shadow-2xl border border-orange-300 rounded-2xl p-6 sm:p-10 w-full max-w-md sm:max-w-lg"
      >
        <form onSubmit={handleContactUs} className="flex flex-col gap-5">
          <div className="flex items-center gap-3 bg-gray-100 rounded-md p-2">
            <User className="text-orange-500" />
            <input
              type="text"
              placeholder="Enter your name"
              className="flex-1 outline-none bg-gray-100 text-orange-600 placeholder-orange-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-3 bg-gray-100 rounded-md p-2">
            <Mail className="text-orange-500" />
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 outline-none bg-gray-100 text-orange-600 placeholder-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <textarea
            placeholder="Your message"
            rows="5"
            className="w-full outline-none bg-gray-100 text-orange-600 placeholder-orange-500 p-3 rounded-md resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <button
            type="submit"
            className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 flex items-center justify-center`}
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </motion.div>

      {/* Contact Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-12 text-center space-y-3"
      >
        <h2 className="text-3xl font-bold text-orange-800 mb-4">Get in Touch</h2>
        <div className="flex flex-col items-center gap-3 text-orange-900 text-base sm:text-lg">
          <p className="flex items-center gap-2">
            <Mail className="text-orange-600" size={20} /> <span>{AdminMail}</span>
          </p>
          <p className="flex items-center gap-2">
            <Phone className="text-orange-600" size={20} /> <span>+91 12345 67890</span>
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="text-orange-600" size={20} /> <span>123, Bhimavaram, Andhra Pradesh, India</span>
          </p>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="mt-10 text-sm text-orange-700">
        © {new Date().getFullYear()} EduPortal — All Rights Reserved.
      </div>
    </div>
  );
};

export default ContactUs;
