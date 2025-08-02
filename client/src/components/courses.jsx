import { ArrowDown, ArrowUp, Lock, SearchIcon , X } from "lucide-react";
import img from '/1.jpg'
import { useEffect, useState } from "react";
import { useStore } from "../store";
import {toast} from 'react-toastify'
import axios from 'axios'
import { Api } from "../API";
const Courses = () => {


    const [courses , setCourses] = useState([])


    const [visibleCount , setVisibleCount] = useState(5);
    const [openCnf1 , setOpenCnf1] = useState({title:"" , state: false})
    const [openCnf2 , setOpenCnf2] = useState({title:"" , state: false})
    const [password , setPassword] = useState('')
    const {userInfo} = useStore()
    const [searchItem , setSearchItem] = useState('')

    const getCourses = async() => {
        try {
            const response = await axios.get(Api + '/course/get-all-courses');
            if(response.data.success){
                setCourses(response.data.courses)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {     
    getCourses()
    } , [])

    const handleViewMore = () => {
        if (visibleCount >= courses.length){
            return
        }
        setVisibleCount((prev) => prev + 6)
    }

    const handleViewLess = () => {
        if(visibleCount < 6) {
            return ;
        }
        setVisibleCount((prev) => prev - 6)
    }

    const handleEnroll = (course) => {
        setOpenCnf1({course: course , state:true})
    }

    const handleRemove = (course) => {
        setOpenCnf2({course: course , state:true})
    }

    const handleVerifyPassword = async(password) => {
        try {
            const response = await axios.post(Api + "/auth/validate-password" , {email : userInfo.email , password} , {withCredentials : true})
            if (response.data.success){
                try {
                    const enrolmentResponse = await axios.post(Api + "/course/enroll-student" , {courseId : openCnf1.course._id} , {withCredentials:true});
                    if(enrolmentResponse.data.success){
                        toast.success("Sucessfully enrolled to : " + openCnf1.course.title)
                    }
                    else{
                        toast.error(enrolmentResponse.data.message)
                    }
                    setOpenCnf1({title: '' , state: false})
                    setPassword('')

                } catch (error) {
                    console.log(error);
                    toast.error(error.message)
                }
            }
            else{
                toast.error(response.data.message);
                setPassword('')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const handleRemoveCourse = async(password) => {
        try {
            const response = await axios.post(Api + "/auth/validate-password" , {email : userInfo.email , password} , {withCredentials : true})
            if (response.data.success){
                try {
                    const removeResponse = await axios.post(Api + "/course/remove" , {courseId : openCnf2.course._id} , {withCredentials:true});
                    if(removeResponse.data.success){
                        toast.success("Sucessfully Removed  : " + openCnf2.course.title)
                        getCourses()
                    }
                    else{
                        toast.error(removeResponse.data.message)
                    }
                    setOpenCnf2({title: '' , state: false})
                    setPassword('')

                } catch (error) {
                    console.log(error);
                    toast.error(error.message)
                }
            }
            else{
                toast.error(response.data.message);
                setPassword('')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

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


    return (
        <div className="bg-orange-100 flex flex-col gap-10 w-full h-screen overflow-y-auto">
           <div className="w-full text-center  mt-8 text-4xl sm:text-5xl  font-bold text-orange-800 ">
                <span>Courses</span>
           </div>
            <div>
                <div className="flex justify-center items-center  w-full ">
                    <div className="flex items-center h-10 w-[75%] lg:w-[50%]  rounded-lg justify-center shadow-lg">
                        <input type="text" className=" outline-none rounded-l-lg flex-1 h-full bg-orange-200 px-2  " placeholder="Search Courses ...." value={searchItem}  onChange={(e) => setSearchItem(e.target.value)} />
                        <button className="cursor-pointer rounded-r-lg h-full flex items-center justify-center w-[15%] sm:w-[7%] bg-orange-500 text-white"><SearchIcon/></button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5 flex-1">
                <div className="w-full  flex flex-col flex-1 ">
                    <div className="flex justify-evenly flex-wrap space-y-5 flex-1 mb-0 px-4 ">
                        {courses.map((course,index) => {
                            const status = getCourseStatus(course.startDate, course.endDate);
                            return(
                                <div key={index} className={`${course.title.toLowerCase().includes(searchItem.toLowerCase()) ? "" : "hidden"} group relative w-[100%] rounded-xl bg-orange-200 sm:w-[370px] h-[320px] sm:h-[350px] shadow-md flex flex-col ${index > visibleCount && !searchItem ? "hidden" : "block"}`}>
                                    <img src={typeof course.poster === "string" && !course.poster.startsWith("http")? `data:image/png;base64,${course.poster}`: course.poster} alt="" className="rounded-t-xl h-[250px] w-full object-cover" />
                                    <p className="text-center  flex items-center justify-center text-orange-800 font-bold text-xl capitalize">{course.title.length > 25 ? course.title.slice(0, 25) + "..." : course.title}</p>
                                    <p className="text-center text-orange-800">Instructor :<span className="text-orange-500"> {course.instructor}</span></p>
                                    <p className="text-orange-800 text-center">From : <span className="text-orange-500">{new Date(course.startDate).toLocaleDateString("en-GB")}</span>  To : <span className="text-orange-500">{new Date(course.endDate).toLocaleDateString("en-GB")}</span></p>
                                    <p className="text-center text-sm font-semibold text-orange-700">Status: <span className={`font-bold ${status === 'Ended' ? 'text-red-500' : status === 'Ongoing' ? 'text-green-600' : 'text-blue-500'} `}>{status}</span>
                                        </p>
                                    <div className="absolute inset-0 bg-black/60 gap-5 rounded-xl flex flex-col  items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button className={`bg-white text-orange-600 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-orange-500 hover:text-white transition ${userInfo.isAdmin ? "" : "hidden"} `} onClick={() => handleRemove(course)} >Remove course</button>
                                        <button className={`bg-white text-orange-600 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-orange-500 hover:text-white transition ${userInfo.isAdmin ? "hidden" : ""} `} onClick={() => handleEnroll(course)} >Enroll Now</button>
                                    </div>
                                </div>

                            )})}
                    </div>
                    <div className={`flex gap-10 justify-evenly items-center  ${searchItem ? "hidden" : ""} `}>
                        <div className={`text-center cursor-pointer py-1 mx-auto rounded-xl flex items-center justify-center text-white animate-bounce w-[80%] bg-black/30 ${visibleCount >= courses.length - 1 ? "hidden" : ""} `} onClick={handleViewMore} >
                            <button className="cursor-pointer">View more</button>
                            <ArrowDown/>
                        </div>

                        <div className={`text-center cursor-pointer py-1 mx-auto rounded-xl flex items-center justify-center text-white animate-bounce w-[80%] bg-black/30 ${visibleCount == 5 ? "hidden" : ""} `} onClick={handleViewLess} >
                            <button className="cursor-pointer">View Less</button>
                            <ArrowUp/>
                        </div>

                    </div>
                </div>
            </div>
            {openCnf1.state && (
                <div className="fixed z-60  inset-0 bg-black/70 flex items-center justify-center ">
                <div className="w-[100%] relative sm:w-[80%] md:w-[50%] lg:w-[30%] bg-orange-200 rounded-lg flex flex-col gap-4 shadow-md h-[200px]  ">
                    <div className=" py-2 px-6 border-b-2 border-red-500">
                        <h2 className="text-red-500  text-xl font-bold uppercase text-center">Confirmation</h2>
                    </div>
                    <div className="flex flex-col items-center justify-center text-orange-800">
                        <h2 className="text-md">*Please enter your password to Enroll the course </h2><span className="font-bold text-xl ">{openCnf1.title}</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="relative flex w-[50%] items-center justify-center">
                            <Lock className="absolute left-2  "/>
                            <input type="password" className="border w-full rounded-md px-10 h-10 outline-none bg-orange-100 " value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>

                    <button className="bg-orange-500 rounded-b-lg text-orange-100 h-10 hover:bg-orange-400 bottom-0" onClick={() => handleVerifyPassword(password)} >Verify</button>

                <div className="absolute top-3 right-3 text-orange-800 cursor-pointer" onClick={() => setOpenCnf1({title: "" , state : false})} >
                    <X/>
                </div>
                </div>
            </div>)}

            {openCnf2.state && (<div className="fixed z-60  inset-0 bg-black/70 flex items-center justify-center ">
                <div className="w-[100%] relative sm:w-[80%] md:w-[50%] lg:w-[30%] bg-orange-200 rounded-lg flex flex-col gap-4 shadow-md h-[200px]  ">
                    <div className=" py-2 px-6 border-b-2 border-red-500">
                        <h2 className="text-red-500  text-xl font-bold uppercase text-center">Confirmation</h2>
                    </div>
                    <div className="flex flex-col items-center justify-center text-orange-800">
                        <h2 className="text-md">*Please enter your password to Remove the course </h2><span className="font-bold text-xl ">{openCnf2.course.title}</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="relative flex w-[50%] items-center justify-center">
                            <Lock className="absolute left-2  "/>
                            <input type="password" className="border w-full rounded-md px-10 h-10 outline-none bg-orange-100 " value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>

                    <button className="bg-orange-500 rounded-b-lg text-orange-100 h-10 hover:bg-orange-400 bottom-0" onClick={() => handleRemoveCourse(password)} >Verify</button>

                <div className="absolute top-3 right-3 text-orange-800 cursor-pointer" onClick={() => setOpenCnf2({title: "" , state : false})} >
                    <X/>
                </div>
                </div>
            </div>)}

        </div>
    )
}

export default Courses ;