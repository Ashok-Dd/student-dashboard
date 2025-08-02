import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Api } from "../API";
const AdminRegister = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const [cnfPassword , setCnfPassword] = useState('')
    const handleRegisterAdmin = async(e) => {
        e.preventDefault() ;
        if(cnfPassword !== password){
            toast.error("Password mismatched !");
            return ;
        }
        try {
            const response = await axios.post(Api + "/admin/register" , {name , email , password} , {withCredentials : true })
            if(response.data.success){
                toast.success(response.data.message);
            }
            else{
                toast.error(response.data.message);
            }
            setName('')
            setEmail('')
            setPassword('')
            setCnfPassword('')
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    return (
        <div className="w-full h-screen  bg-orange-100 overflow-y-auto flex items-center justify-center ">
            <form onSubmit={handleRegisterAdmin} className="w-full p-10 bg-orange-200 rounded-xl shadow-lg sm:w-[400px] flex flex-col gap-3  ">
                <div className="font-bold text-3xl text-orange-500 flex items-center justify-center p-4">Admin Register</div>
                <div className="flex flex-col gap-2   ">
                    <input type="text" className=" h-10 bg-orange-100  rounded-md shadow-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500" placeholder="Enter Admin's name " value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" autoComplete="new-email" className=" h-10 bg-orange-100 rounded-md shadow-md  p-2 focus:outline-none focus:ring-1 focus:ring-orange-500" placeholder="Enter Admin's email " value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" autoComplete="new-password" className=" h-10 bg-orange-100 rounded-md shadow-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500" placeholder="Password " value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" className=" h-10 bg-orange-100 rounded-md shadow-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500" placeholder="ConfirmPassword " value={cnfPassword} onChange={(e) => setCnfPassword(e.target.value)} />
                </div>
                <div className=" flex items-center justify-center bg-orange-500 hover:bg-orange-600  rounded-md shadow-lg mt-2">
                    <button className=" px-2 py-2  text-white ">Submit</button>
                </div>
                
                
            </form>
        </div>
    )
}

export default AdminRegister;
