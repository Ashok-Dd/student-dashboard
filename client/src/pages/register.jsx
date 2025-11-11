import { Lock, User, User2, Loader2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../API";
import { toast } from "react-toastify";
import axios from "axios";
import { useStore } from "../store";

const Signup = () => {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { setUserInfo } = useStore();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== cnfPassword) {
      toast.error("Password mismatched!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        Api + "/auth/register",
        { name, studentId, year, branch, email, password, gender },
        { withCredentials: true }
      );
      if (response.data.success) {
        const data = response.data;
        setUserInfo(data.user);
        toast.success(data.message);
        nav("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
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
        {/* Back Button */}
        <div className="absolute top-4 left-4 text-orange-800">
          <button
          onClick={() => nav("/")}
          className="text-white bg-orange-600 hover:bg-orange-700 p-2 rounded-full shadow-lg transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        </div>

        {/* Frosted Glass Form */}
        <form
          onSubmit={handleRegister}
          className="relative sm:h-[78%] w-[90%] sm:w-[60%] lg:w-[40%] flex flex-col gap-5 items-center justify-evenly rounded-2xl shadow-2xl border-2 border-orange-400 bg-orange-50/60 backdrop-blur-xl px-5 sm:px-8 py-8 transition-all duration-500 hover:shadow-orange-200"
        >
          {/* Floating Icon */}
          <div className="absolute -top-16 w-[120px] h-[120px] bg-orange-100 rounded-full border-t-2 border-orange-500 shadow-md flex items-center justify-center text-orange-500">
            <User2 className="w-[60%] h-[60%]" />
          </div>

          {/* Title */}
          <h1 className="text-orange-500 text-2xl font-bold uppercase mt-12 tracking-wide">
            Register
          </h1>

          {/* Name + Student ID */}
          <div className="flex w-full gap-4 h-11">
            <div className="flex w-[70%] bg-gray-100 rounded-lg overflow-hidden shadow-sm">
              <div className="w-12 flex items-center justify-center text-orange-500">
                <User />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 outline-none bg-gray-100 px-3 text-orange-600 placeholder-orange-400"
              />
            </div>
            <div className="flex w-[30%] bg-gray-100 rounded-lg overflow-hidden shadow-sm">
              <div className="w-12 flex items-center justify-center text-orange-500">
                <User />
              </div>
              <input
                type="text"
                placeholder="ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="flex-1 outline-none bg-gray-100 px-2 text-orange-600 placeholder-orange-400"
              />
            </div>
          </div>

          {/* Year, Branch, Gender */}
          <div className="flex w-full gap-4 h-11">
            <select
              className="w-[33%] bg-gray-100 text-orange-600 px-3 rounded-lg outline-none text-base shadow-sm"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">Year</option>
              <option value="1">1st</option>
              <option value="2">2nd</option>
              <option value="3">3rd</option>
              <option value="4">4th</option>
            </select>
            <select
              className="w-[33%] bg-gray-100 text-orange-600 px-3 rounded-lg outline-none text-base shadow-sm"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="">Branch</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="CSD">CSD</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
            <select
              className="w-[33%] bg-gray-100 text-orange-600 px-3 rounded-lg outline-none text-base shadow-sm"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Email */}
          <div className="flex w-full h-11 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
            <div className="w-12 flex items-center justify-center text-orange-500">
              <User />
            </div>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 outline-none bg-gray-100 px-3 text-orange-600 placeholder-orange-400"
            />
          </div>

          {/* Password */}
          <div className="flex w-full h-11 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
            <div className="w-12 flex items-center justify-center text-orange-500">
              <Lock />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 outline-none bg-gray-100 px-3 text-orange-600 placeholder-orange-400"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex w-full h-11 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
            <div className="w-12 flex items-center justify-center text-orange-500">
              <Lock />
            </div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={cnfPassword}
              onChange={(e) => setCnfPassword(e.target.value)}
              className="flex-1 outline-none bg-gray-100 px-3 text-orange-600 placeholder-orange-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-[90%] h-11 bg-orange-500 text-white rounded-full text-lg font-semibold uppercase shadow-md hover:bg-orange-600 transition-all duration-300 flex items-center justify-center gap-2 ${
              loading ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
