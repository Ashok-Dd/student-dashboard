import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Api } from "../API"; 
const CourseRegistration = () => {
  const [title, setTitle] = useState('');
  const [poster, setPoster] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [instructor, setInstructor] = useState('');

  const AddCourse = async (e) => {
    e.preventDefault();
    try {
      if (!title || !startDate || !endDate || !instructor) {
        toast.warn("All fields are required.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("instructor", instructor);
      if (poster) {
        formData.append("poster", poster);
      }

      const res = await axios.post(`${Api}/course/add-course`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setTitle("");
        setStartDate("");
        setEndDate("");
        setInstructor("");
        setPoster(null);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const today = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;

  return (
    <div className="w-full h-screen overflow-y-auto flex items-center justify-center bg-orange-100">
      <div className="w-full lg:w-[40%] h-auto p-6 mt-10 lg:mt-0 rounded-lg shadow-lg md:bg-orange-200">
        <h1 className="text-3xl md:text-4xl text-orange-600 font-bold text-center mb-6">Course Registration</h1>

        <form onSubmit={AddCourse} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-orange-600 text-xl font-semibold">Course Name</label>
            <input type="text" placeholder="Enter your course name" className="p-2 rounded-md outline-none bg-gray-100 border border-orange-400 shadow-sm focus:ring-2 focus:ring-orange-400" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-orange-600 text-xl font-semibold">Starting Date</label>
            <input type="date" min={today} className="p-2 rounded-md outline-none bg-gray-100 border border-orange-400 shadow-sm focus:ring-2 focus:ring-orange-400" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-orange-600 text-xl font-semibold">Ending Date</label>
            <input type="date" min={startDate || today} className="p-2 rounded-md outline-none bg-gray-100 border border-orange-400 shadow-sm focus:ring-2 focus:ring-orange-400" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-orange-600 text-xl font-semibold"> Instructor Name</label>
            <input type="text" placeholder="Enter instructor's name" className="p-2 rounded-md outline-none bg-gray-100 border border-orange-400 shadow-sm focus:ring-2 focus:ring-orange-400" value={instructor} onChange={(e) => setInstructor(e.target.value)}/>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-orange-600 text-xl font-semibold">Course Banner (Poster)</label>
            <input type="file" accept="image/*" className="p-2 rounded-md outline-none bg-gray-100 border border-orange-400 shadow-sm focus:ring-2 focus:ring-orange-400"onChange={(e) => setPoster(e.target.files[0])}/>
          </div>

          <button type="submit" className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md" >Register</button>
        </form>
      </div>
    </div>
  );
};

export default CourseRegistration;
