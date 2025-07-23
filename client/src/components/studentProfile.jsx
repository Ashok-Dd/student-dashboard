// StudentProfile.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Api } from "../API";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentId = searchParams.get("id");
  const [openPersonal , setOpenPersonal] = useState(true) ;
  const [courses , setCourses] = useState([])

  const getStudent = async () => {
    try {
      const response = await axios.get(`${Api}/profile/get-student/${studentId}`);
      if (response.data.success) {
        setStudent(response.data.student);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCourses = async() => {
    try {
        const response = await axios.post(Api + '/course/get-all-courses-of-student' , {studentId} , {withCredentials : true})
        if(response.data.success) {
            setCourses(response.data.courses)
        }
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getCourses()
  } , [studentId])


  useEffect(() => {
    if (studentId) getStudent();
  }, [studentId]);

  
    const getCourseStatus = (startDate, endDate) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const start = new Date(startDate);
        const end = new Date(endDate);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        if (today < start) return "Not Started";
        if (today >= start && today <= end) return "Ongoing";
        return "Ended";
    };


  if (!student) return <div className="text-center mt-10 text-xl text-gray-600">Loading...</div>;

  return (
    <div className="w-full h-screen flex flex-col gap-5 p-2 overflow-y-auto bg-orange-100">
        <p className="text-orange-800 text-3xl text-center font-bold"><span className="capitalize text-orange-500 font-bold text-4xl">{student.name}'s</span> Profile</p>
      {/* Profile Card */}
      <div className="flex sm:flex-row flex-col p-5 relative bg-orange-200 gap-7 items-center sm:m-5 mt-4 rounded-lg shadow-xl">
      

      <div htmlFor="avatar" className="cursor-pointer  rounded-full w-40 h-40 border border-orange-500  shadow-lg overflow-hidden bg-orange-100 flex items-center justify-center">
        {!student.profile ? (<div className="text-5xl sm:text-7xl font-bold text-orange-800 uppercase">{student.name?.[0] || "U"}</div>
        ) : (<img src={typeof student.profile === "string" && !student.profile.startsWith("http")? `data:image/png;base64,${student.profile}`: student.profile} alt="profile" className="object-cover rounded-full w-full h-full"/>)}
      </div>

      

      <div className="flex flex-col bg-orange-100 rounded-lg gap-2 justify-center shadow-xl w-full flex-1 px-5 py-5">
        <span className="text-orange-800 capitalize text-2xl sm:text-4xl font-bold">{student.name}</span>
        <span className="text-orange-800 text-sm sm:text-xl">Email: <span className="text-orange-500">{student.email}</span></span>
        <span className="text-orange-800 text-sm sm:text-xl">Student ID: <span className="text-orange-500">{student.studentId}</span></span>
      </div>

      </div>


      <div className="w-[90%] mx-auto flex flex-col gap-4 bg-orange-200 rounded-lg shadow-lg flex-1 p-4">
        <div className="flex items-center justify-center">
          <button className={`w-[50%] text-lg sm:text-xl cursor-pointer m-1 rounded-lg px-4 py-2 ${openPersonal ? 'bg-orange-300 text-white' : 'bg-orange-100 text-orange-800'}`} onClick={() => setOpenPersonal(true)}>Personal Details</button>
          <button className={`w-[50%] text-lg sm:text-xl cursor-pointer m-1 rounded-lg px-4 py-2 ${openPersonal ? 'bg-orange-100 text-orange-800' : 'bg-orange-300 text-white'}`} onClick={() => setOpenPersonal(false)}>Academic Details</button>
        </div>

        {openPersonal ? (
            <div className="text center flex flex-col sm:items-center justify-center h-full gap-7">
                <p className="text-orange-800 text-xl font-bold">Father name : <span className="text-orange-500 font-bold sm:text-xl">{student.fatherName || ' ----- '}</span></p>
                <p className="text-orange-800 text-xl font-bold">Mother name : <span className="text-orange-500 font-bold sm:text-xl">{student.motherName || ' ----- '}</span></p>
                <p className="text-orange-800 text-xl font-bold">Phone Number : <span className="text-orange-500 font-bold sm:text-xl">{student.phNo || ' ----- '}</span></p>
                <p className="text-orange-800 text-xl font-bold">Parent phone number : <span className="text-orange-500 font-bold sm:text-xl">{student?.parentPhNo || ' ----- ' }</span></p>
                <p className="text-orange-800 text-xl font-bold">Address : <span className="text-orange-500 font-bold sm:text-xl">{student.address || ' ----- '}</span></p>
            </div>
        ) : (
            <div className="text center flex flex-col sm:items-center justify-center h-full gap-7">
                <p className="text-orange-800 text-xl font-bold">School name : <span className="text-orange-500 capitalize font-bold sm:text-xl">{student.schoolName || ' ----- '}</span></p>
                <p className="text-orange-800 text-xl font-bold">Intermediate : <span className="text-orange-500 capitalize font-bold sm:text-xl">{student.intermediate || ' ----- '}</span></p>
                <p className="text-orange-800 text-xl font-bold">BTech : <span className="text-orange-500 font-bold capitalize sm:text-xl">{student.btech || ' ----- '}</span></p>
                <p className="text-orange-800 text-xl font-bold">Leetcode username : <span className="text-orange-500 font-bold sm:text-xl">{student?.leetcodeUid || ' ----- '}</span></p>
                <p className="text-orange-800 text-xl font-bold">GitHub username : <span className="text-orange-500 font-bold sm:text-xl">{student?.githubUid || ' ----- '}</span></p>
            </div>
        )}
      </div>

        <div className="flex items-center flex-col  p-2 bg-orange-200 gap-5 rounded-xl shadow-xl">
            <h1 className="text-2xl font-bold text-orange-800 text-center"><span className="text-2xl capitalize text-orange-500 font-bold">{student.name}'s</span> enrolled courses</h1>

            <div className="flex flex-col gap-5 flex-1">
                <div className="w-full  flex flex-col flex-1 ">
                    <div className="flex justify-evenly flex-wrap space-y-5 flex-1 mb-0 px-4 ">
                        {courses.map((course,index) => {
                            const status = getCourseStatus(course.startDate, course.endDate);
                            return(
                                <div key={index} className={`relative w-[100%] rounded-xl bg-orange-100 sm:w-[370px] h-[320px] sm:h-[350px] shadow-md flex flex-col `}>
                                    <img src={typeof course.poster === "string" && !course.poster.startsWith("http")? `data:image/png;base64,${course.poster}`: course.poster} alt="" className="rounded-t-xl h-[250px] w-full object-cover" />
                                    <p className="text-center  flex items-center justify-center text-orange-800 font-bold text-xl capitalize">{course.title.length > 25 ? course.title.slice(0, 25) + "..." : course.title}</p>
                                    <p className="text-center text-orange-800">Instructor :<span className="text-orange-500"> {course.instructor}</span></p>
                                    <p className="text-orange-800 text-center">From : <span className="text-orange-500">{new Date(course.startDate).toLocaleDateString("en-GB")}</span>  To : <span className="text-orange-500">{new Date(course.endDate).toLocaleDateString("en-GB")}</span></p>
                                    <p className="text-center text-sm font-semibold text-orange-700">Status: <span className={`font-bold ${status === 'Ended' ? 'text-red-500' : status === 'Ongoing' ? 'text-green-600' : 'text-blue-500'} `}>{status}</span></p>
                                </div>
                        )})}
                        {
                            courses.length == 0 && (
                                <div className="text-xl font-semibold italic ">
                                        No courses are enrolled by <span className="text-orange-500 font-bold">{student.name}</span>
                                </div>
                            )
                        }
                    </div>
                    
                </div>
            </div>





        </div>



    </div>
  );
};

export default StudentProfile;
