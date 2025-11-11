import axios from "axios";
import { Lock, User, User2, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Api } from "../API";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== cnfPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        Api + "/admin/add-student",
        { name, studentId, branch, year, gender, email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setCnfPassword("");
        setBranch("");
        setGender("");
        setStudentId("");
        setYear("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const branches = [
    "CSE",
    "ECE",
    "EEE",
    "IT",
    "MECH",
    "CIVIL",
    "AIML",
    "AIDS",
    
  ];

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-orange-100 to-orange-200 p-4">
      <form
        onSubmit={handleRegister}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-orange-400 px-8 py-10 pt-20 transition-all duration-300"
      >
        {/* Profile icon */}
        <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[100px] h-[100px] bg-gradient-to-br from-orange-200 to-orange-100 border-2 border-orange-400 rounded-full flex items-center justify-center shadow-lg">
          <User2 className="w-[60%] h-[60%] text-orange-500" />
        </div>

        {/* Title */}
        <h1 className="text-center text-orange-500 text-2xl sm:text-3xl font-extrabold mb-8 uppercase tracking-wide">
          Register Student
        </h1>

        <div className="flex flex-col gap-5">
          {/* Name + ID */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex w-full sm:w-[70%] rounded-lg overflow-hidden bg-orange-50 border border-orange-300">
              <div className="w-10 flex items-center justify-center text-orange-500">
                <User />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                className="flex-1 outline-none bg-transparent px-2 text-orange-600 placeholder-orange-400 h-11"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex w-full sm:w-[30%] rounded-lg overflow-hidden bg-orange-50 border border-orange-300">
              <div className="w-10 flex items-center justify-center text-orange-500">
                <User />
              </div>
              <input
                type="text"
                placeholder="ID"
                className="flex-1 outline-none bg-transparent px-2 text-orange-600 placeholder-orange-400 h-11"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>
          </div>

          {/* Year + Branch + Gender */}
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              className="w-full sm:w-1/3 h-11 bg-orange-50 border border-orange-300 text-orange-600 px-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="" disabled>
                Select Year
              </option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>

            <select
              className="w-full sm:w-1/3 h-11 bg-orange-50 border border-orange-300 text-orange-600 px-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="" disabled>
                Select Branch
              </option>
              {branches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <select
              className="w-full sm:w-1/3 h-11 bg-orange-50 border border-orange-300 text-orange-600 px-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Email */}
          <div className="flex w-full rounded-lg overflow-hidden bg-orange-50 border border-orange-300 h-11">
            <div className="w-10 flex items-center justify-center text-orange-500">
              <Mail />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              autoComplete="new-email"
              className="flex-1 outline-none bg-transparent px-2 text-orange-600 placeholder-orange-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex w-full rounded-lg overflow-hidden bg-orange-50 border border-orange-300 h-11">
            <div className="w-10 flex items-center justify-center text-orange-500">
              <Lock />
            </div>
            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              className="flex-1 outline-none bg-transparent px-2 text-orange-600 placeholder-orange-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div className="flex w-full rounded-lg overflow-hidden bg-orange-50 border border-orange-300 h-11">
            <div className="w-10 flex items-center justify-center text-orange-500">
              <Lock />
            </div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="flex-1 outline-none bg-transparent px-2 text-orange-600 placeholder-orange-400"
              value={cnfPassword}
              onChange={(e) => setCnfPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-11 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 ${
              loading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 shadow-lg"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" /> Registering...
              </>
            ) : (
              "Register Student"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
