import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Api } from "../API";

const CourseRegistration = () => {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [instructor, setInstructor] = useState("");
  const [loading, setLoading] = useState(false);

  const AddCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!title || !startDate || !endDate || !instructor) {
        toast.warn("All fields are required.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("instructor", instructor);
      if (poster) formData.append("poster", poster);

      const res = await axios.post(`${Api}/course/add-course`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setTitle("");
        setStartDate("");
        setEndDate("");
        setInstructor("");
        setPoster(null);
      } else toast.error(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const today = `${new Date().getFullYear()}-${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`;

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 py-10 px-3 sm:px-6 overflow-x-hidden">
      <div className="w-full sm:w-[85%] md:w-[65%] lg:w-[45%] bg-white rounded-2xl shadow-2xl p-6 sm:p-10 border border-orange-200">
        <h1 className="text-3xl md:text-4xl text-orange-600 font-bold text-center mb-8 drop-shadow-sm">
          Course Registration
        </h1>

        <form onSubmit={AddCourse} className="flex flex-col gap-6">
          {/* Course Name */}
          <div>
            <label className="block text-orange-600 text-lg font-semibold mb-2">
              Course Name
            </label>
            <input
              type="text"
              placeholder="Enter course name"
              className="w-full h-12 px-4 rounded-lg bg-gray-100 border border-orange-400 focus:ring-2 focus:ring-orange-400 outline-none transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Date Fields Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-orange-600 text-lg font-semibold mb-2">
                Start Date
              </label>
              <input
                type="date"
                min={today}
                className="w-full h-12 px-4 rounded-lg bg-gray-100 border border-orange-400 focus:ring-2 focus:ring-orange-400 outline-none transition-all"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label className="block text-orange-600 text-lg font-semibold mb-2">
                End Date
              </label>
              <input
                type="date"
                min={startDate || today}
                className="w-full h-12 px-4 rounded-lg bg-gray-100 border border-orange-400 focus:ring-2 focus:ring-orange-400 outline-none transition-all"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Instructor Name */}
          <div>
            <label className="block text-orange-600 text-lg font-semibold mb-2">
              Instructor Name
            </label>
            <input
              type="text"
              placeholder="Enter instructor's name"
              className="w-full h-12 px-4 rounded-lg bg-gray-100 border border-orange-400 focus:ring-2 focus:ring-orange-400 outline-none transition-all"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
            />
          </div>

          {/* Poster Upload */}
          <div>
            <label className="block text-orange-600 text-lg font-semibold mb-2">
              Course Banner (Poster)
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full h-12 px-3 py-2 rounded-lg bg-gray-100 border border-orange-400 focus:ring-2 focus:ring-orange-400 outline-none transition-all cursor-pointer"
              onChange={(e) => setPoster(e.target.files[0])}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full h-12 font-semibold rounded-lg shadow-md text-white transition-all duration-300 ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Registering...
              </div>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseRegistration;
