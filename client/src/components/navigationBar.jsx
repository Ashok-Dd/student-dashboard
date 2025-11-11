import { useState } from "react";
import img1 from "/logo.png";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();

  return (
    <>
      <nav className="relative shadow-md w-full bg-gradient-to-r from-white/90 via-orange-50/80 to-white/90 backdrop-blur-lg sm:border-b sm:border-orange-300 z-50">
        <div className="flex items-center justify-between px-4 sm:px-8 h-20">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 text-xl sm:text-3xl text-orange-500 font-serif">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-md border border-orange-300">
              <img src={img1} alt="logo" className="w-full h-full object-cover" />
            </div>
            <span>Student Dashboard</span>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden sm:flex gap-6 text-orange-700 uppercase font-medium">
            <button
              onClick={() => nav("/login")}
              className="relative px-3 py-2 hover:text-orange-500 transition-all group"
            >
              Login
              <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full transform -translate-x-1/2"></span>
            </button>
            <button
              onClick={() => nav("/register")}
              className="relative px-3 py-2 hover:text-orange-500 transition-all group"
            >
              Register
              <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full transform -translate-x-1/2"></span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden text-orange-500 hover:text-orange-600 transition-all duration-300"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`sm:hidden bg-gradient-to-r from-white/90 via-orange-50/80 to-white/90 backdrop-blur-lg w-full overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className=" border-b border-orange-300 flex flex-col items-center py-3 gap-3 ">
            <button
              onClick={() => {
                nav("/login");
                setIsOpen(false);
              }}
              className="w-[90%] py-2 rounded-md bg-orange-500 text-white  tracking-wide hover:bg-orange-600 transition-all duration-300"
            >
              Login
            </button>
            <button
              onClick={() => {
                nav("/register");
                setIsOpen(false);
              }}
              className="w-[90%] py-2 rounded-md bg-orange-500 text-white  tracking-wide hover:bg-orange-600 transition-all duration-300"
            >
              Register
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
