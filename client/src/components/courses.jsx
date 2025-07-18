import { ArrowBigDown, ArrowDown, ArrowUp, Lock, SearchIcon, Star, X } from "lucide-react";
import img from '/1.jpg'
import { useEffect, useState } from "react";
import { useStore } from "../store";
import {toast} from 'react-toastify'
import axios from 'axios'
import { Api } from "../API";
const Courses = () => {
const coursesPresent = [
        "Artificial Intelligence",
        "Machine Learning",
        "Data Structures & Algorithms",
        "Python Programming",
        "JavaScript Essentials",
        "React.js",
        "Node.js",
        "MongoDB",
        "Express.js",
        "Next.js",
        "TypeScript",
        "HTML & CSS",
        "Tailwind CSS",
        "Git & GitHub",
        "REST API Development",
        "Socket.IO & Real-Time Apps",
        "React Native",
        "Flutter Development",
        "Docker",
        "Kubernetes",
        "AWS Cloud Fundamentals",
        "Google Cloud Platform",
        "DevOps with CI/CD",
        "Linux Essentials",
        "MySQL & PostgreSQL",
        "Firebase for Web & Mobile",
        "Natural Language Processing (NLP)",
        "Computer Vision",
        "Prompt Engineering",
        "Three.js & 3D Web",
        "Data Analysis with Pandas",
        "Matplotlib & Data Visualization",
        "OpenCV for Beginners",
        "Deep Learning",
        "Cybersecurity Fundamentals",
        "Operating Systems Concepts"
    ];

    const [visibleCount , setVisibleCount] = useState(5);
    const [openCnf , setOpenCnf] = useState({title:"" , state: false})
    const [password , setPassword] = useState('')
    const {userInfo} = useStore()
    const [searchItem , setSearchItem] = useState('')

    const handleViewMore = () => {
        if (visibleCount >= coursesPresent.length){
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

    const handleEnroll = (title) => {
        setOpenCnf({title: title , state:true})
    }

    const handleVerifyPassword = async(password) => {
        try {
            const response = await axios.post(Api + "/auth/validate-password" , {email : userInfo.email , password} , {withCredentials : true})
            if (response.data.success){
                toast.success("Sucessfully enrolled to : " + openCnf.title)
                setOpenCnf({title: '' , state: false})
                setPassword('')
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
                        {coursesPresent.map((course,index) => (
                            <div key={index} className={`${course.toLowerCase().includes(searchItem.toLowerCase()) ? "" : "hidden"} group relative w-[100%] rounded-xl bg-orange-200 sm:w-[370px] h-[300px] sm:h-[250px] shadow-md flex flex-col ${index > visibleCount && !searchItem ? "hidden" : "block"}`}>
                                <img src={img} alt="" className="rounded-t-xl h-[80%] w-full object-cover" />
                                <p className="text-center flex-1 flex items-center justify-center text-orange-800 font-bold text-xl capitalize">{course.length > 25 ? course.slice(0, 25) + "..." : course}</p>

                                <div className="absolute inset-0 bg-black/60 gap-5 rounded-xl flex flex-col  items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex text-white ">Rating : 4.5 <Star/></div>
                                    <button className="bg-white text-orange-600 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-orange-500 hover:text-white transition" onClick={() => handleEnroll(course)} >Enroll Now</button>
                                </div>
                            </div>

                        ))}
                    </div>
                    <div className={`flex gap-10 justify-evenly items-center  ${searchItem ? "hidden" : ""} `}>
                        <div className={`text-center cursor-pointer py-1 mx-auto rounded-xl flex items-center justify-center text-white animate-bounce w-[80%] bg-black/30 ${visibleCount >= coursesPresent.length - 1 ? "hidden" : ""} `} onClick={handleViewMore} >
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
            {openCnf.state && (<div className="fixed z-60  inset-0 bg-black/70 flex items-center justify-center ">
                <div className="w-[100%] relative sm:w-[80%] md:w-[50%] lg:w-[30%] bg-orange-200 rounded-lg flex flex-col gap-2 shadow-md h-[200px]  ">
                    <div className=" py-2 px-6 border-b-2 border-red-500">
                        <h2 className="text-red-500  text-xl font-bold uppercase text-center">Confirmation</h2>
                    </div>
                    <div className="flex flex-col items-center justify-center text-orange-800">
                        <h2 className="text-md">*Please enter your password to Enroll the course </h2><span className="font-bold text-xl ">{openCnf.title}</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="relative flex w-[50%] items-center justify-center">
                            <Lock className="absolute left-2  "/>
                            <input type="text" className="border w-full rounded-md px-10 h-10 outline-none bg-orange-100 " value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>

                    <button className="bg-orange-500 rounded-b-lg text-orange-100 h-10 hover:bg-orange-400" onClick={() => handleVerifyPassword(password)} >Verify</button>

                <div className="absolute top-3 right-3 text-orange-800 cursor-pointer" onClick={() => setOpenCnf({title: "" , state : false})} >
                    <X/>
                </div>
                </div>
            </div>)}

        </div>
    )
}

export default Courses ;