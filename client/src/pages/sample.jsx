import { Lock, User, User2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {


    const [name , setName] = useState('')
    const [studentId , setStudentId] = useState('');
    const [branch , setBranch] = useState('');
    const [year , setYear] = useState('')
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [cnfPassword , setCnfPassword] = useState('');
    const [gender , setGender] = useState('')
    const nav = useNavigate()



    const handleRegister = (e) => {
        e.preventDefault()

    }
    return(
        <>
            <div className="h-screen border w-full flex flex-col justify-center items-center bg-orange-100">
                <form onSubmit={handleRegister} className=" border-2 border-orange-500 relative h-[500px] sm:h-[72%] sm:w-[500px]  flex flex-col gap-3 items-center justify-evenly rounded-xl shadow-2xl bg-orange-100">
                    <div className="absolute top-[-65px] logo w-[120px] h-[120px] border-t-2 border-orange-500 bg-orange-100 rounded-full">
                        <div className='w-full  h-full flex items-center justify-center text-orange-500'>
                            <User2 className='w-[55%] h-[55%]' />
                        </div>
                    </div>
                    <div className="w-full flex justify-center mt-[50px]">
                        <h1 className="text-orange-500 text-2xl font-bold ">REGISTER A NEW STUDENT</h1>
                    </div>
                    <div className="flex flex-1  flex-col pl-5 pr-5 text-xl w-full gap-6 mt-4">
                        <div className="flex w-full border gap-4 h-10">
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
                                    <option disabled selected> Select Year</option>
                                    <option value="1" >1st Year</option>
                                    <option value="2" >2nd Year</option>
                                    <option value="3" >3rd Year</option>
                                    <option value="4" >4th Year</option>
                                </select>
                            </div>
                        <div className="w-[33%]">
                                <select className="w-full h-full bg-gray-100 text-orange-500 px-4 rounded outline-none " value={branch} onChange={(e) => setBranch(e.target.value)} >
                                    <option disabled selected>Branch</option>
                                    <option value="CSE">CSE</option>
                                    <option value="ECE">ECE</option>
                                    <option value="MECH">MECH</option>
                                    <option value="CIVIL">CIVIL</option>
                                </select>
                        </div>
                        <div className="w-[33%]">
                                <select className="w-full h-full bg-gray-100 text-orange-500 px-4 rounded outline-none " value={gender} onChange={(e) => setGender(e.target.value)} >
                                    <option disabled selected>Gender</option>
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
                            <input type="email"placeholder="Enter your Email" className="flex-1 outline-none bg-gray-100 pl-2 text-orange-500 placeholder-orange-500" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="flex w-[100%] rounded overflow-hidden bg-gray-100 h-10">
                            <div className="w-10 flex items-center justify-center text-orange-500">
                                <Lock />
                            </div>
                            <input type="password" placeholder="Password" className="flex-1 outline-none bg-gray-100 pl-2 text-orange-500 placeholder-orange-500" value={password} onChange={(e) => setPassword(e.target.value)} />
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

export default AddStudent ;