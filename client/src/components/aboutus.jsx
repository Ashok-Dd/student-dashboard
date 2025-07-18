const AboutUs = () => {
    return (
        <div className="h-screen overflow-y-auto rounded-xl bg-orange-100  flex-1 justify-center pt-10">
            <div className="text-5xl font-bold text-orange-800 text-center">
                About us
            </div>

            <div className="bg-orange-200 mt-10 h-[240px] px-6 flex items-center gap-8 flex-col justify-center rounded-xl shadow-lg flex-1">
                <h1 className="font-bold text-xl sm:text-4xl text-orange-800 text-center ">Smart Student Management, Simplified</h1>
                <p className=" text:md sm:text-lg text-center  text-orange-900 font-medium ">EduPortal provides a centralized dashboard for students to explore, enroll,<br/>track progress, and manage their academic journey efficiently.</p>
            </div>
            <section className="bg-orange-100 mt-10 h-[400px] px-6   flex-1">
             <div>
                <h1 className="text-center text-3xl text-bold text-orange-800 pt-5 font-bold">Our Mission</h1>
                 <p className="text-orange-900 text-lg text-center flex justify-center pt-5">At LearnSphere, we strive to democratize education by delivering interactive, engaging,and high-quality content across diverse disciplines.<br/> Whether you're a beginner or a pro, our platform helps you unlock new opportunities and grow your skills confidently.</p>
                 <h2 className="text-center text-3xl text-bold text-orange-800 pt-10 font-bold">What Sets Us Apart</h2>
              <p className="text-orange-900 text-lg text-center pt-5">🚀 Hands-on learning through real-world projects</p>
              <p className="text-orange-900 text-lg text-center">👨‍🏫 Courses crafted by industry experts</p>
              <p className="text-orange-900 text-lg text-center">📜 Recognized certifications to boost your resume</p>
              <p className="text-orange-900 text-lg text-center">🌍 A global community of learners and mentors</p>

             </div>
            </section>
        </div>
    );
};

export default AboutUs;