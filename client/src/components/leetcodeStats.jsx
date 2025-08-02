import axios from "axios";
import { useState, useMemo } from "react";
import { Api } from "../API";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Search } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useStore } from "../store";
import {toast} from 'react-toastify' ;
const LeetCodeStats = () => {
  const {userInfo , setUserInfo} = useStore()
  const [userId, setUserId] = useState('');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const getLeetCodeStats = async (username) => {
    try {
      const res = await axios.post(Api + "/auth/get-leetcode-profile", { username });
      return res.data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong !")
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId.trim()) {
        setProfile(null)
        setNotFound(false)
        return ;
    }

    setLoading(true);
    setProfile(null);
    setNotFound(false);

    const info = await getLeetCodeStats(userId.trim());
    if (info && info.username) {
      setProfile(info);
    } else {
      setNotFound(true);
    }

    setLoading(false);
    setUserId('')
    
  };

  const getPercentage = (solved, total) => {
    if (total === 0) return 0;
    return ((solved / total) * 100).toFixed(1);
  };

  return (
    <div className="w-full flex flex-col h-auto justify-center items-center">
      <form onSubmit={handleSubmit} className="flex w-full md:w-full items-center justify-center mb-6">
        <input type="text" className="px-2 bg-orange-100 flex-1 rounded-l-md outline-none h-10 text-sm" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Enter Leetcode username..."/>
        <button type="submit" className="bg-orange-500 text-white rounded-r-md px-3 h-10 flex items-center justify-center"><Search /></button>
      </form>

      {loading && (
        <div className="flex items-center justify-center text-orange-600 font-medium gap-2">
          <Loader2 className="animate-spin" /> Fetching profile...
        </div>
      )}

      {notFound && !loading && (
        <div className="text-red-600 font-semibold mt-4">No user found with this username.</div>
      )}

      {profile && (
        <div className="w-full md:w-[450px] h-auto flex flex-col rounded-xl shadow-md bg-orange-100 p-4">
          <div className="flex items-center gap-3 mb-3">
            <img src={profile.avatar} alt="avatar" className="w-10 h-10 rounded-full border-2 border-orange-400" />
            <div className="font-bold text-lg text-orange-800">LeetCode Profile: <span className="text-orange-500">{profile.username}</span></div>
          </div>

          <div className="flex-1 flex items-center justify-evenly gap-4 flex-wrap">
            {["easy", "medium", "hard"].map((level) => (
              <div key={level} className="w-[28%] h-[120px] min-w-[100px] hover:shadow-lg flex flex-col items-center gap-2 bg-orange-200 rounded-md shadow">
                <div className="text-sm font-semibold text-orange-700 capitalize">{level}</div>
                <CircularProgressbar value={getPercentage(profile[level].solved, profile[level].total)} text={`${getPercentage(profile[level].solved, profile[level].total)}%`}
                  styles={buildStyles({
                    textColor: "#92400e",
                    pathColor:
                      level === "easy"
                        ? "#98ef0cff"
                        : level === "medium"
                        ? "#facc15"
                        : "#f87171",
                    trailColor: "#a7aba5ff",
                  })}/>
                <div className="text-xs">{profile[level].solved} / {profile[level].total}</div>
              </div>
            ))}
          </div>



          <div className="mt-4 font-bold text-center flex flex-col text-orange-800">
            <div>Total Solved:{" "}<span className="text-orange-500">{profile.easy.solved + profile.medium.solved + profile.hard.solved} /{" "}{profile.easy.total + profile.medium.total + profile.hard.total}</span></div>
            <div>Rank: <span className="text-orange-500">{profile.rank}</span></div>
          </div>

        </div>
      )}
      
    </div>
  );
};

export default LeetCodeStats;
