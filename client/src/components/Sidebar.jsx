import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useStore } from "../store";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Api } from "../API";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [openPopup , setOpenPopup] = useState(false) ;

  const {userInfo , setUserInfo} = useStore()
const nav = useNavigate()
  const menuItems = ["Profile", "Courses", "About", "Contact Us"];

   const handleLogout = async() => {

        try {
            const response = await axios.post(Api + "/auth/logout" , {} , {withCredentials : true}) 
            if(response.data.success){
                setUserInfo(undefined)
                toast.success(response.data.message)
                nav('/')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button className="text-orange-500 hover:bg-orange-500 hover:text-white p-2 rounded-lg border border-orange-500 transition-colors duration-300" onClick={() => setOpen(!open)} >{open ? <X /> : <Menu />}</button>
      </div>


      <div className={`fixed top-0 bottom-0 left-0 z-40 bg-orange-100 shadow-xl rounded-r-2xl px-6 py-10 flex flex-col justify-between transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:rounded-r-2xl w-[80%] sm:w-[60%] md:w-[28%] lg:w-[18%]`}>
        
        <div className="text-center">
          <h2 className="text-orange-600 text-2xl font-bold mb-10">Eduportal</h2>
          <div className="space-y-1 flex flex-col text-orange-600 font-medium">
              <Link to={'/'} className="cursor-pointer text-lg px-4 py-2 rounded-md hover:bg-orange-200 hover:text-orange-500 transition-colors duration-300" onClick={() => setOpen(false)}> Dashboard </Link>
              <Link to={'/contact-us'} className="cursor-pointer text-lg px-4 py-2 rounded-md hover:bg-orange-200 hover:text-orange-500 transition-colors duration-300" onClick={() => setOpen(false)}> Contact Us </Link>
              <Link to={'/about-us'} className="cursor-pointer text-lg px-4 py-2 rounded-md hover:bg-orange-200 hover:text-orange-500 transition-colors duration-300" onClick={() => setOpen(false)}> About us </Link>
              <Link to={'/courses'} className="cursor-pointer text-lg px-4 py-2 rounded-md hover:bg-orange-200 hover:text-orange-500 transition-colors duration-300" onClick={() => setOpen(false)}> Courses </Link>
          </div>
        </div>
        <button className="flex items-center justify-center gap-2 p-3 rounded-lg bg-orange-500 text-white hover:bg-orange-600 w-full transition-all duration-300" onClick={() => setOpenPopup((prev) => !prev)}><LogOut size={20} />Logout </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/30 md:hidden z-30" onClick={() => setOpen(false)}/>
      )}

      {openPopup && (
          <>
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
              <div className="w-full max-w-md rounded-xl shadow-2xl bg-white overflow-hidden animate-fade-in">
                <div className=" py-4 px-6 border-b-2 border-red-500">
                  <h2 className="text-red-500  text-xl font-bold uppercase text-center">Confirmation</h2>
                </div>
                <div className="p-6 text-center">
                  <p className="text-lg text-gray-700 font-medium italic">Are you sure you want to logout?</p>
                </div>
                <div className="flex divide-x ">
                  <button className="w-1/2 py-3 bg-green-400 hover:bg-green-500 text-white font-semibold transition-all duration-200" onClick={() => setOpenPopup(false)}>Cancel</button>
                  <button className="w-1/2 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-200"onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </div>
          </>
        )}


    </>
  );
};

export default Sidebar;
