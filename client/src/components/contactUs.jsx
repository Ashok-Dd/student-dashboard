import React from 'react';
import { User } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="h-screen w-full bg-orange-100 overflow-y-auto flex flex-col gap-10 items-center justify-start">
      <h2 className="text-orange-800 font-bold text-4xl capitlize p-7">Contact Us</h2>
      <div className="h-full w-[100%] sm:w-[70%] md:w-[50%] lg:w-[40%] shadow-xl flex flex-col bg-orange-200 justify-center items-center rounded-xl p-6">
        <form className="w-full flex flex-col gap-6">
            <div className='flex items-center mt-5 gap-3 bg-gray-100 rounded-md p-2'>
                <User className="text-orange-500" />
                <input type="text"placeholder="Enter your name"className="flex-1 outline-none bg-gray-100  text-orange-500 placeholder-orange-500"/>
            </div>
            <div className='flex items-center gap-3 bg-gray-100 rounded-md p-2'>
                <input type="email"placeholder="Enter your email"className="flex-1 outline-none bg-gray-100 text-orange-500 placeholder-orange-500"/>
            </div>
          <textarea placeholder="Your message"rows="4"className="w-full outline-none bg-gray-100 text-orange-500 placeholder-orange-500 p-2 rounded-md"/>  
          <button type="submit" className="bg-orange-400 hover:bg-orange-600 text-white font-semibold py-2 px-4 mt-5 w-[100%] rounded-full transition duration-300">Submit</button>
        </form>
      </div>
      <div className='flex flex-col items-center justify-center pb-5'>
        <h2 className="text-3xl font-bold flex justify-center items-center text-orange-800 p-6 ">Contact Information</h2>
        <h3 className='text-black '> <span className='font-bold text-lg text-black'>Email:</span> support@educore.com</h3>
       <h3 className='text-black '> <span className='font-bold text-lg text-black'>Phone:</span> +91 1234567890</h3>
       <h3 className='text-black '> <span className='font-bold text-lg text-black'>Address:</span>123, Bhimavaram, Andhra pradesh, India </h3>


      </div>
       
     
    </div>
  );
};

export default ContactUs;