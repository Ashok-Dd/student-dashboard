import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import { ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../API";
import { toast } from "react-toastify";



const COLORS = ["#f97316", "#34d399", "#60a5fa"]; // Orange, Green, Blue


const AnalyticsDashboard = () => {
  const [selectedYear, setSelectedYear] = useState("1st");
  const [courseData , setCourseData] = useState([]);
  const [yearData , setYearData] = useState([]);
  const [genderStatus , setGenderStatus] = useState({})
  const [branchYearWiseData , setBranchYearWiseData] = useState({});




  const getCourseData = async() => {
    try {
      const response = await axios.get(Api + '/course/get-students-course-status')
        if(response.data.success){
          setCourseData(response.data.courseAndStudentsEnrolled)
        }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const getYearData = async() => {
    try {
      const response = await axios.get(Api + "/auth/get-year-data");
      if(response.data.success){
        setYearData(response.data.yearData)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getGenderStatus = async() => {
    try {
      const response = await axios.get(Api + '/auth/get-gender-status');
      if(response.data.success){
        setGenderStatus(response.data.genderStatus)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getyearwiseBranchCount = async() => {
    try {
      const response = await axios.get(Api + "/students/get-year-wise-branch-count" );
      if(response.data.success) {
        setBranchYearWiseData(response.data.obj)
      }
    } catch (error) {
      toast.error(error.message)      
    }
  }


  useEffect(() => {
    getCourseData()
    getYearData()
    getGenderStatus()
    getyearwiseBranchCount()
  } , [])

  const genderData = [
  { name: "Male", value: genderStatus.male },
  { name: "Female", value: genderStatus.female },
  { name: "Others", value: genderStatus.others }
];

  return (
    <div className="w-full h-screen overflow-y-auto bg-orange-50 sm:p-10">
      <h1 className="text-2xlsm:text-4xl font-bold text-orange-700 mb-8 text-center  mt-15 sm:mt-0">Student Analytics Dashboard</h1>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">

        {/* Courses vs Students Bar Chart */}
        <div className="bg-white w-full shadow-xl rounded-2xl p-4 md:p-6 border-t-4 border-orange-400">
          <h2 className="text-xl font-semibold text-orange-600 mb-4">Courses vs Enrollments</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="students" fill="#fb923c" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Year-wise Student Count Line Chart */}
        <div className="bg-white w-full shadow-xl rounded-2xl p-4 md:p-6 border-t-4 border-orange-400">
          <h2 className="text-xl font-semibold text-orange-600 mb-4">Year-wise Student Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={yearData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#fb923c" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gender Ratio Pie Chart */}
        <div className="bg-white w-full shadow-xl rounded-2xl p-4 md:p-6 border-t-4 border-orange-400 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-orange-600 mb-4 text-center">Gender Ratio</h2>
          <div className="w-full h-[300px] md:w-[60%]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Year-wise Branch vs Students */}
        <div className="bg-white w-full shadow-xl rounded-2xl p-4 md:p-6 border-t-4 border-orange-400">
          <h2 className="text-xl font-semibold text-orange-600 mb-4 text-center">Branch-wise Distribution ({selectedYear} Year)</h2>

          {/* Year Selection Buttons */}
          <div className="flex justify-center gap-4 mb-4">
            {["1st", "2nd", "3rd", "4th"].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-full border ${
                  selectedYear === year ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-600"
                } hover:bg-orange-400 hover:text-white`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Graph */}
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={branchYearWiseData[selectedYear]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="branch" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#fb923c" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
