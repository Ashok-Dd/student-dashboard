import { ArrowLeft, Lock, User, UserCog } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { toast } from "react-toastify";
import axios from "axios";
import { Api } from "../API";

const AdminLogin = () => {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const {userInfo , setUserInfo} = useStore()
    const nav = useNavigate()
     const handleLogin = async(e) => {
        e.preventDefault()
        if (!email || !password) {
            toast.error("Please fill all feilds ...")
            return;
        }
        try {
            const response = await axios.post(Api + '/admin/login' , {email , password} , {withCredentials : true});
            if(response.data.success) {
                const data = response.data ;
                setUserInfo(data)
                console.log(userInfo)
                toast.success(data.message)
                nav('/students')
                
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "Something went wrong");
                console.log(error.response.data);
            } else {
                toast.error("Network error! Please try again.");
                toast.error(error?.message || "Internal Issue")
            }
        }
    }


    return (
        <>
 <div className="h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center" style={{ backgroundImage: "url('/bgimg4.jpg')" }}>
                <div className="absolute top-4 left-4 text-orange-800" >
                    <button className="cursor-pointer" onClick={() => nav('/login')}><ArrowLeft /></button>
                </div>
               <form onSubmit={handleLogin} className="container relative h-[350px] w-full sm:w-[50%] lg:w-[25%] flex flex-col border-2 border-orange-500 items-center justify-evenly rounded-xl shadow-xl  bg-orange-100 " >
                <div className=" absolute top-[-60px] logo w-[120px] h-[120px] bg-orange-100 rounded-full  border-t-2 border-orange-500 " >
                    <div className='w-full h-full  flex items-center justify-center text-orange-500'>
                        <UserCog className='w-[70%] h-[70%]'/>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-[60px]">
                        <h1 className="text-orange-500 text-2xl font-bold uppercase">Admin login</h1>
                </div>
                <div className="flex mt-0 flex-1 flex-col items-center justify-center text-xl w-full gap-7">
                    <div className='flex w-[90%] justify-center  h-10 '>
                        <div className='text-orange-500 rounded-l-lg bg-gray-100  flex items-center justify-center w-[15%]'>
                            <User />
                        </div>
                        <input type="email" autoComplete="new-email" placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)}  className="outline-none text-orange-500 rounded-r-lg bg-gray-100  "/>
                    </div>
                    <div className='flex w-[90%] justify-center  h-10'>
                        <div className='text-orange-500 bg-gray-100 rounded-l-lg   flex items-center justify-center w-[15%]'>
                            <Lock />
                        </div>
                        <input type="password" autoComplete="new-password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className="outline-none text-orange-500 rounded-r-lg bg-gray-100 "/>
                    </div> 
                </div>
                
                    
                <div className=' mb-10 w-[75%] h-10  ' >
                    <button className='w-full cursor-pointer bg-orange-500  shadow-xl h-full text-xl uppercase text-white hover:bg-orange-600  rounded-full ' type="submit">submit</button>
                </div>
                 
               </form>

               
               
              
            </div>
        </>
    )
}

export default AdminLogin ;