import React, { useState } from 'react';
import { 
  BookOpen, 
  User, 
  Map, 
  Calendar, 
  Award, 
  MessageCircle, 
  Settings, 
  Bell,
  Search,
  ChevronRight,
  Play,
  Clock,
  Star,
  TrendingUp,
  Target,
  CheckCircle,
  FileText,
  Video,
  Users,
  BarChart3,
  Globe,
  Book,
  Lightbulb,
  Trophy,
  Activity
} from 'lucide-react';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'roadmaps', label: 'Learning Roadmaps', icon: Map },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const courses = [
    {
      id: 1,
      title: 'Advanced React Development',
      progress: 75,
      instructor: 'Sarah Johnson',
      nextClass: 'Today, 2:00 PM',
      status: 'In Progress',
      thumbnail: '🚀'
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms',
      progress: 45,
      instructor: 'Michael Chen',
      nextClass: 'Tomorrow, 10:00 AM',
      status: 'In Progress',
      thumbnail: '📊'
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      progress: 90,
      instructor: 'Emma Wilson',
      nextClass: 'Completed',
      status: 'Completed',
      thumbnail: '🎨'
    },
    {
      id: 4,
      title: 'Python for Data Science',
      progress: 20,
      instructor: 'David Kumar',
      nextClass: 'Friday, 3:00 PM',
      status: 'In Progress',
      thumbnail: '🐍'
    }
  ];

  const roadmaps = [
    {
      id: 1,
      title: 'Full Stack Developer',
      description: 'Complete roadmap to become a full stack developer',
      progress: 60,
      steps: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Database'],
      difficulty: 'Intermediate',
      duration: '6 months'
    },
    {
      id: 2,
      title: 'Data Scientist',
      description: 'Path to becoming a professional data scientist',
      progress: 30,
      steps: ['Python', 'Statistics', 'Machine Learning', 'Deep Learning'],
      difficulty: 'Advanced',
      duration: '8 months'
    },
    {
      id: 3,
      title: 'UX Designer',
      description: 'Master the art of user experience design',
      progress: 85,
      steps: ['Design Principles', 'Figma', 'User Research', 'Prototyping'],
      difficulty: 'Beginner',
      duration: '4 months'
    }
  ];

  const achievements = [
    { id: 1, title: 'First Course Completed', date: '2024-01-15', icon: '🎓' },
    { id: 2, title: 'Week Streak', date: '2024-02-01', icon: '🔥' },
    { id: 3, title: 'Quiz Master', date: '2024-02-10', icon: '🧠' },
    { id: 4, title: 'Project Completed', date: '2024-02-20', icon: '🏆' }
  ];

  const upcomingEvents = [
    { id: 1, title: 'React Workshop', time: '2:00 PM', date: 'Today' },
    { id: 2, title: 'Algorithm Quiz', time: '10:00 AM', date: 'Tomorrow' },
    { id: 3, title: 'Project Deadline', time: '11:59 PM', date: 'Friday' }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Courses</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Completed</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Certificates</p>
              <p className="text-2xl font-bold">5</p>
            </div>
            <Award className="h-8 w-8 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Study Streak</p>
              <p className="text-2xl font-bold">15 days</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Continue Learning</h3>
          <div className="space-y-4">
            {courses.slice(0, 3).map(course => (
              <div key={course.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="text-2xl">{course.thumbnail}</div>
                <div className="flex-1">
                  <h4 className="font-medium">{course.title}</h4>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{course.progress}%</p>
                  <p className="text-xs text-gray-500">{course.nextClass}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{event.title}</p>
                  <p className="text-xs text-gray-600">{event.date} at {event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Courses</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Browse Courses
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl">{course.thumbnail}</div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                course.status === 'Completed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {course.status}
              </span>
            </div>
            
            <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
            <p className="text-gray-600 text-sm mb-4">by {course.instructor}</p>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">{course.nextClass}</p>
              <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                Continue
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            JD
          </div>
          <div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-gray-600">Computer Science Student</p>
            <p className="text-sm text-gray-500">Joined January 2024</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Personal Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span>john.doe@example.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span>New York, NY</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Learning Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Study Time:</span>
                <span>120 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Certificates Earned:</span>
                <span>5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Streak:</span>
                <span>15 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="font-semibold mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map(achievement => (
            <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl">{achievement.icon}</div>
              <div>
                <p className="font-medium">{achievement.title}</p>
                <p className="text-sm text-gray-600">{achievement.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRoadmaps = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Learning Roadmaps</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Explore More
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {roadmaps.map(roadmap => (
          <div key={roadmap.id} className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{roadmap.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{roadmap.description}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                roadmap.difficulty === 'Beginner' 
                  ? 'bg-green-100 text-green-800'
                  : roadmap.difficulty === 'Intermediate'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {roadmap.difficulty}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{roadmap.progress}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${roadmap.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Learning Path:</p>
              <div className="flex flex-wrap gap-2">
                {roadmap.steps.map((step, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {step}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{roadmap.duration}</span>
                </div>
              </div>
              <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                Continue
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Schedule</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Add Event
        </button>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="grid grid-cols-7 gap-4 mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="text-center font-medium text-gray-700 py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-4">
          {Array.from({ length: 35 }, (_, i) => {
            const day = i + 1;
            const hasEvent = [5, 12, 18, 25].includes(day);
            return (
              <div key={i} className={`h-12 border rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 ${
                hasEvent ? 'bg-blue-100 border-blue-300' : 'border-gray-200'
              }`}>
                <span className={`text-sm ${hasEvent ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                  {day <= 31 ? day : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="font-semibold mb-4">Upcoming Classes</h3>
        <div className="space-y-3">
          {upcomingEvents.map(event => (
            <div key={event.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
              </div>
              <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'courses':
        return renderCourses();
      case 'profile':
        return renderProfile();
      case 'roadmaps':
        return renderRoadmaps();
      case 'schedule':
        return renderSchedule();
      case 'achievements':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map(achievement => (
                <div key={achievement.id} className="bg-white rounded-xl p-6 shadow-sm border text-center">
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm">Earned on {achievement.date}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'messages':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Messages</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <p className="text-gray-600 text-center py-8">No messages yet. Start a conversation with your instructors!</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Email Notifications</span>
                  <button className="w-12 h-6 bg-blue-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Dark Mode</span>
                  <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Push Notifications</span>
                  <button className="w-12 h-6 bg-blue-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Book className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl">EduPortal</span>
          </div>
        </div>
        
        <nav className="mt-6">
          {sidebarItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                  activeTab === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses, resources..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-800">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  JD
                </div>
                <span className="font-medium">John Doe</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
