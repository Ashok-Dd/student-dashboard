import { useEffect, useState } from 'react';
import img1 from '/1.jpg'
import {Menu} from "lucide-react"
import { useNavigate } from 'react-router-dom';
const NavBar = () => {
    const [isopen , setIsopen]= useState(false)
    const nav = useNavigate()
    return (
        <>
        <div className="relative max-w-[100%] shadow-md mx-auto  h-20 flex bg-white  items-center p-1 ">
            <div className="text-orange-400 title flex items-center gap-2 sm:gap-5 ml-1 sm:ml-3 text-xl sm:text-3xl font-serif flex ">
                <div className="logo w-12 h-12 sm:w-15 sm:h-15 flex items-center justify-center rounded-full overflow-none  object-cover">
                    <img src={img1} alt="" className=" w-[100%] h-[100%] rounded-full"/>
                </div>
                <span>Student Dashboard</span>
            </div>
            <div className="flex justify-end  items-center flex-1  mr-[2%] hidden sm:flex">
                <button  className="relative px-4 py-3 text-orange-500 uppercase hover:text-yellow-500 hover:border-yellow-500 transition-colors duration-300 group" onClick={() => nav('/login')}><span className='absolute left-1/2 bottom-0 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full transform -translate-x-1/2'></span>login</button>
                <button  className="relative px-4 py-3 text-orange-500 uppercase hover:text-yellow-500 hover:border-yellow-500 transition-colors duration-300 group" onClick={() => nav('/register')}><span className='absolute left-1/2 bottom-0 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full transform -translate-x-1/2'></span>register</button>
            </div>
            <div className='sm:hidden flex justify-end flex-1 p-2 text-orange-400 '>
            <button className='rounded-full w-8 h-8  mr-2 flex items-center justify-center hover:bg-orange-400 hover:text-white  transition-all duration-300 ease-in-out ' onClick={() => setIsopen((prev) => !prev)}><Menu/></button>
            </div>
            {isopen && (
                <div className='sm:hidden'>
                    <div className="border flex flex-col z-50 border-orange-400 rounded-xl w-[60%] bg-orange-300 absolute top-3/4 right-0">
                        <button className='hover:bg-orange-500 bg-gray-100 text-orange-400 hover:text-white rounded-xl m-1 p-1 uppercase'  onClick={() => nav('/login')}>Login</button>
                        <button className='hover:bg-orange-500 bg-gray-100 text-orange-400 hover:text-white rounded-xl m-1 p-1 uppercase' onClick={() => nav('/register')}>Signup</button>
                    </div>
                </div>

            )}
        </div>
        </>
    )
}

export default NavBar ;