import { useEffect } from "react"
import { useStore } from "../store";
import Sidebar from "../components/Sidebar";
import { Api } from "../API";
import { toast } from "react-toastify";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../components/home";
import ContactUs from "../components/contactUs";
import AboutUs from "../components/aboutus";
import Courses from "../components/courses";
import CompleteProfile from "../components/completeProfile";

const Stucture = () => {
    const {userInfo , setUserInfo} = useStore()
    const nav = useNavigate();
    return (
        <>
            <div className="flex h-screen w-full bg-white flex p-0 gap-1 bg-gray-200">
                <Sidebar/>

                <div className="flex-1  bg-white rounded-2xl">
                    <div>
                        <Routes>
                            <Route path="/" element={<Home />}  />
                            <Route path="/contact-us" element={<ContactUs/>}  />
                            <Route path="/about-us" element={<AboutUs/>}  />
                            <Route path="/courses" element={<Courses/>}  />
                            <Route path="/complete-profile" element={<CompleteProfile />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Stucture 
