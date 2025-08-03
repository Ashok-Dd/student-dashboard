import { KeyIcon, KeyRound, KeyRoundIcon, LocateFixedIcon, Lock, LockKeyhole, LockKeyholeIcon, LockKeyholeOpen, LogIn, Unlock, User, User2, UserCircle } from 'lucide-react'
import axios from 'axios'
import { Api } from '../API'
import { useStore } from '../store'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {toast} from  'react-toastify'

const ForgetPassword = () => {
    const [email , setEmail] = useState('')
    const [otp , setOtp] = useState('') ;
    const [userEnteredOtp , setUserEnteredOtp] = useState('')
    const [isVerified , setIsVerified] = useState(false) ;
    const { setUserInfo} = useStore()
    const [password , setPassword] = useState('') ;
    const [cnfPassword , setCnfPassword] = useState('');
    const nav = useNavigate()
    const sendMail = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(Api + '/auth/send-otp' , {email} , {withCredentials : true});
            if(response.data.success) {
                toast.success(response.data.message);
                setOtp(response.data.otp);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message) ;

        }
    }



    const verifyOtp = async(e) => {
        e.preventDefault() ;
        console.log(otp);

        if(userEnteredOtp === otp){
            setIsVerified(true)
            toast.success("OTP verified sucessfully ! ") ;
            return ;
        }
        toast.error("OTP WRONG ! ")
    }


    const handleChangePassword = async(e) => {
        e.preventDefault() ;
        try {
            const response = await axios.post(Api + '/auth/forget-password' , {password , email} , {withCredentials : true});
            if(response.data.success) {
                toast.success(response.data.message);
                setUserInfo(response.data.user) ;
                nav('/')
            }
            else{
                toast.error(response.data.message) ;
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong") ;
        }
    }



    return (
         <> 
             <div className="h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center" style={{ backgroundImage: "url('/bgimg4.jpg')" }}>
               {!otp && (<form onSubmit={sendMail}  className="container relative h-[280px] w-full sm:w-[50%] lg:w-[25%] flex flex-col border-2 border-orange-500 items-center justify-evenly rounded-xl shadow-xl  bg-orange-100 " >
                <div className=" absolute top-[-60px] logo w-[120px] h-[120px] bg-orange-100 rounded-full  border-t-2 border-orange-500 " >
                    <div className='w-full h-full  flex items-center justify-center text-orange-500'>
                        <KeyRoundIcon className='w-[50%] h-[50%]'/>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-[60px]">
                        <h1 className="text-orange-500 text-2xl font-bold uppercase">forget password</h1>
                </div>
                <div className="flex mt-0 flex-1 flex-col items-center justify-center text-xl w-full gap-7">
                    <div className='flex w-[90%] justify-center  h-10 '>
                        <div className='text-orange-500 rounded-l-lg bg-gray-100  flex items-center justify-center w-[15%]'>
                            <User />
                        </div>
                        <input type="email" autoComplete='new-email' placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)}  className="outline-none text-orange-500 rounded-r-lg bg-gray-100  "/>
                    </div>
                    
                </div>
                
                    
                <div className=' mb-10 w-[75%] h-10  ' >
                    <button className='w-full cursor-pointer bg-orange-500  shadow-xl h-full text-xl uppercase text-white hover:bg-orange-600  rounded-full ' type="submit">Send code</button>
                </div>
                 
               </form>)}
               
               {otp && !isVerified && (<form onSubmit={verifyOtp}  className="container relative h-[280px] w-full sm:w-[50%] lg:w-[25%] flex flex-col border-2 border-orange-500 items-center justify-evenly rounded-xl shadow-xl  bg-orange-100 " >
                <div className=" absolute top-[-60px] logo w-[120px] h-[120px] bg-orange-100 rounded-full  border-t-2 border-orange-500 " >
                    <div className='w-full h-full  flex items-center justify-center text-orange-500'>
                        <KeyRoundIcon className='w-[50%] h-[50%]'/>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-[60px]">
                        <h1 className="text-orange-500 text-2xl font-bold uppercase">Enter OTP</h1>
                </div>
                <div className="flex mt-0 flex-1 flex-col items-center justify-center text-xl w-full gap-7">
                    <div className='flex w-[90%] justify-center  h-10 '>
                        <div className='text-orange-500 rounded-l-lg bg-gray-100  flex items-center justify-center w-[15%]'>
                            <User />
                        </div>
                        <input type="number" placeholder='Enter OTP' value={userEnteredOtp} onChange={(e) => setUserEnteredOtp(e.target.value)}  className="outline-none text-orange-500 rounded-r-lg bg-gray-100  "/>
                    </div>
                </div>
                
                    
                <div className=' mb-10 w-[75%] h-10  ' >
                    <button className='w-full cursor-pointer bg-orange-500  shadow-xl h-full text-xl uppercase text-white hover:bg-orange-600  rounded-full ' type="submit">Verify</button>
                </div>
                 
               </form>)}

               {isVerified && (<form onSubmit={handleChangePassword}  className="container relative h-[350px] w-full sm:w-[50%] lg:w-[25%] flex flex-col border-2 border-orange-500 items-center justify-evenly rounded-xl shadow-xl  bg-orange-100 " >
                <div className=" absolute top-[-60px] logo w-[120px] h-[120px] bg-orange-100 rounded-full  border-t-2 border-orange-500 " >
                    <div className='w-full h-full  flex items-center justify-center text-orange-500'>
                        <KeyRoundIcon className='w-[50%] h-[50%]'/>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-[60px]">
                        <h1 className="text-orange-500 text-2xl font-bold uppercase">reset password</h1>
                </div>
                <div className='flex relative w-[90%] justify-center  h-10'>
                    <div className='text-orange-500 bg-gray-100 rounded-l-lg   flex items-center justify-center w-[15%]'>
                        <Lock />
                    </div>
                    <input type="password" autocomplete="new-password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className="outline-none text-orange-500 rounded-r-lg bg-gray-100 "/>
                </div> 
                
                <div className='flex relative w-[90%] justify-center  h-10'>
                    <div className='text-orange-500 bg-gray-100 rounded-l-lg   flex items-center justify-center w-[15%]'>
                        <Lock />
                    </div>
                    <input type="password" autocomplete="new-password" placeholder='Re-enter Password' value={cnfPassword} onChange={(e) => setCnfPassword(e.target.value)} className="outline-none text-orange-500 rounded-r-lg bg-gray-100 "/>
                </div>
                    
                <div className='mb-10 w-[75%] h-10  ' >
                    <button className='w-full cursor-pointer bg-orange-500  shadow-xl h-full text-xl uppercase text-white hover:bg-orange-600  rounded-full ' type="submit">Reset password</button>
                </div>
                 
               </form>)}
              
            </div>


         </>
    )
}

export default ForgetPassword 


