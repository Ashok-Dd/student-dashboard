import axios from "axios";
import { useEffect, useState } from "react";
import { Api } from "../API";
import { useNavigate } from "react-router-dom";
import { UserPlus, Search, Loader2, Filter, SearchX } from "lucide-react";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("All");
  const [branchFilter, setBranchFilter] = useState("All");
  const nav = useNavigate();

  const getAllStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(Api + "/students/all-students");
      if (response.data.success) {
        setStudents(response.data.students);
        setFiltered(response.data.students);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  // 🧠 Filtering Logic
  useEffect(() => {
    let result = [...students];

    // Search Filter
    if (searchTerm) {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.studentId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Year Filter
    if (yearFilter !== "All") {
      result = result.filter((s) => s.year === yearFilter);
    }

    // Branch Filter
    if (branchFilter !== "All") {
      result = result.filter((s) => s.branch?.toLowerCase() === branchFilter.toLowerCase());
    }

    setFiltered(result);
  }, [students, searchTerm, yearFilter, branchFilter]);

  return (
    <div className="min-h-screen overflow-y-auto flex flex-col items-center bg-orange-50 relative py-10 px-4 sm:px-8">
      {/* Header */}
      <div className="flex flex-row justify-between items-center w-full max-w-5xl mb-8 gap-4">
        <div></div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-700 drop-shadow-md">
          Students
        </h1>

        <button
          className="flex items-center gap-2 bg-green-500 hover:bg-green-400 px-4 py-2 rounded-xl shadow-lg text-white font-medium transition-all duration-200"
          onClick={() => nav("/add-student")}
        >
          <UserPlus size={20} />
          <span className="hidden sm:block">Register Student</span>
        </button>
      </div>

      {/* 🔍 Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-4xl mb-8">
        {/* Search */}
        <div className="flex items-center w-full sm:flex-1 bg-white rounded-xl shadow-md px-3 py-2 border border-orange-200">
          <Search className="text-orange-400 mx-2" />
          <input
            type="text"
            placeholder="Search by name or student ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none text-orange-800 placeholder:text-orange-300 py-1 bg-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Year Filter */}
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-3 py-2 border border-orange-200 rounded-lg bg-white text-orange-700 shadow-sm hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
          >
            <option value="All">All Years</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>

          {/* Branch Filter */}
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="px-3 py-2 border border-orange-200 rounded-lg bg-white text-orange-700 shadow-sm hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
          >
            <option value="All">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
          </select>
        </div>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex items-center justify-center mt-20">
          <Loader2 className="animate-spin text-orange-500" size={40} />
          <span className="ml-3 text-orange-600 font-medium">
            Loading students...
          </span>
        </div>
      )}

      {/* Empty State */}
{!loading && filtered.length === 0 && (
  <div className="flex flex-col items-center justify-center mt-20 text-center">
    <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-2xl shadow-md p-8 w-[90%] sm:w-[400px]">
      <div className="flex items-center justify-center mb-5">
        <SearchX className="text-orange-500 w-16 h-16 drop-shadow-sm" />
      </div>

      <h2 className="text-2xl font-bold text-orange-700 mb-2">
        No Students Found
      </h2>

      <p className="text-orange-600 text-sm mb-4">
        We couldn’t find any students matching your search or filters.
      </p>

      <button
        onClick={() => setSearchTerm("")}
        className="bg-orange-500 hover:bg-orange-400 text-white font-medium px-5 py-2 rounded-lg shadow-md transition-all duration-200"
      >
        Clear Filters
      </button>
    </div>
  </div>
)}

      {/* 🖥️ Table for Desktop */}
      {!loading && filtered.length > 0 && (
        <div className="hidden sm:block w-full max-w-5xl overflow-x-auto shadow-lg rounded-xl border border-orange-200 bg-white">
          <table className="w-full text-center">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="py-3">Student ID</th>
                <th className="py-3">Name</th>
                <th className="py-3">Year</th>
                <th className="py-3">Branch</th>
                <th className="py-3">Gender</th>
                <th className="py-3">Profile</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr
                  key={student.studentId}
                  className="border-b border-orange-100 hover:bg-orange-50 transition-all duration-150"
                >
                  <td className="py-3 font-semibold text-orange-700">
                    {student.studentId}
                  </td>
                  <td className="py-3 capitalize text-orange-800 font-medium">
                    {student.name}
                  </td>
                  <td className="py-3 text-orange-600">{student.year}</td>
                  <td className="py-3 text-orange-600">{student.branch}</td>
                  <td className="py-3 text-orange-600">{student.gender}</td>
                  <td className="py-3">
                    <button
                      onClick={() =>
                        nav(`/student-profile?id=${student.studentId}`)
                      }
                      className="bg-orange-500 hover:bg-orange-400 text-white px-4 py-1.5 rounded-lg shadow-md transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 📱 Card View for Mobile */}
      {!loading && filtered.length > 0 && (
        <div className="sm:hidden w-full flex flex-col gap-5 px-3 mt-5">
          {filtered.map((student) => (
            <div
              key={student.studentId}
              className="relative bg-gradient-to-br from-orange-50 via-white to-orange-100 border border-orange-200 rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02]"
            >
              {/* Decorative top bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-yellow-400" />

              <div className="p-5 flex flex-col gap-3">
                {/* Name + Year */}
                <div className="flex justify-between items-center">
                  <h2 className="text-orange-800 text-lg font-semibold capitalize tracking-wide">
                    {student.name}
                  </h2>
                  <span className="bg-gradient-to-r from-orange-200 to-orange-300 text-orange-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                    {student.year}
                  </span>
                </div>

                {/* Student Info */}
                <div className="space-y-1">
                  <p className="text-sm text-orange-600">
                    <span className="font-semibold text-orange-800">ID:</span>{" "}
                    {student.studentId}
                  </p>
                  <p className="text-sm text-orange-600">
                    <span className="font-semibold text-orange-800">
                      Branch:
                    </span>{" "}
                    {student.branch}
                  </p>
                  <p className="text-sm text-orange-600">
                    <span className="font-semibold text-orange-800">
                      Gender:
                    </span>{" "}
                    {student.gender}
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-orange-200 mt-2"></div>

                {/* Action Button */}
                <button
                  onClick={() => nav(`/student-profile?id=${student.studentId}`)}
                  className="mt-3 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2.5 rounded-xl shadow-md transition-all duration-300 active:scale-[0.98]"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Students;
