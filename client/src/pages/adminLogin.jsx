import { ArrowLeft, Lock, User, UserCog, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { toast } from "react-toastify";
import axios from "axios";
import { Api } from "../API";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useStore();
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        Api + "/admin/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        const data = response.data;
        setUserInfo(data.user);
        toast.success(data.message);
        nav("/students");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong");
      } else {
        toast.error("Network error! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex flex-col justify-center items-center relative"
      style={{ backgroundImage: "url('/bgimg4.jpg')" }}
    >
      {/* Back Button */}
      <div className="absolute top-5 left-5">
            <button
          onClick={() => nav("/login")}
          className="text-white bg-orange-600 hover:bg-orange-700 p-2 rounded-full shadow-lg transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Glassmorphism Login Box */}
      <form
        onSubmit={handleLogin}
        className="backdrop-blur-md bg-white/20 border border-orange-400 text-white shadow-2xl rounded-2xl w-[90%] sm:w-[70%] md:w-[45%] lg:w-[30%] py-10 px-6 flex flex-col items-center relative"
      >
        {/* Logo Circle */}
        <div className="absolute -top-14 bg-gradient-to-br from-orange-400 to-orange-600 w-[100px] h-[100px] rounded-full flex items-center justify-center shadow-lg border border-white/40">
          <UserCog className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-3xl text-orange-600 font-bold mt-10 mb-8 uppercase tracking-wide">
          Admin Login
        </h1>

        {/* Email Input */}
        <div className="w-full flex items-center bg-white/80 rounded-xl mb-5 px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-orange-400 transition">
          <User className="text-orange-600 mr-3" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent outline-none text-orange-700 placeholder-orange-400"
          />
        </div>

        {/* Password Input */}
        <div className="w-full flex items-center bg-white/80 rounded-xl mb-8 px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-orange-400 transition">
          <Lock className="text-orange-600 mr-3" />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent outline-none text-orange-700 placeholder-orange-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-full text-lg font-semibold text-white transition-all duration-300 ${
            loading
              ? "bg-orange-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700 active:scale-95"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin w-5 h-5" />
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
