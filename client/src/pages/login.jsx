import { Lock, User, User2, Loader2, ArrowLeft } from "lucide-react";
import axios from "axios";
import { Api } from "../API";
import { useStore } from "../store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useStore();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields...");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        Api + "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        const data = response.data;
        setUserInfo(data.user);
        toast.success(data.message);
        nav("/");
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
    <>
      <div
        className="h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center relative"
        style={{ backgroundImage: "url('/bgimg4.jpg')" }}
      >
        {/* Floating Logo */}
        <div className="absolute top-4 left-4 text-orange-800">
          <button
          onClick={() => nav("/")}
          className="text-white bg-orange-600 hover:bg-orange-700 p-2 rounded-full shadow-lg transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        </div>

        {/* Glass Card */}
        <form
          onSubmit={handleLogin}
          className="relative h-[380px] w-[90%] sm:w-[60%] md:w-[45%] lg:w-[25%] flex flex-col border-2 border-orange-400 items-center justify-evenly rounded-2xl shadow-xl bg-orange-50/60 backdrop-blur-xl transition-all duration-500 hover:shadow-orange-200"
        >
          {/* Floating Icon */}
          <div className="absolute -top-16 w-[120px] h-[120px] bg-orange-100 rounded-full border-t-2 border-orange-500 shadow-md flex items-center justify-center text-orange-500">
            <User2 className="w-[65%] h-[65%]" />
          </div>

          {/* Title */}
          <div className="w-full flex justify-center mt-16">
            <h1 className="text-orange-500 text-2xl font-bold uppercase tracking-wide">
              Student Login
            </h1>
          </div>

          {/* Input Fields */}
          <div className="flex flex-col items-center justify-center gap-7 w-full">
            {/* Email */}
            <div className="flex w-[85%] h-11 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <div className="bg-gray-100 text-orange-500 flex items-center justify-center w-[15%]">
                <User />
              </div>
              <input
                type="email"
                autoComplete="off"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none text-orange-600 bg-gray-100 w-[85%] px-3 placeholder:text-orange-400"
              />
            </div>

            {/* Password */}
            <div className="flex w-[85%] h-11 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 relative">
              <div className="bg-gray-100 text-orange-500 flex items-center justify-center w-[15%]">
                <Lock />
              </div>
              <input
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="outline-none text-orange-600 bg-gray-100 w-[85%] px-3 placeholder:text-orange-400"
              />
              <span
                className="absolute -bottom-5 right-2 text-sm text-orange-500 hover:text-orange-700 cursor-pointer transition-all"
                onClick={() => nav("/forget-password")}
              >
                Forgot password?
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mb-8 w-[75%]">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-orange-500 h-11 text-lg uppercase text-white rounded-full shadow-md hover:bg-orange-600 transition-all duration-300 ${
                loading ? "opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        {/* Admin Login Floating Button */}
        <button
          className="fixed bottom-5 right-5 bg-orange-500 px-3 py-2 rounded-lg hover:bg-orange-400 shadow-lg animate-bounce cursor-pointer text-white transition-all"
          onClick={() => nav("/admin-login")}
        >
          Admin Login
        </button>
      </div>
    </>
  );
};

export default Login;
