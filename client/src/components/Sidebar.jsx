import { ArrowLeft, Menu } from "lucide-react"
import { useState } from "react"

const Sidebar = () => {
    const [open , setOpen] = useState(false)
    return (
        <>
            <div className="sm:hidden border-2 border-orange-500 fixed top-2 left-2 z-150 bg-transparent text-orange-500  hover:bg-orange-500 hover:text-orange-200 rounded-lg flex items-center justify-center p-2   " onClick={() => setOpen((prev) => !prev)}>
                <button className="w-full h-full " ><Menu /></button>
            </div>
            <div className=" rounded-2xl top-1 shadow-xl bottom-1 left-1 w-[90%] sm:block hidden sm:w-[40%] md:w-[25%] lg:w-[20%] bg-orange-400 ">
                <ArrowLeft />
                side bar
            </div>
        </>
    )
}

export default Sidebar 
