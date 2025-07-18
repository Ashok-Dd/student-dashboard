import { User, X } from 'lucide-react';
import { useStore } from '../store';
import img from '/5.jpg';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { userInfo } = useStore();
    const nav = useNavigate()

    if (!userInfo) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-orange-600 text-lg font-medium">Loading profile...</div>
        );
    }

    return (
            <div className=" w-[100%] md:w-sm bg-orange-200 rounded-b-xl border border-orange-200 shadow-lg p-6 flex flex-col items-center text-center gap-4">
                
                <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-orange-400 shadow-sm">
                    {userInfo.profile ? (<><img src={userInfo.profile} alt="Profile" className="w-full h-full object-cover" /></>) : (<div className='w-full h-full flex items-center justify-center text-5xl font-bold bg-orange-100 capitalize'>{userInfo.name ? userInfo.name[0] : <User/>}</div>)}
                </div>

                <h2 className="text-xl font-semibold text-orange-800 uppercase">{userInfo.name}</h2>

                <p className="text-sm text-orange-700">{userInfo.email}</p>

                <p className="text-sm text-orange-700 font-medium">Student ID: <span className="text-orange-600">{userInfo.studentId}</span></p>

                <button className="mt-3 px-4 py-2 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-400 transition" onClick={() => nav('/complete-profile')}>Complete Profile</button>
            </div>
    );
};

export default Profile;
