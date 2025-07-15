import { Lock, LogIn, User, User2, UserCircle } from 'lucide-react'
import axios from 'axios'
import { Api } from '../API'
import { useStore } from '../store'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {toast} from 'react-toastify'

const Login = () => {
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
            const response = await axios.post(Api + '/auth/login' , {email , password} , {withCredentials : true});
            if(response.data.success) {
                const data = response.data ;
                setUserInfo(data)
                console.log(userInfo)
                toast.success(data.message)
                nav('/home')
                
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
             <div className="h-screen flex-col w-full bg-gray-100 flex justify-center gap-10 items-center">
               <form onSubmit={handleLogin} className="container relative h-[45%] w-full sm:w-[50%] lg:w-[25%] flex flex-col border-2 border-orange-500 items-center justify-evenly rounded-xl shadow-xl  bg-orange-100 " >
                <div className=" absolute top-[-60px] logo w-[120px] h-[120px] bg-orange-100 rounded-full  border-t-2 border-orange-500 " >
                    <div className='w-full h-full  flex items-center justify-center text-orange-500'>
                        <User2 className='w-[70%] h-[70%]'/>
                    </div>
                </div>
                <div className="flex mt-10 flex-1 flex-col items-center justify-center text-xl  w-full gap-12 ">
                    <div className='flex w-[90%]  justify-center  h-10 '>
                        <div className='text-orange-500 rounded-l-lg bg-gray-100  flex items-center justify-center w-[15%]'>
                            <User />
                        </div>
                        <input type="email" placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)}  className="outline-none rounded-r-lg bg-gray-100  "/>
                    </div>
                    <div className='flex w-[90%] justify-center  h-10'>
                        <div className='text-orange-500 bg-gray-100 rounded-l-lg   flex items-center justify-center w-[15%]'>
                            <Lock />
                        </div>
                        <input type="password"  placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className="outline-none rounded-r-lg   bg-gray-100 "/>
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

export default Login 


