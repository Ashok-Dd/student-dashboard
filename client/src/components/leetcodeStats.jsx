import axios from "axios";
import { useState } from "react";
import { Api } from "../API";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Search, Loader2 } from "lucide-react";
import { useStore } from "../store";
import { toast } from "react-toastify";

const LeetCodeStats = () => {
  const { setUserInfo } = useStore();
  const [userId, setUserId] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const getLeetCodeStats = async (username) => {
    try {
      const res = await axios.post(Api + "/auth/get-leetcode-profile", { username });
      return res.data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong!");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId.trim()) {
      setProfile(null);
      setNotFound(false);
      return;
    }

    setLoading(true);
    setProfile(null);
    setNotFound(false);

    const info = await getLeetCodeStats(userId.trim());
    if (info && info.username) setProfile(info);
    else setNotFound(true);

    setLoading(false);
    setUserId("");
  };

  const getPercentage = (solved, total) => {
    if (total === 0) return 0;
    return ((solved / total) * 100).toFixed(1);
  };

  return (
    <div className="w-full flex flex-col h-auto justify-center items-center px-4">
      {/* Search Input */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full md:w-[400px] items-center justify-center mb-6 rounded-full shadow-md bg-white overflow-hidden border border-orange-300"
      >
        <input
          type="text"
          className="px-3 bg-transparent flex-1 outline-none h-11 text-sm text-orange-800 placeholder-orange-400"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter Leetcode username..."
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 h-11 flex items-center justify-center transition-all hover:scale-105"
        >
          <Search size={18} />
        </button>
      </form>

      {/* Loader */}
      {loading && (
        <div className="flex items-center justify-center text-orange-600 font-medium gap-2 animate-pulse">
          <Loader2 className="animate-spin" /> Fetching your profile...
        </div>
      )}

      {/* Not Found */}
      {notFound && !loading && (
        <div className="text-red-600 font-semibold mt-4">
          ❌ No user found with this username.
        </div>
      )}

      {/* Stats Card */}
      {profile && (
        <div className="w-full md:w-[480px] bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-lg p-6 backdrop-blur-md border border-orange-200 relative overflow-hidden transition-all hover:shadow-xl">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-300/10 to-transparent pointer-events-none"></div>

          {/* Header */}
          <div className="flex items-center gap-4 mb-5">
            <img
              src={profile.avatar}
              alt="avatar"
              className="w-14 h-14 rounded-full border-2 border-orange-500 shadow-sm"
            />
            <div>
              <h3 className="text-lg font-bold text-orange-800">
                @{profile.username}
              </h3>
              <p className="text-sm text-gray-500">LeetCode Profile</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {["easy", "medium", "hard"].map((level) => (
              <div
                key={level}
                className="bg-white/80 w-[90%] sm:w-[30%] backdrop-blur-lg shadow-md rounded-xl flex flex-col items-center justify-center py-3 hover:scale-105 transition-all duration-300 border border-orange-100"
              >
                <div className="text-sm font-semibold text-orange-700 capitalize">
                  {level}
                </div>
                <div className="w-[70px] h-[70px] my-2">
                  <CircularProgressbar
                    value={getPercentage(profile[level].solved, profile[level].total)}
                    text={`${getPercentage(profile[level].solved, profile[level].total)}%`}
                    styles={buildStyles({
                      textColor: "#92400e",
                      pathColor:
                        level === "easy"
                          ? "#98ef0c"
                          : level === "medium"
                          ? "#facc15"
                          : "#f87171",
                      trailColor: "#f5d5b8",
                      textSize: "24px",
                    })}
                  />
                </div>
                <div className="text-xs text-gray-600">
                  {profile[level].solved} / {profile[level].total}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="text-center text-orange-900 font-semibold space-y-1">
            <p>
              🧩 Total Solved:{" "}
              <span className="text-orange-600 font-bold">
                {profile.easy.solved + profile.medium.solved + profile.hard.solved}
              </span>{" "}
              /{" "}
              {profile.easy.total + profile.medium.total + profile.hard.total}
            </p>
            <p>
              🏅 Rank:{" "}
              <span className="text-orange-600 font-bold">{profile.rank}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeetCodeStats;
