import { useState } from 'react';
import img from '/4.jpg';
import { useStore } from '../store';
import { Edit } from 'lucide-react';

const CompleteProfile = () => {
  const { userInfo } = useStore();
  const [openPersonal, setOpenPersonal] = useState(true);

  return (
    <div className="w-full h-screen flex flex-col gap-5 p-2 overflow-y-auto bg-orange-100">
      {/* Profile Card */}
      <div className="flex p-5 relative mt-15 bg-orange-200 gap-7 items-center sm:m-5 rounded-lg shadow-xl">
        <div className="absolute top-7 right-7 rounded-sm p-1 hover:bg-orange-200 cursor-pointer">
          <Edit />
        </div>
        <div className=" w-26 h-26 sm:w-42 border border-orange-500 rounded-lg shadow-lg sm:h-42">
            {!userInfo.profile ? (<div className=' flex items-center h-full text-8xl font-bold bg-orange-100 rounded-lg text-orange-800 justify-center'>{userInfo.name[0]}</div>) : (<><img src={userInfo.profile} alt="" className="object-cover rounded-lg w-full h-full" /></>)}
          
        </div>
        <div className="flex flex-col bg-orange-100 rounded-lg gap-2 justify-center shadow-xl flex-1 px-5 py-2">
          <span className="text-orange-800 capitalize text-2xl sm:text-4xl font-bold ">{userInfo.name}</span>
          <span className="text-orange-800 text-sm sm:text-xl">
            Email : <span className="text-orange-500  ">{userInfo.email}</span>
          </span>
          <span className="text-orange-800 sm:text-xl text-sm">
            Student ID : <span className="text-orange-500">{userInfo.studentId}</span>
          </span>
        </div>
      </div>

      <div className="w-[90%] mx-auto flex flex-col gap-4 bg-orange-200 rounded-lg shadow-lg flex-1 p-4">
        <div className="flex items-center justify-center">
          <button
            className={`w-[50%] text-xl cursor-pointer m-1 rounded-lg px-4 py-2 ${
              openPersonal ? 'bg-orange-300 text-white' : 'bg-orange-100 text-orange-800'
            }`}
            onClick={() => setOpenPersonal(true)}
          >
            Personal Details
          </button>
          <button
            className={`w-[50%] text-xl cursor-pointer m-1 rounded-lg px-4 py-2 ${
              openPersonal ? 'bg-orange-100 text-orange-800' : 'bg-orange-300 text-white'
            }`}
            onClick={() => setOpenPersonal(false)}
          >
            Academic Details
          </button>
        </div>

        {/* Form Grid */}
        {openPersonal ? (
          <div className="flex flex-wrap gap-4">
            {[
              
              ['Father Name', 'fatherName'],
              ['Mother Name', 'motherName'],
              ['Phone Number', 'phoneNumber'],
              ['Parent Phone Number', 'parentPhoneNumber'],
              ['Address', 'address'],
            ].map(([label, name]) => (
              <div key={name} className="flex flex-col w-full items-center ">
                <input
                  type="text"
                  name={name}
                  placeholder={`Enter ${label} ${label === "Parent Phone Number" ? "(Optional)" : ""}`} 
                  className="px-4 py-2 rounded-lg shadow-sm outline-none bg-orange-50 w-[85%] sm:w-[60%] border border-orange-300"
                />
              </div>
            ))}
            <div className="w-full flex justify-center  mt-2">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all">
                Save Personal Info
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4   ">
            {[
              ['School Name', 'schoolName'],
              ['Intermediate College Name', 'interCollege'],
              ['B.Tech College Name', 'btechCollege'],
              ['LeetCode Username', 'leetcodeUsername'],
              ['GitHub Profile', 'github'],
            ].map(([label, name]) => (
              <div key={name} className="flex flex-col w-full items-center ">
                <input
                  type="text"
                  name={name}
                  placeholder={`Enter ${label}`}
                  className="px-4 py-2 rounded-lg shadow-sm w-[85%] sm:w-[60%] outline-none bg-orange-50 border border-orange-300"
                />
              </div>
            ))}
            <div className="w-full flex justify-center mt-2">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all">
                Save Academic Info
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteProfile;
