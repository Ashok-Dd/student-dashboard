import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Api } from "../API";
import { Loader2 } from "lucide-react";

const AdminRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegisterAdmin = async (e) => {
    e.preventDefault();
    if (cnfPassword !== password) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        Api + "/admin/register",
        { name, email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setCnfPassword("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center px-4">
      <form
        onSubmit={handleRegisterAdmin}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-5 transition-all duration-300"
      >
        <h2 className="text-3xl font-extrabold text-orange-600 text-center mb-2">
          Admin Registration
        </h2>
        <p className="text-center text-gray-500 text-sm mb-4">
          Create a new admin account below
        </p>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Full Name"
            className="h-12 px-4 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-orange-50 text-gray-700 placeholder-gray-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            autoComplete="new-email"
            className="h-12 px-4 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 text-gray-700 placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            className="h-12 px-4 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 text-gray-700 placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="h-12 px-4 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 text-gray-700 placeholder-gray-400"
            value={cnfPassword}
            onChange={(e) => setCnfPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 h-12 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 ${
            loading
              ? "bg-orange-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          } shadow-lg`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" /> Registering...
            </>
          ) : (
            "Register Admin"
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
