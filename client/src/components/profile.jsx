import { User } from 'lucide-react';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { userInfo } = useStore();
  const nav = useNavigate();

  if (!userInfo) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-orange-600 text-lg font-medium">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="w-full md:w-sm bg-gradient-to-br from-orange-100 to-orange-200 rounded-b-2xl border border-orange-300 shadow-lg p-6 flex flex-col items-center text-center gap-4">
      
      {/* Profile Image */}
      <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden border-4 border-orange-400 shadow-md bg-white">
        {!userInfo.profile ? (
          <div className="text-5xl w-full h-full flex items-center justify-center font-bold text-orange-700 uppercase bg-orange-50">
            {userInfo.name?.[0] || "U"}
          </div>
        ) : (
          <img
            src={
              typeof userInfo.profile === "string" && !userInfo.profile.startsWith("http")
                ? `data:image/png;base64,${userInfo.profile}`
                : userInfo.profile
            }
            alt="profile"
            className="object-cover w-full h-full"
          />
        )}
      </div>

      {/* Name */}
      <h2 className="text-2xl font-extrabold text-orange-800 uppercase tracking-wide">
        {userInfo.name}
      </h2>

      {/* Divider */}
      <div className="w-10 h-[3px] bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>

      {/* Email */}
      <p className="text-sm text-gray-700 font-medium mt-2 break-words">
        📧 <span className="text-orange-700">{userInfo.email}</span>
      </p>

      {/* Student ID */}
      <p className="text-sm text-gray-700 font-medium">
        🎓 Student ID:{" "}
        <span className="text-orange-600 font-semibold">
          {userInfo.studentId}
        </span>
      </p>

      {/* Button */}
      <button
        className="mt-4 w-[80%] px-4 py-2 text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
        onClick={() => nav('/complete-profile')}
      >
        {userInfo.fatherName && userInfo.schoolName
          ? "View Profile"
          : "Complete Profile"}
      </button>

      {/* Bottom accent */}
      <div className="w-full mt-2 border-t border-orange-300 pt-2 text-xs text-orange-700 italic">
        Keep learning and growing 🌱
      </div>
    </div>
  );
};

export default Profile;
