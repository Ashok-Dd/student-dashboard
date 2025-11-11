import { motion } from "framer-motion";
import { Users, Target, Rocket, Globe2 } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-orange-50 to-orange-100 overflow-y-auto py-10 px-5 sm:px-10">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-6xl font-extrabold text-orange-800 text-center mb-8"
      >
        About <span className="text-orange-600">EduPortal</span>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-orange-200 rounded-2xl shadow-xl p-8 sm:p-10 flex flex-col gap-5 items-center justify-center text-center"
      >
        <h1 className="font-bold text-2xl sm:text-4xl text-orange-900">
          Smart Student Management, Simplified ✨
        </h1>
        <p className="text-orange-800 text-base sm:text-lg leading-relaxed">
          EduPortal is your all-in-one platform designed to make student management
          effortless and efficient. From academic records to performance tracking,
          we simplify how institutions, teachers, and students stay connected and grow together.
        </p>
      </motion.div>

      {/* Mission Section */}
      <section className="mt-16">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-3xl sm:text-4xl font-bold text-orange-800 mb-4"
        >
          Our Mission
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-orange-900 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto"
        >
          At <span className="font-semibold text-orange-700">EduPortal</span>, our mission is
          to empower educational institutions with intelligent digital tools that promote transparency,
          efficiency, and growth. We believe technology should bridge gaps—not create them.
          Our system ensures every student’s journey is tracked, supported, and celebrated.
        </motion.p>
      </section>

      {/* Features Section */}
      <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: <Target className="w-10 h-10 text-orange-600" />,
            title: "Purpose Driven",
            desc: "We focus on solving real academic challenges with practical, tech-driven solutions.",
          },
          {
            icon: <Users className="w-10 h-10 text-orange-600" />,
            title: "People First",
            desc: "Built for students, teachers, and admins—our platform adapts to every role’s needs.",
          },
          {
            icon: <Rocket className="w-10 h-10 text-orange-600" />,
            title: "Innovation at Core",
            desc: "From AI-assisted analytics to real-time dashboards, we keep innovating to enhance learning.",
          },
          {
            icon: <Globe2 className="w-10 h-10 text-orange-600" />,
            title: "Global Vision",
            desc: "We aim to revolutionize education systems worldwide through simplicity and scalability.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
            className="bg-white rounded-2xl p-6 shadow-lg text-center flex flex-col items-center hover:shadow-2xl transition-all duration-300"
          >
            <div className="mb-3">{item.icon}</div>
            <h3 className="font-bold text-xl text-orange-800 mb-2">{item.title}</h3>
            <p className="text-orange-700 text-sm sm:text-base">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-20 text-center text-orange-800 font-medium text-sm sm:text-base"
      >
        © {new Date().getFullYear()} EduPortal. All Rights Reserved.
      </motion.div>
    </div>
  );
};

export default AboutUs;
