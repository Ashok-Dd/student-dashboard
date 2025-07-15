import NavBar from "../components/navigationBar";
import ImageSlider from "../components/imageSlider";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const nav = useNavigate()
  return (
    <>
      <div className="w-full h-full bg-white text-gray-800 overflow-x-hidden">
        <NavBar />

        <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 bg-gradient-to-r from-orange-100 via-white to-orange-100">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">Welcome to <span className="text-orange-500">Our Platform</span></h1>
            <p className="text-lg text-gray-600">
              We provide innovative solutions to elevate your online presence.
              Explore our features and see how we can help you grow.
            </p>
            <div className="flex gap-4">
              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300 cursor-pointer shadow-md" onClick={() => nav('/login')} >Get Started</button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <ImageSlider />
          </div>
        </div>

        
        <div className="px-6 md:px-20 py-16 bg-white text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Our Features</h2>
          <div className="flex justify-center items-center flex-wrap md:grid-cols-3 gap-10">
            {[
              { title: "Fast Performance", desc: "Lightning fast speed and optimized code." },
              { title: "Mobile Responsive", desc: "Looks great on all devices, large or small." },
              { title: "Easy Integration", desc: "Seamlessly connect with your favorite tools." }
            ].map((feature, index) => (
              <div key={index} className="p-6 border border-gray-300 rounded-xl hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-orange-500 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>


        
        <div className="px-6 md:px-20 py-16 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Users Say</h2>
          <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
            {[1, 2, 3].map((id) => (
              <div key={id} className="bg-white hover:shadow-md p-6 rounded-lg border border-gray-300 max-w-sm">
                <p className="italic text-gray-700">
                  "This platform changed the way I work. It's fast, intuitive, and super helpful!"
                </p>
                <div className="mt-4 text-orange-500 font-semibold">Student {id}</div>
              </div>
            ))}
          </div>
        </div>



        <div className="bg-orange-400 py-16 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="mb-8 text-lg">Join us today and take your workflow to the next level!</p>
          <button className="bg-white text-orange-500 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition">Join Now</button>
        </div>



        <div className="bg-gray-800 text-white py-2 px-6 md:px-20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© {new Date().getFullYear()} Student Dashboard. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a  className="hover:text-orange-400 cursor-pointer transition">Privacy Policy</a>
              <a  className="hover:text-orange-400 cursor-pointer transition">Terms of Service</a>
              <a  className="hover:text-orange-400 cursor-pointer transition">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
