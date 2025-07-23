import { useState } from 'react';
import { useStore } from '../store';
import { Api } from '../API';
import { toast } from 'react-toastify';
import axios from 'axios'
import { useEffect } from 'react';
const CompleteProfile = () => {
  const { userInfo , setUserInfo } = useStore();
  const [openPersonal, setOpenPersonal] = useState(true);
  const [image , setImage] = useState('')

  const [fatherName , setFatherName] = useState(userInfo?.fatherName ? userInfo.fatherName : "")
  const [motherName , setMotherName] = useState(userInfo?.motherName ? userInfo.motherName : "")
  const [phNo , setPhNo] = useState(userInfo?.phNo ? userInfo.phNo : "")
  const [parentPhNo , setParentPhNo] = useState(userInfo?.parentPhNo ? userInfo.parentPhNo : "")
  const [address , setAddress] = useState(userInfo?.address ? userInfo.address : "")

  const [schoolName , setSchoolName] = useState(userInfo?.schoolName ? userInfo.schoolName : "")
  const [intermediate , setIntermediate] = useState(userInfo?.intermediate ? userInfo.intermediate : "") 
  const [btech , setBtech] = useState(userInfo?.btech ? userInfo.btech : "")
  const [leetcodeUid , setLeetcodeUid] = useState(userInfo?.leetcodeUid ? userInfo.leetcodeUid : "")
  const [githubUid , setGithubUid] = useState(userInfo?.githubUid ? userInfo.githubUid : "")

  const [editPersonalInfo , setEditPersonalInfo] = useState(false)
  const [editAcademicInfo , setEditAcademicInfo] = useState(false)


    useEffect(() => {
      const isPersonalInfoUpdated = async() => {
        try {
          const response = await axios.get(Api + "/profile/is-personal-info-updated" , {withCredentials : true})
          if(response.data.success){
            setEditPersonalInfo(false)
          }
          else{
            setEditPersonalInfo(true)
          }
        } catch (error) {
          toast.error(error.message)
        }
      }

      const isAcademicInfoUpdated = async() => {
        try {
          const response = await axios.get(Api + "/profile/is-academic-info-updated" , {withCredentials : true})
          if(response.data.success){
            setEditAcademicInfo(false)
          }
          else{
            setEditAcademicInfo(true)
          }
        } catch (error) {
          toast.error(error.message)
        }
      }

      isPersonalInfoUpdated()
      isAcademicInfoUpdated()
    },[])

    const HandleImageUpload = async(e) => {
      const file = e.target.files[0];
      const formdata = new FormData()
      formdata.append('profile' , file)
      try {
        const response = await axios.post(Api + "/profile/upload-profile" , formdata , {withCredentials : true})
        if (response.data.success) {
          setImage(file)
          setUserInfo(response.data.user)
          toast.success(response.data.message) ;
        }
      } catch (error) {
        toast.error(error?.message)
        console.log(error);
      }
    }
    
    const handleRemoveProfile = async() => {
        if(!userInfo.profile){
            toast.error("Profile not setted yet !")
            return ;
        }
        try {
            const response = await axios.put(Api + '/profile/remove-profile', {} , {withCredentials : true});
            if(response.data.success){
                setImage(null)
                toast.success(response.data.message);
                setUserInfo(response.data.user)
            }
        } catch (error) {
            toast.error(error.data.message)
        }
    }

    const HandleSavePersonalInfo = async() => {
      try {
        const response = await axios.post(Api + "/profile/update-personal-details" , {fatherName , motherName , phNo , parentPhNo , address} , {withCredentials : true})
        if (response.data.success) {
          toast.success(response.data.message) ;
          setUserInfo(response.data.user)
        }
        else{
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }

    const HandleSaveAcademicInfo = async() => {
      try {
        const response = await axios.post(Api + "/profile/update-academic-details" , {schoolName , intermediate , btech , leetcodeUid , githubUid} , {withCredentials : true})
        if (response.data.success) {
          toast.success(response.data.message) ;
          setUserInfo(response.data.user)
        }
        else{
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }


  return (
    <div className="w-full h-screen flex flex-col gap-5 p-2 overflow-y-auto bg-orange-100">
      {/* Profile Card */}
      <div className="flex sm:flex-row flex-col p-5 relative bg-orange-200 gap-7 items-center sm:m-5 mt-4 rounded-lg shadow-xl">
      

      <label htmlFor="avatar" className="cursor-pointer  rounded-full w-40 h-40 border border-orange-500  shadow-lg overflow-hidden bg-orange-100 flex items-center justify-center">
        {!userInfo.profile ? (<div className="text-5xl sm:text-7xl font-bold text-orange-800">{userInfo.name?.[0] || "U"}</div>
        ) : (<img src={typeof userInfo.profile === "string" && !userInfo.profile.startsWith("http")? `data:image/png;base64,${userInfo.profile}`: userInfo.profile} alt="profile"className="object-cover rounded-full w-full h-full"/>)}
      </label>

      <input type="file" name="avatar" id="avatar" className="hidden" onChange={HandleImageUpload}/>

      <div className="flex flex-col bg-orange-100 rounded-lg gap-2 justify-center shadow-xl flex-1 px-5 py-5">
        <span className="text-orange-800 capitalize text-2xl sm:text-4xl font-bold">{userInfo.name}</span>
        <span className="text-orange-800 text-sm sm:text-xl">Email: <span className="text-orange-500">{userInfo.email}</span></span>
        <span className="text-orange-800 text-sm sm:text-xl">Student ID: <span className="text-orange-500">{userInfo.studentId}</span></span>
        {userInfo.profile && <button className='hover:bg-red-400 rounded-lg shadow-lg bg-red-500 text-white py-2 w-[200px] mx-auto ' onClick={handleRemoveProfile}>Remove profile</button>}
      </div>

      </div>


      <div className="w-[90%] mx-auto flex flex-col gap-4 bg-orange-200 rounded-lg shadow-lg flex-1 p-4">
        <div className="flex items-center justify-center">
          <button className={`w-[50%] text-lg sm:text-xl cursor-pointer m-1 rounded-lg px-4 py-2 ${openPersonal ? 'bg-orange-300 text-white' : 'bg-orange-100 text-orange-800'}`} onClick={() => setOpenPersonal(true)}>Personal Details</button>
          <button className={`w-[50%] text-lg sm:text-xl cursor-pointer m-1 rounded-lg px-4 py-2 ${openPersonal ? 'bg-orange-100 text-orange-800' : 'bg-orange-300 text-white'}`} onClick={() => setOpenPersonal(false)}>Academic Details</button>
        </div>

        {/* Form Grid */}
        {openPersonal ? (
            <div className="flex flex-wrap gap-4 relative ">
              {/* Father Name */}
              <div className="flex flex-col w-full items-center">
                <input type="text" name="fatherName" placeholder="Enter Father Name"className="px-4 py-2 rounded-lg shadow-sm outline-none bg-orange-50 w-[85%] sm:w-[60%] border border-orange-300" value={fatherName} onChange={(e) => setFatherName(e.target.value)}/>
              </div>

              {/* Mother Name */}
              <div className="flex flex-col w-full items-center">
                <input type="text" name="motherName" placeholder="Enter Mother Name" className="px-4 py-2 rounded-lg shadow-sm outline-none bg-orange-50 w-[85%] sm:w-[60%] border border-orange-300" value={motherName} onChange={(e) => setMotherName(e.target.value)}/>
              </div>

              {/* Phone Number */}
              <div className="flex flex-col w-full items-center">
                <input type="number" name="phoneNumber" placeholder="Enter Phone Number" className="px-4 py-2 rounded-lg shadow-sm outline-none bg-orange-50 w-[85%] sm:w-[60%] border border-orange-300" value={phNo} onChange={(e) => setPhNo(e.target.value)}/>
              </div>

              {/* Parent Phone Number */}
              <div className="flex flex-col w-full items-center">
                <input type="text" name="parentPhoneNumber" placeholder="Enter Parent Phone Number (Optional)" className="px-4 py-2 rounded-lg shadow-sm outline-none bg-orange-50 w-[85%] sm:w-[60%] border border-orange-300" value={parentPhNo} onChange={(e) => setParentPhNo(e.target.value)}/>
              </div>

              {/* Address */}
              <div className="flex flex-col w-full items-center">
                <input type="text" name="address" placeholder="Enter Address" className="px-4 py-2 rounded-lg shadow-sm outline-none bg-orange-50 w-[85%] sm:w-[60%] border border-orange-300" value={address} onChange={(e) => setAddress(e.target.value)}/>
              </div>

              {/* Save Button */}
              <div className="w-full flex justify-center mt-2">
                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all" onClick={HandleSavePersonalInfo} >Save Personal Info</button>
              </div>
              
              {!editPersonalInfo && (
                <div className='absolute inset-0 bg-orange-200 flex flex-col items-center gap-4 text-md sm:text-xl justify-center  '>
                  <div className={`text-orange-800 font-bold`}>Father name : <span className='text-orange-500'>{userInfo?.fatherName}</span></div>
                  <div className={`text-orange-800 font-bold`}>Mother name : <span className='text-orange-500'>{userInfo?.motherName}</span></div>
                  <div className={`text-orange-800 font-bold`}>Phone Number : <span className='text-orange-500'>{userInfo?.phNo}</span></div>
                  <div className={`text-orange-800 font-bold ${userInfo.parentPhNo ? "" : "hidden"}`}>Parent phone number : <span className='text-orange-500'>{userInfo?.parentPhNo}</span></div>
                  <div className={`text-orange-800 font-bold`}>Address : <span className='text-orange-500'>{userInfo?.address}</span></div>
                  <button className='bg-red-500 rounded-lg shadow-md px-2 py-2 text-lg text-white hover:bg-red-400 mt-5' onClick={() => setEditPersonalInfo(true)}>Edit Personal information</button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap relative gap-4">
              {/* School Name */}
              <div className="flex flex-col w-full items-center">
                <input type="text" name="schoolName" placeholder="Enter School Name" className="px-4 py-2 rounded-lg shadow-sm w-[85%] sm:w-[60%] outline-none bg-orange-50 border border-orange-300" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
              </div>

              {/* Intermediate College Name */}
              <div className="flex flex-col w-full items-center">
                <input type="text" name="interCollege" placeholder="Enter Intermediate College Name" className="px-4 py-2 rounded-lg shadow-sm w-[85%] sm:w-[60%] outline-none bg-orange-50 border border-orange-300" value={intermediate} onChange={(e) => setIntermediate(e.target.value)}/>
              </div>

              {/* B.Tech College Name */}
              <div className="flex flex-col w-full items-center">
                <input type="text" name="btechCollege" placeholder="Enter B.Tech College Name" className="px-4 py-2 rounded-lg shadow-sm w-[85%] sm:w-[60%] outline-none bg-orange-50 border border-orange-300" value={btech} onChange={(e) => setBtech(e.target.value)}/>
              </div>

              {/* LeetCode Username */}
              <div className="flex flex-col w-full items-center">
                <input type="text" name="leetcodeUsername" placeholder="Enter LeetCode Username (Optional) " className="px-4 py-2 rounded-lg shadow-sm w-[85%] sm:w-[60%] outline-none bg-orange-50 border border-orange-300" value={leetcodeUid} onChange={(e) => setLeetcodeUid(e.target.value)}/>
              </div>

              {/* GitHub Profile */}
              <div className="flex flex-col w-full items-center">
                <input type="text" name="github" placeholder="Enter GitHub username (Optional) " className="px-4 py-2 rounded-lg shadow-sm w-[85%] sm:w-[60%] outline-none bg-orange-50 border border-orange-300" value={githubUid} onChange={(e) => setGithubUid(e.target.value)}/>
              </div>

              {/* Save Button */}
              <div className="w-full flex justify-center mt-2">
                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all" onClick={HandleSaveAcademicInfo}>Save Academic Info</button>
              </div>

              {!editAcademicInfo && (
                <div className='absolute inset-0 bg-orange-200 flex flex-col items-center gap-4 text-md sm:text-xl justify-center  '>
                  <div className={`text-orange-800 font-bold`}>School name : <span className='text-orange-500'>{userInfo?.schoolName}</span></div>
                  <div className={`text-orange-800 font-bold`}>Intermediate : <span className='text-orange-500'>{userInfo?.intermediate}</span></div>
                  <div className={`text-orange-800 font-bold`}>BTech college : <span className='text-orange-500'>{userInfo?.btech}</span></div>
                  <div className={`text-orange-800 font-bold ${userInfo.parentPhNo ? "" : "hidden"}`}>Leetcode username : <span className='text-orange-500'>{userInfo?.leetcodeUid}</span></div>
                  <div className={`text-orange-800 font-bold ${userInfo.parentPhNo ? "" : "hidden"}`}>GitHub username : <span className='text-orange-500'>{userInfo?.githubUid}</span></div>
                  <button className='bg-red-500 rounded-lg shadow-md px-2 py-2 text-lg text-white hover:bg-red-400 mt-5' onClick={() => setEditAcademicInfo(true)}>Edit Academic information</button>
                </div>
              )}


            </div>
          )}

      </div>
    </div>
  );
};

export default CompleteProfile;
