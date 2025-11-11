import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Api } from "../API";
import { Lock, X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [openPersonal, setOpenPersonal] = useState(true);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentId = searchParams.get("id");

  const getStudent = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${Api}/profile/get-student/${studentId}`);
      if (response.data.success) {
        setStudent(response.data.student);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCourses = async () => {
    try {
      const response = await axios.post(
        Api + "/course/get-all-courses-of-student",
        { studentId },
        { withCredentials: true }
      );
      if (response.data.success) {
        setCourses(response.data.courses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const VerifiedToRemoveStudent = async () => {
    try {
      const response = await axios.post(
        Api + "/admin/remove-student",
        { id: student._id },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setOpenRemoveDialog(false);
        setPassword("");
        nav("/students");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleVerifyPassword = async () => {
    try {
      const response = await axios.post(
        Api + "/auth/to-remove-student-validate-password",
        { password },
        { withCredentials: true }
      );
      if (response.data.success) {
        VerifiedToRemoveStudent();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (studentId) {
      getStudent();
      getCourses();
    }
  }, [studentId]);

  const getCourseStatus = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (today < start) return "Not Started";
    if (today >= start && today <= end) return "Ongoing";
    return "Ended";
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-orange-50">
        <Loader2 className="animate-spin text-orange-500" size={40} />
        <p className="text-orange-700 mt-2 font-semibold">Loading profile...</p>
      </div>
    );

  if (!student)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        Student not found.
      </div>
    );

  return (
    <div className="h-screen bg-orange-50 flex flex-col gap-6 p-4 sm:p-8 overflow-y-auto">
      {/* Header */}
      <h1 className="text-center text-3xl sm:text-4xl font-extrabold text-orange-700">
        <span className="text-orange-500 capitalize">{student.name}'s</span> Profile
      </h1>

      {/* Profile Card */}
      <div className="flex flex-col sm:flex-row items-center bg-white p-6 rounded-2xl shadow-lg gap-6 sm:gap-10 mx-auto max-w-5xl w-full">
        <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-orange-300 shadow-md overflow-hidden bg-orange-100 flex items-center justify-center">
          {!student.profile ? (
            <span className="text-5xl font-bold text-orange-700 uppercase">
              {student.name?.[0] || "U"}
            </span>
          ) : (
            <img
              src={
                typeof student.profile === "string" &&
                !student.profile.startsWith("http")
                  ? `data:image/png;base64,${student.profile}`
                  : student.profile
              }
              alt="profile"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="flex flex-col flex-1 gap-2 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-700 capitalize">
            {student.name}
          </h2>
          <p className="text-orange-600 text-sm sm:text-lg">
            Email: <span className="text-orange-500">{student.email}</span>
          </p>
          <p className="text-orange-600 text-sm sm:text-lg">
            Student ID: <span className="text-orange-500">{student.studentId}</span>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-md p-5 mx-auto max-w-5xl w-full">
        <div className="flex justify-center mb-6">
          <button
            className={`w-1/2 py-2 rounded-l-xl font-semibold transition-all ${
              openPersonal
                ? "bg-orange-500 text-white"
                : "bg-orange-100 text-orange-600 hover:bg-orange-200"
            }`}
            onClick={() => setOpenPersonal(true)}
          >
            Personal Details
          </button>
          <button
            className={`w-1/2 py-2 rounded-r-xl font-semibold transition-all ${
              !openPersonal
                ? "bg-orange-500 text-white"
                : "bg-orange-100 text-orange-600 hover:bg-orange-200"
            }`}
            onClick={() => setOpenPersonal(false)}
          >
            Academic Details
          </button>
        </div>

        {openPersonal ? (
          <div className="grid sm:grid-cols-2 gap-4 text-orange-700">
            <Detail label="Father's Name" value={student.fatherName} />
            <Detail label="Mother's Name" value={student.motherName} />
            <Detail label="Phone Number" value={student.phNo} />
            <Detail label="Parent Phone" value={student.parentPhNo} />
            <Detail label="Address" value={student.address} />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4 text-orange-700">
            <Detail label="School" value={student.schoolName} />
            <Detail label="Intermediate" value={student.intermediate} />
            <Detail label="B.Tech" value={student.btech} />
            <Detail label="LeetCode Username" value={student.leetcodeUid} />
            <Detail label="GitHub Username" value={student.githubUid} />
          </div>
        )}
      </div>

      {/* Courses Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 mx-auto max-w-5xl w-full">
        <h2 className="text-2xl font-bold text-orange-700 mb-4 text-center">
          {student.name}'s Enrolled Courses
        </h2>

        {courses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => {
              const status = getCourseStatus(course.startDate, course.endDate);
              return (
                <div
                  key={index}
                  className="bg-orange-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <img
                    src={
                      typeof course.poster === "string" &&
                      !course.poster.startsWith("http")
                        ? `data:image/png;base64,${course.poster}`
                        : course.poster
                    }
                    alt="course"
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-lg font-bold text-orange-700 truncate">
                      {course.title}
                    </h3>
                    <p className="text-orange-600 text-sm">
                      Instructor: <span className="text-orange-500">{course.instructor}</span>
                    </p>
                    <p className="text-orange-600 text-sm">
                      {new Date(course.startDate).toLocaleDateString("en-GB")} -{" "}
                      {new Date(course.endDate).toLocaleDateString("en-GB")}
                    </p>
                    <p
                      className={`font-bold mt-1 ${
                        status === "Ended"
                          ? "text-red-500"
                          : status === "Ongoing"
                          ? "text-green-600"
                          : "text-blue-500"
                      }`}
                    >
                      {status}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center italic text-orange-500 font-semibold">
            No courses enrolled.
          </p>
        )}
      </div>

      {/* Remove Button */}
      <div className="flex justify-end max-w-5xl mx-auto w-full">
        <button
          onClick={() => setOpenRemoveDialog(true)}
          className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-xl shadow-md transition-all"
        >
          Remove {student.name}
        </button>
      </div>

      {/* Remove Confirmation Modal */}
      {openRemoveDialog && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg w-[90%] sm:w-[400px] p-5 relative">
            <X
              className="absolute top-3 right-3 text-gray-600 cursor-pointer hover:text-orange-500"
              onClick={() => setOpenRemoveDialog(false)}
            />
            <h2 className="text-center text-red-500 text-xl font-bold mb-3">
              Confirm Deletion
            </h2>
            <p className="text-center text-orange-700 mb-2">
              Enter your password to remove <b>{student.name}</b>
            </p>

            <div className="flex items-center justify-center gap-2 mb-4">
              <Lock className="text-orange-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-orange-200 rounded-md px-3 py-2 w-3/4 focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="Enter password"
              />
            </div>

            <button
              onClick={handleVerifyPassword}
              className="bg-orange-500 hover:bg-orange-400 w-full text-white py-2 rounded-lg font-semibold transition-all"
            >
              Verify & Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Component for Detail Rows
const Detail = ({ label, value }) => (
  <p className="text-lg font-semibold">
    {label}:{" "}
    <span className="text-orange-500 font-bold">
      {value || "-----"}
    </span>
  </p>
);

export default StudentProfile;
