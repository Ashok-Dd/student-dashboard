import { useState, useEffect } from "react";
import { useStore } from "../store";
import { Api } from "../API";
import { toast } from "react-toastify";
import axios from "axios";
import { Loader2 } from "lucide-react";

const CompleteProfile = () => {
  const { userInfo, setUserInfo } = useStore();
  const [openPersonal, setOpenPersonal] = useState(true);
  const [image, setImage] = useState("");

  const [fatherName, setFatherName] = useState(userInfo?.fatherName || "");
  const [motherName, setMotherName] = useState(userInfo?.motherName || "");
  const [phNo, setPhNo] = useState(userInfo?.phNo || "");
  const [parentPhNo, setParentPhNo] = useState(userInfo?.parentPhNo || "");
  const [address, setAddress] = useState(userInfo?.address || "");

  const [schoolName, setSchoolName] = useState(userInfo?.schoolName || "");
  const [intermediate, setIntermediate] = useState(userInfo?.intermediate || "");
  const [btech, setBtech] = useState(userInfo?.btech || "");
  const [leetcodeUid, setLeetcodeUid] = useState(userInfo?.leetcodeUid || "");
  const [githubUid, setGithubUid] = useState(userInfo?.githubUid || "");

  const [editPersonalInfo, setEditPersonalInfo] = useState(false);
  const [editAcademicInfo, setEditAcademicInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkInfoStatus = async () => {
      try {
        setLoading(true);
        const [personalRes, academicRes] = await Promise.all([
          axios.get(Api + "/profile/is-personal-info-updated", { withCredentials: true }),
          axios.get(Api + "/profile/is-academic-info-updated", { withCredentials: true }),
        ]);
        setEditPersonalInfo(!personalRes.data.success);
        setEditAcademicInfo(!academicRes.data.success);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    checkInfoStatus();
  }, []);

  const HandleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const formdata = new FormData();
    formdata.append("profile", file);
    try {
      const res = await axios.post(Api + "/profile/upload-profile", formdata, { withCredentials: true });
      if (res.data.success) {
        setImage(file);
        setUserInfo(res.data.user);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProfile = async () => {
    if (!userInfo.profile) {
      toast.error("Profile not set yet!");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.put(Api + "/profile/remove-profile", {}, { withCredentials: true });
      if (res.data.success) {
        setImage(null);
        setUserInfo(res.data.user);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const HandleSavePersonalInfo = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        Api + "/profile/update-personal-details",
        { fatherName, motherName, phNo, parentPhNo, address },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setUserInfo(res.data.user);
      } else toast.error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const HandleSaveAcademicInfo = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        Api + "/profile/update-academic-details",
        { schoolName, intermediate, btech, leetcodeUid, githubUid },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setUserInfo(res.data.user);
      } else toast.error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col gap-5 p-4 overflow-y-auto bg-gradient-to-br from-orange-50 to-orange-200">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-orange-200/40 backdrop-blur-sm z-50">
          <Loader2 className="animate-spin text-orange-600 w-12 h-12" />
        </div>
      )}

      {/* Profile Header */}
      <div className="flex sm:flex-row flex-col p-6 relative bg-white/70 backdrop-blur-lg border border-orange-200 gap-7 items-center sm:m-5 mt-4 rounded-xl shadow-lg">
        <label htmlFor="avatar" className="cursor-pointer rounded-full w-36 h-36 border-4 border-orange-400 shadow-md overflow-hidden bg-orange-50 flex items-center justify-center hover:scale-105 transition">
          {!userInfo.profile ? (
            <div className="text-5xl font-bold text-orange-700">{userInfo.name?.[0] || "U"}</div>
          ) : (
            <img
              src={
                typeof userInfo.profile === "string" && !userInfo.profile.startsWith("http")
                  ? `data:image/png;base64,${userInfo.profile}`
                  : userInfo.profile
              }
              alt="profile"
              className="object-cover rounded-full w-full h-full"
            />
          )}
        </label>
        <input type="file" id="avatar" className="hidden" onChange={HandleImageUpload} />

        <div className="flex flex-col bg-white/80 backdrop-blur-md rounded-lg gap-2 justify-center shadow-md flex-1 px-6 py-4">
          <span className="text-orange-800 capitalize text-3xl font-bold">{userInfo.name}</span>
          <span className="text-orange-700 text-base sm:text-lg">
            Email: <span className="text-orange-500">{userInfo.email}</span>
          </span>
          <span className="text-orange-700 text-base sm:text-lg">
            Student ID: <span className="text-orange-500">{userInfo.studentId}</span>
          </span>
          {userInfo.profile && (
            <button
              className="hover:bg-red-400 rounded-lg shadow-md bg-red-500 text-white py-2 w-48 mx-auto mt-3 transition"
              onClick={handleRemoveProfile}
            >
              Remove Profile
            </button>
          )}
        </div>
      </div>

      {/* Details Card */}
      <div className="w-[95%] mx-auto flex flex-col gap-4 bg-white/70 backdrop-blur-lg border border-orange-200 rounded-xl shadow-md flex-1 p-4">
        <div className="flex items-center justify-center gap-2">
          <button
            className={`w-1/2 text-lg sm:text-xl cursor-pointer m-1 rounded-lg px-4 py-2 transition-all duration-300 ${
              openPersonal ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-800"
            }`}
            onClick={() => setOpenPersonal(true)}
          >
            Personal
          </button>
          <button
            className={`w-1/2 text-lg sm:text-xl cursor-pointer m-1 rounded-lg px-4 py-2 transition-all duration-300 ${
              !openPersonal ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-800"
            }`}
            onClick={() => setOpenPersonal(false)}
          >
            Academic
          </button>
        </div>

        {/* Personal Info */}
        {openPersonal ? (
          <div className="flex flex-wrap gap-4 relative">
            {[{ label: "Father Name", value: fatherName, setValue: setFatherName },
              { label: "Mother Name", value: motherName, setValue: setMotherName },
              { label: "Phone Number", value: phNo, setValue: setPhNo },
              { label: "Parent Phone Number", value: parentPhNo, setValue: setParentPhNo },
              { label: "Address", value: address, setValue: setAddress },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col w-full items-center">
                <input
                  type="text"
                  placeholder={field.label}
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  className="px-4 py-3 rounded-md w-[90%] sm:w-[60%] border border-orange-300 bg-orange-50 focus:ring-2 focus:ring-orange-400 outline-none shadow-sm transition-all"
                />
              </div>
            ))}
            <div className="w-full flex justify-center mt-2">
              <button
                className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 shadow-md transition"
                onClick={HandleSavePersonalInfo}
              >
                Save Personal Info
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap relative gap-4">
            {[{ label: "School Name", value: schoolName, setValue: setSchoolName },
              { label: "Intermediate College", value: intermediate, setValue: setIntermediate },
              { label: "B.Tech College", value: btech, setValue: setBtech },
              { label: "Leetcode Username", value: leetcodeUid, setValue: setLeetcodeUid },
              { label: "GitHub Username", value: githubUid, setValue: setGithubUid },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col w-full items-center">
                <input
                  type="text"
                  placeholder={field.label}
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  className="px-4 py-3 rounded-md w-[90%] sm:w-[60%] border border-orange-300 bg-orange-50 focus:ring-2 focus:ring-orange-400 outline-none shadow-sm transition-all"
                />
              </div>
            ))}
            <div className="w-full flex justify-center mt-2">
              <button
                className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 shadow-md transition"
                onClick={HandleSaveAcademicInfo}
              >
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
