import { Mail, User } from 'lucide-react';
import { useState } from 'react';
import { Api } from "../API";
import { toast } from 'react-toastify';
import axios from 'axios'

const ContactUs = () => {

  const [name , setName] = useState('');
  const [email, setEmail] = useState('');
  const [message , setMessage] = useState('');
  const [loading , setLoading] = useState(false)

  const AdminMail = 'eduportal@gmail.com'

  const handleContactUs = async(e) => {
    e.preventDefault() ;
    try {
      setLoading(true);
      const response = await axios.post(Api + "/auth/contact-us" , {name , email , message} , {withCredentials : true });

      if(response.data.success) {
        toast.success(response.data.message) ;
        setName('');
        setEmail('');
        setMessage('');
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong") ;
      setLoading(false) ; 
    }


  }

  return (
    <div className="h-screen w-full bg-orange-100 overflow-y-auto flex flex-col gap-10 items-center justify-start">
      <h2 className="text-orange-800 font-bold text-4xl capitlize p-7">Contact Us</h2>
      <div className="h-full w-[100%] sm:w-[70%] md:w-[50%] lg:w-[40%] shadow-xl flex flex-col bg-orange-200 justify-center items-center rounded-xl p-6">
        <form onSubmit={handleContactUs} className="w-full flex flex-col gap-6">
            <div className='flex items-center mt-5 gap-3 bg-gray-100 rounded-md p-2'>
                <User className="text-orange-500" />
                <input type="text"placeholder="Enter your name"className="flex-1 outline-none bg-gray-100  text-orange-500 placeholder-orange-500" value={name} onChange={(e) => setName(e.target.value )} />
            </div>
            <div className='flex items-center gap-3 bg-gray-100 rounded-md p-2'>
              <Mail className="text-orange-500" />
                <input type="email" autoComplete="new-email" placeholder="Enter your email"className="flex-1 outline-none bg-gray-100 text-orange-500 placeholder-orange-500" value={email} onChange={(e) => setEmail(e.target.value )}/>
            </div>
          <textarea placeholder="Your message"rows="4"className="w-full outline-none bg-gray-100 text-orange-500 placeholder-orange-500 p-2 rounded-md" value={message} onChange={(e) => setMessage(e.target.value )} />  
          <button type="submit" className={`bg-orange-400 hover:bg-orange-600 text-white font-semibold py-2 px-4 mt-5 w-[100%] rounded-full transition duration-300 flex items-center justify-center `} disabled={loading}  >{loading ? <div className='w-5 h-5 rounded-full border-t-2 animate-spin '></div> : "Submit"}</button>
        </form>
      </div>
      <div className='flex flex-col items-center justify-center pb-5'>
        <h2 className="text-3xl font-bold flex justify-center items-center text-orange-800 p-6 ">Contact Information</h2>
        <h3 className='text-black '> <span className='font-bold text-lg text-black'>Email:</span> {AdminMail}</h3>
       <h3 className='text-black '> <span className='font-bold text-lg text-black'>Phone:</span> +91 1234567890</h3>
       <h3 className='text-black '> <span className='font-bold text-lg text-black'>Address:</span>123, Bhimavaram, Andhra pradesh, India </h3>


      </div>
       
     
    </div>
  );
};

export default ContactUs;