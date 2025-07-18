import { useEffect, useState } from "react";
import { useStore } from "../store";
import Profile from "./profile";
import img from '/5.jpg';
import { BookOpen, GraduationCap, UploadCloud, User, X } from "lucide-react";
import LeetCodeStats from "./leetcodeStats";
import LeaderBoard from "./Leaderboard";

const Home = () => {
  const { userInfo } = useStore();
  const [openProfile, setOpenProfile] = useState(false);
  const yourCourses = ['Artificial Intelligence' , 'Machine Learning' , 'Cyber Security' , 'Data Preprocessing & Data Mining'];
  


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Application submitted successfully!');
  };

  return (
    <div className="w-full h-screen relative overflow-y-auto bg-orange-50 px-4 pb-10">
      {/* Profile */}
      <div className="absolute top-4 right-4 w-12 h-12 rounded-full shadow-md bg-orange-200 cursor-pointer z-20" onClick={() => setOpenProfile(prev => !prev)}>
        {userInfo.profile ? (
          <img src={userInfo.profile} alt="Profile Icon" className="w-full h-full rounded-full" />) : (
            <div className="flex items-center justify-center w-full h-full font-bold text-xl capitalize">
                {userInfo.name ? userInfo.name[0] : <User />}
            </div>
        )}
      </div>

      <div className={`fixed top-0 right-0 w-full max-w-sm  bg-white rounded-xl shadow-lg transform transition-transform duration-300 z-50 ${openProfile ? "translate-x-0" : "translate-x-full"}`}>
        <Profile />
      </div>
      {openProfile && (
        <div className='absolute top-4 right-4 text-orange-500 cursor-pointer z-60' onClick={() => setOpenProfile(prev => !prev)}>
          <X />
        </div>
      )}

     

      <div className="text-center my-15 sm:my-10 space-y-3">
        <p className="text-2xl sm:text-5xl font-bold text-orange-800">Welcome, <span className="text-orange-500 text-3xl sm:text-5xl capitalize">{userInfo.name}</span></p>
        <p className="text-sm text-gray-600">Track your progress and grow with consistency!</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
        <div className="w-full md:w-1/3 h-[150px] bg-green-200 hover:bg-green-300 transition rounded-xl shadow-md flex flex-col justify-center items-center cursor-pointer">
          <BookOpen size={32} className="text-green-700 mb-2" />
          <span className="text-lg font-semibold text-green-800">Courses</span>
        </div>
        <div className="w-full md:w-1/3 h-[150px] bg-yellow-200 hover:bg-yellow-300 transition rounded-xl shadow-md flex flex-col justify-center items-center cursor-pointer">
          <GraduationCap size={32} className="text-yellow-700 mb-2" />
          <span className="text-lg font-semibold text-yellow-800">Academic Status</span>
        </div>
        <div className="w-full md:w-1/3 h-[150px] bg-blue-200 hover:bg-blue-300 transition rounded-xl shadow-md flex flex-col justify-center items-center cursor-pointer">
          <UploadCloud size={32} className="text-blue-700 mb-2" />
          <span className="text-lg font-semibold text-blue-800">Upload Resume</span>
        </div>
      </div>

     <div className="flex flex-col lg:flex-row lg:items-start gap-6 mt-10">
        <div className="flex-1 bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-bold text-orange-800 mb-3">Your Courses</h2>
          <div className="space-y-3">
            {yourCourses.length > 0 ? yourCourses.map((course, index) => (
              <div key={index} className="bg-orange-100 p-3 rounded-md shadow text-center font-semibold text-orange-700">
                {course}
              </div>
            )) : (
              <p className="text-gray-500">No courses enrolled yet.</p>
            )}
          </div>
        </div>

        <div className="w-full lg:w-[350px]">
          <LeaderBoard />
        </div>
      </div>

      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-orange-800 mb-4 text-center">Your LeetCode Stats</h2>
        <div className="bg-white rounded-xl shadow-md p-4">
          <LeetCodeStats />
        </div>
      </div>
    </div>
  );
};

export default Home;
