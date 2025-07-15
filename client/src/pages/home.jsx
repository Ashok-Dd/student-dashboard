import { useEffect } from "react"
import { useStore } from "../store";
import Sidebar from "../components/Sidebar";
import { Api } from "../API";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const {userInfo , setUserInfo} = useStore()
    const nav = useNavigate()
    const handleLogout = async() => {
        try {
            const response = await axios.post(Api + "/auth/logout" , {} , {withCredentials : true}) 
            if(response.data.success){
                setUserInfo(undefined)
                toast.success(response.data.message)
                nav('/login')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <div className="flex h-screen w-full bg-orange-100 flex p-1 gap-1 bg-gray-200 ">
                <Sidebar/>
                <div className="flex-1 bg-orange-200 rounded-2xl">
                    <h1 className="text-3xl text-center">Home page ....</h1>
                <button className="bg-red-500 p-2 rounded-xl shadow-2xl m-10 hover:bg-red-400 cursor-pointer " onClick={handleLogout} >Logout</button>
                </div>
            </div>
        </>
    )
}

export default Home 
