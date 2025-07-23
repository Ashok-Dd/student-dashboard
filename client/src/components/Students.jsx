import axios from "axios";
import { useEffect, useState } from "react";
import { Api } from "../API";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

const Students = () => {

    const [students , setStudents] = useState([])
    const nav = useNavigate()
    const getAllStudents = async() => {
        try {
            const response = await axios.get(Api + "/students/all-students")
            if(response.data.success){
                setStudents(response.data.students)
            }
        } catch (error) {
            console.log(error);
        }
    }
 

    useEffect(() => {
        getAllStudents()
    } , [])

    return (
        <div className="w-full h-screen flex items-center  flex-col gap-10 overflow-y-auto bg-orange-100">
            <button className="absolute top-5 right-5 cursor-pointer bg-green-500 hover:bg-green-400 py-2 px-3 rounded-xl shadow-xl text-white" onClick={() => nav('/add-student')}><span className="hidden sm:block" >Register a student </span><span className="sm:hidden"><UserPlus/></span></button>
            <span className="text-orange-800 text-4xl font-bold uppercase mt-10">Students </span>
            <table className="sm:w-[90%] text-center  ">
                <tr className="bg-orange-500 text-white  ">
                    <th className="py-2">Student ID</th>
                    <th className="py-2">Student Name</th>
                    <th className="py-2">Year</th>
                    <th className="py-2">Gender</th>
                    <th>Profile</th>
                </tr>
                {students.map((student) => (
                    <tr className="bg-orange-200 text-orange-800  ">
                        <td className="py-2 capitalize font-bold ">{student.studentId}</td>
                        <td className="py-2 capitalize font-bold ">{student.name}</td>
                        <td className="py-2 capitalize font-bold ">{student.year}</td>
                        <td className="py-2 capitalize font-bold ">{student.gender}</td>
                        <td><button className=" cursor-pointer hover:bg-orange-400 py-1 rounded-lg px-3 bg-orange-500 text-white shadow-lg m-1 " onClick={() => nav(`/student-profile?id=${student.studentId}`)}>View profile</button></td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Students ;