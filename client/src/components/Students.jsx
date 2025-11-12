import axios from "axios";
import { useEffect, useState } from "react";
import { Api } from "../API";
import { useNavigate } from "react-router-dom";
import { UserPlus, Search, Loader2 } from "lucide-react";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredData = students.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.studentId.toLowerCase().includes(term)
    );
    setFiltered(filteredData);
  };

  return (
    <div className="h-screen overflow-y-auto flex flex-col items-center bg-orange-50 relative py-10 px-4 sm:px-8">
      {/* Header and Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-5xl mb-8 gap-4">
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

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-3xl bg-white rounded-xl shadow-md px-3 py-2 border border-orange-200 mb-6">
        <Search className="text-orange-400 mx-2" />
        <input
          type="text"
          placeholder="Search by name or student ID..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full outline-none text-orange-800 placeholder:text-orange-300 py-1 bg-transparent"
        />
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
        <div className="text-center mt-20 text-orange-500">
          <img
            src="https://illustrations.popsy.co/violet/no-data.svg"
            alt="No data"
            className="w-52 mx-auto mb-4"
          />
          <p className="text-lg font-medium">No students found!</p>
        </div>
      )}

      {/* Table for Desktop */}
      {!loading && filtered.length > 0 && (
        <div className="hidden sm:block w-full max-w-5xl overflow-x-auto shadow-lg rounded-xl border border-orange-200 bg-white">
          <table className="w-full text-center">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="py-3">Student ID</th>
                <th className="py-3">Name</th>
                <th className="py-3">Year</th>
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

      {/* Card View for Mobile */}
      {!loading && filtered.length > 0 && (
        <div className="sm:hidden w-full flex flex-col gap-4 px-2 mt-4">
          {filtered.map((student) => (
            <div
              key={student.studentId}
              className="bg-white rounded-2xl shadow-md border border-orange-200 p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-orange-700 font-semibold capitalize">
                  {student.name}
                </h2>
                <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-md text-sm">
                  {student.year}
                </span>
              </div>
              <p className="text-orange-500 text-sm mb-1">
                ID: <span className="font-semibold">{student.studentId}</span>
              </p>
              <p className="text-orange-500 text-sm mb-3">
                Gender: <span className="font-semibold">{student.gender}</span>
              </p>
              <button
                onClick={() => nav(`/student-profile?id=${student.studentId}`)}
                className="w-full bg-orange-500 hover:bg-orange-400 text-white py-2 rounded-xl shadow-md transition"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Students;
