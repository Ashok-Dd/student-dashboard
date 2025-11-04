import { Lock, User, User2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Api } from '../API';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useStore } from '../store';


const Signup = () => {
    const [name , setName] = useState('');
    const [studentId , setStudentId] = useState('');
    const [branch , setBranch] = useState('');
    const [year , setYear] = useState('')
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [cnfPassword , setCnfPassword] = useState('');
    const [gender , setGender] = useState('')
    const nav = useNavigate()

    const {userInfo , setUserInfo} = useStore()
    
    const handleRegister = async(e) => {
        e.preventDefault()
        if(password !== cnfPassword){
            toast.error("Password mismatched !")
            return;
        }
        try {
            const response = await axios.post(Api + '/auth/register' , { name , studentId , year , branch ,email , password ,gender } , {withCredentials : true})
            console.log(response);
            if(response.data.success) {
                const data = response.data
                setUserInfo(data) 
                console.log(userInfo);
                toast.success(data.message)
                window.location.reload()
                nav('/')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
            console.log(error);
            
        }
    }

    return (
        <>
            <div className="h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center" style={{ backgroundImage: "url('/bgimg4.jpg')" }}>
                <form onSubmit={handleRegister} className="container border-2 border-orange-500 relative h-[500px] sm:h-[72%] w-full sm:w-[50%] lg:w-[40%] flex flex-col gap-3 items-center justify-evenly rounded-xl shadow-2xl bg-orange-100">
                    <div className="absolute top-[-65px] logo w-[120px] h-[120px] border-t-2 border-orange-500 bg-orange-100 rounded-full">
                        <div className='w-full h-full flex items-center justify-center text-orange-500'>
                            <User2 className='w-[55%] h-[55%]' />
                        </div>
                    </div>
                    <div className="w-full flex justify-center mt-[50px]">
                        <h1 className="text-orange-500 text-2xl font-bold ">REGISTER</h1>
                    </div>
                    <div className="flex flex-1 flex-col pl-5 pr-5 text-xl w-full gap-6 mt-4">
                        <div className="flex w-full gap-4 h-10">
                            <div className="flex w-[70%] rounded overflow-hidden bg-gray-100">
                                <div className="w-10 flex items-center justify-center text-orange-500">
                                    <User />
                                </div>
                                <input type="text" placeholder="Enter your Name" className="flex-1 outline-none bg-gray-100 pl-2 text-orange-500 placeholder-orange-500" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="flex w-[30%] rounded overflow-hidden bg-gray-100">
                                <div className="w-10 flex items-center justify-center text-orange-500">
                                    <User />
                                </div>
                                <input type="text"placeholder="ID"className="flex-1 outline-none bg-gray-100 pl-2 text-orange-500 placeholder-orange-500" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex w-full gap-4 h-10">
                            <div className="w-[33%]">
                                <select className="w-full h-full bg-gray-100 text-orange-500 px-4 rounded outline-none" value={year}  onChange={(e) => setYear(e.target.value)}>
                                    <option value ="" selected> Select Year</option>
                                    <option value="1" >1st Year</option>
                                    <option value="2" >2nd Year</option>
                                    <option value="3" >3rd Year</option>
                                    <option value="4" >4th Year</option>
                                </select>
                            </div>
                        <div className="w-[33%]">
                                <select className="w-full h-full bg-gray-100 text-orange-500 px-4 rounded outline-none " value={branch} onChange={(e) => setBranch(e.target.value)} >
                                    <option value = " " selected>Branch</option>
                                    <option value="CSE">CSE</option>
                                    <option value="IT">IT</option>
                                    <option value="CSD">CSD</option>
                                    <option value="ECE">ECE</option>
                                    <option value="EEE">EEE</option>
                                    <option value="MECH">MECH</option>
                                    <option value="CIVIL">CIVIL</option>
                                </select>
                        </div>
                        <div className="w-[33%]">
                                <select className="w-full h-full bg-gray-100 text-orange-500 px-4 rounded outline-none " value={gender} onChange={(e) => setGender(e.target.value)} >
                                    <option value=" " selected>Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Others</option>
                                </select>
                        </div>
                        </div>
                        <div className="flex w-[100%] rounded flex justify-center items-center overflow-hidden bg-gray-100 h-10">
                            <div className="w-10 flex items-center justify-center text-orange-500">
                                <User />
                            </div>
                            <input type="email" autoComplete="new-email" placeholder="Enter your Email" className="flex-1 outline-none bg-gray-100 pl-2 text-orange-500 placeholder-orange-500" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="flex w-[100%] rounded overflow-hidden bg-gray-100 h-10">
                            <div className="w-10 flex items-center justify-center text-orange-500">
                                <Lock />
                            </div>
                            <input type="password" autoComplete='new-password' placeholder="Password" className="flex-1 outline-none bg-gray-100 pl-2 text-orange-500 placeholder-orange-500" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="flex w-[100%] rounded overflow-hidden bg-gray-100 h-10">
                            <div className="w-10 flex items-center justify-center text-orange-500">
                                <Lock />
                            </div>
                            <input type="password"placeholder="Confirm Password"className="flex-1 outline-none bg-gray-100 pl-2 text-orange-500 placeholder-orange-500" value={cnfPassword} onChange={(e) => setCnfPassword(e.target.value)} />
                        </div>
                    </div>
                     <div className='mb-4 w-[93%] h-10  '>
                        <button type="submit" className='w-full cursor-pointer bg-orange-400 shadow-xl h-full text-xl uppercase text-white hover:bg-orange-500 rounded hover:text-blue-100 '>Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup