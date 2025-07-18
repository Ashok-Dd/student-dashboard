import React, { useState } from 'react';

const LoginRegisterForm = () => {
  const [isActive, setIsActive] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    branch: '',
    year: ''
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLoginSubmit = () => {
    const newErrors = {};

    if (!loginForm.username.trim()) {
      newErrors.loginUsername = 'Username is required';
    }

    if (!validatePassword(loginForm.password)) {
      newErrors.loginPassword = 'Password must be at least 6 characters long';
    }

    if (Object.keys(newErrors).length === 0) {
      // Handle successful login
      console.log('Login successful:', loginForm);
      alert('Login successful!');
    } else {
      setErrors(newErrors);
    }
  };

  const handleRegisterSubmit = () => {
    const newErrors = {};

    if (!registerForm.username.trim()) {
      newErrors.registerUsername = 'Username is required';
    }

    if (!validateEmail(registerForm.email)) {
      newErrors.registerEmail = 'Please enter a valid email';
    }

    if (!validatePassword(registerForm.password)) {
      newErrors.registerPassword = 'Password must be at least 6 characters long';
    }

    if (!registerForm.branch.trim()) {
      newErrors.registerBranch = 'Branch is required';
    }

    if (!registerForm.year.trim()) {
      newErrors.registerYear = 'Year is required';
    }

    if (Object.keys(newErrors).length === 0) {
      // Handle successful registration
      console.log('Registration successful:', registerForm);
      alert('Registration successful!');
    } else {
      setErrors(newErrors);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[`login${name.charAt(0).toUpperCase() + name.slice(1)}`]) {
      setErrors(prev => ({ ...prev, [`login${name.charAt(0).toUpperCase() + name.slice(1)}`]: '' }));
    }
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[`register${name.charAt(0).toUpperCase() + name.slice(1)}`]) {
      setErrors(prev => ({ ...prev, [`register${name.charAt(0).toUpperCase() + name.slice(1)}`]: '' }));
    }
  };

  const branches = [
    'Computer Science',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Chemical Engineering',
    'Biotechnology'
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-blue-200 p-5">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        .container {
          position: relative;
          width: 850px;
          height: 550px;
          background: #fff;
          border-radius: 30px;
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
          margin: 20px;
          overflow: hidden;
          transition: all 0.6s ease-in-out;
        }
        
        .form-box {
          position: absolute;
          right: 0;
          width: 50%;
          height: 100%;
          background: #fff;
          display: flex;
          align-items: center;
          color: #333;
          text-align: center;
          padding: 40px;
          z-index: 1;
          transition: 0.6s ease-in-out 1.2s, visibility 0s 1s;
        }
        
        .container.active .form-box {
          right: 50%;
        }
        
        .form-box.register {
          visibility: hidden;
        }
        
        .container.active .form-box.register {
          visibility: visible;
        }
        
        .toggle-box {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .toggle-box::before {
          content: "";
          position: absolute;
          left: -250%;
          width: 300%;
          height: 100%;
          background: #7494ec;
          border-radius: 150px;
          z-index: 2;
          transition: 1.8s ease-in-out;
        }
        
        .container.active .toggle-box::before {
          left: 50%;
        }
        
        .toggle-panel {
          position: absolute;
          width: 50%;
          height: 100%;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 2;
        }
        
        .toggle-panel.toggle-left {
          left: 0;
          transition-delay: 1.2s;
        }
        
        .container.active .toggle-panel.toggle-left {
          left: -50%;
          transition-delay: 0.6s;
        }
        
        .toggle-panel.toggle-right {
          right: -50%;
          transition-delay: 0.6s;
        }
        
        .container.active .toggle-panel.toggle-right {
          right: 0;
          transition-delay: 1.2s;
        }
        
        @media screen and (max-width: 650px) {
          .container {
            height: calc(100vh - 40px);
          }
          
          .form-box {
            bottom: 0;
            width: 100%;
            height: 70%;
          }
          
          .container.active .form-box {
            right: 0;
            bottom: 30%;
          }
          
          .toggle-box::before {
            left: 0;
            top: -270%;
            width: 100%;
            height: 300%;
          }
          
          .container.active .toggle-box::before {
            left: 0;
            top: 70%;
          }
          
          .toggle-panel {
            width: 100%;
            height: 30%;
          }
          
          .toggle-panel.toggle-left {
            top: 0;
          }
          
          .container.active .toggle-panel.toggle-left {
            left: 0;
            top: -30%;
          }
          
          .toggle-panel.toggle-right {
            right: 0;
            bottom: -30%;
          }
          
          .container.active .toggle-panel.toggle-right {
            bottom: 0;
          }
        }
        
        @media screen and (max-width: 450px) {
          .form-box {
            padding: 20px;
          }
        }
      `}</style>
      
      <div className={`container ${isActive ? 'active' : ''}`}>
        {/* Login Form */}
        <div className="form-box login">
          <div className="w-full">
            <h1 className="text-4xl font-semibold mb-4">Login</h1>
            
            <div className="relative mb-6">
              <input
                type="text"
                name="username"
                value={loginForm.username}
                onChange={handleLoginChange}
                placeholder="Username"
                className={`w-full p-4 pr-12 bg-gray-100 rounded-lg border-none outline-none text-base font-medium ${
                  errors.loginUsername ? 'border-2 border-red-500 bg-red-50' : ''
                }`}
                required
              />
              <i className="bx bxs-user absolute right-5 top-1/2 transform -translate-y-1/2 text-xl"></i>
              {errors.loginUsername && (
                <div className="text-red-500 text-xs mt-1 text-left">{errors.loginUsername}</div>
              )}
            </div>
            
            <div className="relative mb-6">
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                placeholder="Password"
                className={`w-full p-4 pr-12 bg-gray-100 rounded-lg border-none outline-none text-base font-medium ${
                  errors.loginPassword ? 'border-2 border-red-500 bg-red-50' : ''
                }`}
                required
              />
              <i className="bx bxs-lock-alt absolute right-5 top-1/2 transform -translate-y-1/2 text-xl"></i>
              {errors.loginPassword && (
                <div className="text-red-500 text-xs mt-1 text-left">{errors.loginPassword}</div>
              )}
            </div>
            
            <div className="mb-4 -mt-2">
              <a href="#" className="text-sm text-gray-600 no-underline">Forgot password?</a>
            </div>
            
            <button
              type="button"
              onClick={handleLoginSubmit}
              className="w-full h-12 bg-blue-400 text-white rounded-lg border-none cursor-pointer text-base font-semibold shadow-md hover:bg-blue-500 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
        
        {/* Registration Form */}
        <div className="form-box register">
          <div className="w-full">
            <h1 className="text-4xl font-semibold mb-4">Registration</h1>
            
            <div className="relative mb-4">
              <input
                type="text"
                name="username"
                value={registerForm.username}
                onChange={handleRegisterChange}
                placeholder="Username"
                className={`w-full p-3 pr-12 bg-gray-100 rounded-lg border-none outline-none text-base font-medium ${
                  errors.registerUsername ? 'border-2 border-red-500 bg-red-50' : ''
                }`}
                required
              />
              <i className="bx bxs-user absolute right-5 top-1/2 transform -translate-y-1/2 text-xl"></i>
              {errors.registerUsername && (
                <div className="text-red-500 text-xs mt-1 text-left">{errors.registerUsername}</div>
              )}
            </div>
            
            <div className="relative mb-4">
              <input
                type="email"
                name="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                placeholder="Email"
                className={`w-full p-3 pr-12 bg-gray-100 rounded-lg border-none outline-none text-base font-medium ${
                  errors.registerEmail ? 'border-2 border-red-500 bg-red-50' : ''
                }`}
                required
              />
              <i className="bx bxs-envelope absolute right-5 top-1/2 transform -translate-y-1/2 text-xl"></i>
              {errors.registerEmail && (
                <div className="text-red-500 text-xs mt-1 text-left">{errors.registerEmail}</div>
              )}
            </div>
            
            <div className="relative mb-4">
              <select
                name="branch"
                value={registerForm.branch}
                onChange={handleRegisterChange}
                className={`w-full p-3 pr-12 bg-gray-100 rounded-lg border-none outline-none text-base font-medium ${
                  errors.registerBranch ? 'border-2 border-red-500 bg-red-50' : ''
                } ${!registerForm.branch ? 'text-gray-500' : ''}`}
                required
              >
                <option value="">Select Branch</option>
                {branches.map((branch, index) => (
                  <option key={index} value={branch}>{branch}</option>
                ))}
              </select>
              <i className="bx bxs-graduation absolute right-5 top-1/2 transform -translate-y-1/2 text-xl"></i>
              {errors.registerBranch && (
                <div className="text-red-500 text-xs mt-1 text-left">{errors.registerBranch}</div>
              )}
            </div>
            
            <div className="relative mb-4">
              <select
                name="year"
                value={registerForm.year}
                onChange={handleRegisterChange}
                className={`w-full p-3 pr-12 bg-gray-100 rounded-lg border-none outline-none text-base font-medium ${
                  errors.registerYear ? 'border-2 border-red-500 bg-red-50' : ''
                } ${!registerForm.year ? 'text-gray-500' : ''}`}
                required
              >
                <option value="">Select Year</option>
                {years.map((year, index) => (
                  <option key={index} value={year}>{year}</option>
                ))}
              </select>
              <i className="bx bxs-calendar absolute right-5 top-1/2 transform -translate-y-1/2 text-xl"></i>
              {errors.registerYear && (
                <div className="text-red-500 text-xs mt-1 text-left">{errors.registerYear}</div>
              )}
            </div>
            
            <div className="relative mb-4">
              <input
                type="password"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                placeholder="Password"
                className={`w-full p-3 pr-12 bg-gray-100 rounded-lg border-none outline-none text-base font-medium ${
                  errors.registerPassword ? 'border-2 border-red-500 bg-red-50' : ''
                }`}
                required
              />
              <i className="bx bxs-lock-alt absolute right-5 top-1/2 transform -translate-y-1/2 text-xl"></i>
              {errors.registerPassword && (
                <div className="text-red-500 text-xs mt-1 text-left">{errors.registerPassword}</div>
              )}
            </div>
            
            <button
              type="button"
              onClick={handleRegisterSubmit}
              className="w-full h-12 bg-blue-400 text-white rounded-lg border-none cursor-pointer text-base font-semibold shadow-md hover:bg-blue-500 transition-colors"
            >
              Register
            </button>
          </div>
        </div>
        
        {/* Toggle Panel */}
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1 className="text-4xl font-semibold mb-4">Hello, Welcome!</h1>
            <p className="mb-5">Don't have an account?</p>
            <button
              className="w-40 h-12 bg-transparent border-2 border-white text-white rounded-lg cursor-pointer text-base font-semibold hover:bg-white hover:text-blue-400 transition-colors"
              onClick={() => setIsActive(true)}>
              Register
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1 className="text-4xl font-semibold mb-4">Welcome Back!</h1>
            <p className="mb-5">Already have an account?</p>
            <button
              className="w-40 h-12 bg-transparent border-2 border-white text-white rounded-lg cursor-pointer text-base font-semibold hover:bg-white hover:text-blue-400 transition-colors"
              onClick={() => setIsActive(false)}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
    </div>
  );
};

export default LoginRegisterForm;