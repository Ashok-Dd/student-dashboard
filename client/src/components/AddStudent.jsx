import axios from "axios";
import { Lock, User, User2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Api } from "../API";

const AddStudent = () => {
    const [name, setName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [branch, setBranch] = useState('');
    const [year, setYear] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnfPassword, setCnfPassword] = useState('');
    const [gender, setGender] = useState('');
    const nav = useNavigate();

    const handleRegister = async(e) => {
        e.preventDefault();
        if(password !== cnfPassword){
            toast.error('Passwords not matched !');
            return ;
        }
        try {
            const response = await axios.post(Api + "/admin/add-student" , {name , studentId , branch , year , gender , email , password} , {withCredentials : true});
            if(response.data.success){
                toast.success(response.data.message) 
                setName('');
                setEmail('')
                setPassword('')
                setCnfPassword('')
                setBranch('')
                setGender('')
                setStudentId('')
                setYear('')
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    };

    return (
        <div className="min-h-screen w-full flex justify-center py-10 items-center bg-orange-100 p-4">
            <form onSubmit={handleRegister} className="relative w-full max-w-md sm:max-w-[500px] bg-orange-100 rounded-xl shadow-2xl border-2 border-orange-500 px-6 py-8 pt-20">
                
                <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[100px] h-[100px] bg-orange-100 border-t-2 border-orange-500 rounded-full flex items-center justify-center">
                    <User2 className="w-[60%] h-[60%] text-orange-500" />
                </div>

                <h1 className="text-center text-orange-500 text-xl sm:text-2xl font-bold mb-6">REGISTER A NEW STUDENT</h1>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex w-full sm:w-[70%] rounded overflow-hidden bg-gray-100">
                            <div className="w-10 flex items-center justify-center text-orange-500">
                                <User />
                            </div>
                            <input type="text" placeholder="Enter your Name" className="flex-1 outline-none bg-gray-100 pl-2 text-orange-500 placeholder-orange-500 h-10" value={name}onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="flex w-full sm:w-[30%] rounded overflow-hidden bg-gray-100">
                            <div className="w-10 flex items-center justify-center text-orange-500">
                                <User />
                            </div>
                            <input type="text" placeholder="ID" className="flex-1 outline-none h-10 bg-gray-100 pl-2 text-orange-500 placeholder-orange-500" value={studentId}onChange={(e) => setStudentId(e.target.value)}/>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <select className="w-full sm:w-1/3 h-10 bg-gray-100 text-orange-500 px-4 rounded outline-none" value={year} onChange={(e) => setYear(e.target.value)}>
                            <option disabled selected> Select Year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                        </select>

                        <select className="w-full sm:w-1/3 h-10 bg-gray-100 text-orange-500 px-4 rounded outline-none" value={branch}onChange={(e) => setBranch(e.target.value)}>
                            <option disabled selected> Branch </option>
                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="MECH">MECH</option>
                            <option value="CIVIL">CIVIL</option>
                        </select>

                        <select className="w-full sm:w-1/3 h-10 bg-gray-100 text-orange-500 px-4 rounded outline-none" value={gender}onChange={(e) => setGender(e.target.value)}>
                            <option disabled selected>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Others</option>
                        </select>
                    </div>

                    <div className="flex w-full rounded overflow-hidden bg-gray-100 h-10">
                        <div className="w-10 flex items-center justify-center text-orange-500">
                            <User />
                        </div>
                        <input type="email" placeholder="Enter your Email" className="flex-1 outline-none bg-gray-100 pl-2 text-orange-500 placeholder-orange-500" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="flex w-full rounded overflow-hidden bg-gray-100 h-10">
                        <div className="w-10 flex items-center justify-center text-orange-500">
                            <Lock />
                        </div>
                        <input type="password" placeholder="Password" className="flex-1 outline-none bg-gray-100 pl-2 text-orange-500 placeholder-orange-500" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <div className="flex w-full rounded overflow-hidden bg-gray-100 h-10">
                        <div className="w-10 flex items-center justify-center text-orange-500">
                            <Lock />
                        </div>
                        <input type="password" placeholder="Confirm Password" className="flex-1 outline-none bg-gray-100 pl-2 text-orange-500 placeholder-orange-500" value={cnfPassword} onChange={(e) => setCnfPassword(e.target.value)} />
                    </div>

                    <button type="submit" className="w-full h-10 bg-orange-400 shadow-xl text-white text-xl uppercase rounded hover:bg-orange-500 hover:text-blue-100">Register</button>
                </div>
            </form>
        </div>
    );
};

export default AddStudent;
