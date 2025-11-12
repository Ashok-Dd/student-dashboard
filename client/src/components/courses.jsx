import {
  ArrowDown,
  ArrowUp,
  Lock,
  SearchIcon,
  X,
  Loader2,
  BookOpen,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "../store";
import { toast } from "react-toastify";
import axios from "axios";
import { Api } from "../API";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [openCnf1, setOpenCnf1] = useState({ course: "", state: false });
  const [openCnf2, setOpenCnf2] = useState({ course: "", state: false });
  const [password, setPassword] = useState("");
  const { userInfo } = useStore();
  const [searchItem, setSearchItem] = useState("");

  const getCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(Api + "/course/get-all-courses");
      if (response.data.success) {
        setCourses(response.data.courses);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleEnroll = (course) => setOpenCnf1({ course, state: true });
  const handleRemove = (course) => setOpenCnf2({ course, state: true });

  const handleVerifyPassword = async (password) => {
    try {
      const response = await axios.post(
        Api + "/auth/validate-password",
        { email: userInfo.email, password },
        { withCredentials: true }
      );
      if (response.data.success) {
        const enrolmentResponse = await axios.post(
          Api + "/course/enroll-student",
          { courseId: openCnf1.course._id },
          { withCredentials: true }
        );
        if (enrolmentResponse.data.success)
          toast.success("Successfully enrolled to: " + openCnf1.course.title);
        else toast.error(enrolmentResponse.data.message);
        setOpenCnf1({ title: "", state: false });
        setPassword("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRemoveCourse = async (password) => {
    try {
      const response = await axios.post(
        Api + "/auth/validate-password",
        { email: userInfo.email, password },
        { withCredentials: true }
      );
      if (response.data.success) {
        const removeResponse = await axios.post(
          Api + "/course/remove",
          { courseId: openCnf2.course._id },
          { withCredentials: true }
        );
        if (removeResponse.data.success) {
          toast.success("Removed: " + openCnf2.course.title);
          getCourses();
        } else toast.error(removeResponse.data.message);
        setOpenCnf2({ title: "", state: false });
        setPassword("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCourseStatus = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (today < start) return "Not Started";
    if (today >= start && today <= end) return "Ongoing";
    return "Ended";
  };

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div className="bg-orange-50 h-screen overflow-y-auto flex flex-col items-center pb-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-orange-700 mt-10 mb-5">
        Courses
      </h1>

      {/* Search Bar */}
      <div className="w-[90%] sm:w-[70%] md:w-[70%] flex mb-6 shadow-lg rounded-lg">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="flex-1 px-4 py-3 outline-none bg-orange-100 text-orange-800 rounded-l-lg placeholder-orange-500"
        />
        
        <button className="bg-orange-500 px-4 flex items-center rounded-r-lg justify-center text-white hover:bg-orange-600 transition">
          <SearchIcon />
        </button>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="flex flex-wrap justify-center gap-5 w-full px-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-orange-200 animate-pulse rounded-xl w-[90%] sm:w-[320px] h-[330px]"
            ></div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredCourses.length === 0 && (
        <div className="flex flex-col items-center mt-20 text-center text-orange-700">
          <BookOpen size={60} className="mb-4 text-orange-400" />
          <p className="text-xl font-semibold">No courses found!</p>
          <p className="text-orange-500 text-sm">
            Try searching with a different keyword.
          </p>
        </div>
      )}

      {/* Courses List */}
      <div className="flex flex-wrap justify-center gap-5 px-4 w-full">
        {!loading &&
          filteredCourses.slice(0, visibleCount).map((course, index) => {
            const status = getCourseStatus(course.startDate, course.endDate);
            return (
              <div
                key={index}
                className="relative group bg-white rounded-2xl shadow-md hover:shadow-xl w-[90%] sm:w-[320px] overflow-hidden transition-all duration-300"
              >
                <img
                  src={
                    typeof course.poster === "string" &&
                    !course.poster.startsWith("http")
                      ? `data:image/png;base64,${course.poster}`
                      : course.poster
                  }
                  className="h-[200px] w-full object-cover"
                  alt={course.title}
                />
                <div className="p-4 text-center text-orange-800">
                  <h3 className="font-bold text-lg capitalize mb-1">
                    {course.title.length > 25
                      ? course.title.slice(0, 25) + "..."
                      : course.title}
                  </h3>
                  <p className="text-sm">
                    Instructor:{" "}
                    <span className="text-orange-600 font-medium">
                      {course.instructor}
                    </span>
                  </p>
                  <p className="text-sm mt-1">
                    {new Date(course.startDate).toLocaleDateString("en-GB")} –{" "}
                    {new Date(course.endDate).toLocaleDateString("en-GB")}
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    Status:{" "}
                    <span
                      className={`${
                        status === "Ended"
                          ? "text-red-500"
                          : status === "Ongoing"
                          ? "text-green-600"
                          : "text-blue-500"
                      }`}
                    >
                      {status}
                    </span>
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-4 transition-opacity duration-300">
                  {userInfo.isAdmin ? (
                    <button
                      className="bg-white px-6 py-2 rounded-full text-orange-600 font-semibold hover:bg-orange-500 hover:text-white transition"
                      onClick={() => handleRemove(course)}
                    >
                      Remove Course
                    </button>
                  ) : (
                    <button
                      className="bg-white px-6 py-2 rounded-full text-orange-600 font-semibold hover:bg-orange-500 hover:text-white transition"
                      onClick={() => handleEnroll(course)}
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {/* View more / less */}
      {!loading && courses.length > 6 && !searchItem && (
        <div className="flex gap-8 mt-10">
          {visibleCount < courses.length && (
            <button
              className="flex items-center gap-2 bg-orange-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-orange-600 transition animate-bounce"
              onClick={() => setVisibleCount((p) => p + 6)}
            >
              View More <ArrowDown />
            </button>
          )}
          {visibleCount > 6 && (
            <button
              className="flex items-center gap-2 bg-orange-400 text-white px-6 py-2 rounded-full shadow-md hover:bg-orange-500 transition animate-bounce"
              onClick={() => setVisibleCount((p) => p - 6)}
            >
              View Less <ArrowUp />
            </button>
          )}
        </div>
      )}

      {/* Confirmation Modals */}
      {[openCnf1, openCnf2].map((cnf, idx) => {
        if (!cnf.state) return null;
        const isEnroll = idx === 0;
        return (
          <div
            key={idx}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-fadeIn"
          >
            {/* Modal Container */}
            <div className="relative w-full max-w-md bg-gradient-to-b from-orange-50 via-white to-orange-100 border border-orange-200 rounded-2xl shadow-2xl p-6 transform transition-all scale-100 hover:scale-[1.01]">
              {/* Close Icon */}
              <X
                className="absolute top-4 right-4 text-orange-600 hover:text-orange-700 cursor-pointer transition"
                onClick={() =>
                  idx === 0
                    ? setOpenCnf1({ title: "", state: false })
                    : setOpenCnf2({ title: "", state: false })
                }
              />

              {/* Header */}
              <div className="text-center mb-4">
                <h2 className="text-2xl font-extrabold text-orange-600 tracking-wide uppercase">
                  Confirmation
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mt-2 rounded-full"></div>
              </div>

              {/* Body */}
              <div className="text-center text-orange-800">
                <p className="text-base mb-2">
                  Please enter your password to{" "}
                  <b className="text-orange-600">
                    {isEnroll ? "Enroll" : "Remove"}
                  </b>{" "}
                  the course
                </p>
                <p className="font-semibold text-lg italic text-orange-700">
                  “{cnf.course.title}”
                </p>

                {/* Password Field */}
                <div className="relative mt-5 flex justify-center">
                  <Lock className="absolute left-12 sm:left-14 top-3 text-orange-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-[75%] px-10 py-2.5 border border-orange-300 rounded-xl bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="my-5 border-t border-orange-200"></div>

              {/* Buttons */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() =>
                    idx === 0
                      ? handleVerifyPassword(password)
                      : handleRemoveCourse(password)
                  }
                  className="flex-1 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 active:scale-[0.98]"
                >
                  Verify
                </button>
                <button
                  onClick={() =>
                    idx === 0
                      ? setOpenCnf1({ title: "", state: false })
                      : setOpenCnf2({ title: "", state: false })
                  }
                  className="flex-1 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 active:scale-[0.98]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
      })}

    </div>
  );
};

export default Courses;
