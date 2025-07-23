import { Course } from "../models/CourseModel.js";
import { Student } from "../models/StudentModel.js";

export const AddCourse = async(req , res) => {
    try {
        const {title , startDate , endDate , instructor} = req.body ;
        if(!title || !startDate || !endDate || !instructor){
            return res.status(200).json({success : false , message : "All feilds are required .. "})
        }
        const course = await Course.create({
            title , startDate , endDate , instructor
        })
        if (req.file) {
            course.poster = req.file.buffer.toString('base64');
            await course.save();
        }

        return res.status(200).json({success : true , message : "Course added Sucessfully .."})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false , message : "Internal server issue !"})
    }
}

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 }); 
    return res.status(200).json({success: true , message: "All courses fetched successfully",courses})
  } catch (error) {
    console.error(error);
    return res.status(500).json({success: false , message: "Internal server error while fetching courses",});
  }
};


export const enrollInCourse = async (req, res) => {
  try {
    const studentId = req.userId;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const now = new Date().setHours(0, 0, 0, 0);
    const courseStartDate = new Date(course.startDate).setHours(0, 0, 0, 0);

    if (courseStartDate <= now) {
        return res.status(200).json({ success: false, message: "Cannot enroll in a course that has already started" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    if (student.courses.includes(courseId)) {
      return res.status(200).json({ success: false, message: "Already enrolled in this course" });
    }

    student.courses.push(courseId);
    await student.save();
    course.studentsEnrolled = course.studentsEnrolled + 1 ;
    await  course.save();
    return res.status(200).json({ success: true, message: "Enrolled successfully" });

  } catch (error) {
    console.error("Enrollment Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const getEnrolledCourses = async (req, res) => {
  try {
    const student = await Student.findById(req.userId).populate("courses");

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    return res.status(200).json({ success: true, courses: student.courses });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const RemoveCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(200).json({ success: false, message: "Course ID is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    
    await Course.findByIdAndDelete(courseId);

    await Student.updateMany(
      { courses: courseId },
      { $pull: { courses: courseId } }
    );

    return res.status(200).json({ success: true, message: "Course removed from system and students" });

  } catch (error) {
    console.error("Remove Course Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllCoursesOfAStudent = async(req , res) => {
  try {
    const {studentId} = req.body ; 
    const student = await Student.findOne({studentId}).populate("courses");

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    return res.status(200).json({ success: true, courses: student.courses });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}


export const sendCourseAndStudentsEnrolled = async(req  ,res) => {
  try {
    const courses = await Course.find();
    let courseAndStudentsEnrolled = courses.map((course) => ({
      name : course.title ,
      students : course.studentsEnrolled
    }))
    return res.status(200).json({success : true , courseAndStudentsEnrolled})
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}




