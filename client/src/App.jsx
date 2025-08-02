import ImageSlider from "./components/imageSlider"
import LandingPage from "./pages/Landing.jsx"
import {BrowserRouter , Routes , Route, Navigate}  from "react-router-dom"
import Login from "./pages/login"
import { useStore } from "./store"
import { useEffect } from "react"
import { Api } from "./API"
import Signup from "./pages/register"
import Stucture from "./pages/structure"
import LoginRegisterForm from "./pages/authentication"
import AdminLogin from "./pages/adminLogin"
import AddStudent from "./pages/sample"
import ForgetPassword from "./pages/forgetPassword.jsx"
const App = () => {
  const {userInfo , setUserInfo} = useStore() ;

  const PrivateRoute = ({children}) => {
    const {userInfo} = useStore()
    return !!userInfo ? children : <LandingPage/>
  }

  const RedirectIfAuthenticated = ({children}) => {
    const {userInfo} = useStore()
    return !userInfo ? <LandingPage /> : children
  }

  const AlreadyLoggedIn = ({children}) => {
    const {userInfo} = useStore()
    return userInfo ? userInfo.isAdmin ? <Navigate to={'/students'}/> : <Navigate to={'/'} /> : children
  }


  const getUserInfo = async () => {
    try {
      const response = await fetch(Api + "/auth/check-auth" , {credentials: "include"})
      if(response.ok){
        const data = await response.json()
        setUserInfo({...data.user})
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (userInfo === null || userInfo === undefined) {
      getUserInfo();
  }
  } , [userInfo])

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/*' element={<RedirectIfAuthenticated><Stucture/></RedirectIfAuthenticated>} />
      <Route path="/login" element={<AlreadyLoggedIn><Login/></AlreadyLoggedIn>} />
      <Route path="/forget-password" element={<AlreadyLoggedIn><ForgetPassword/></AlreadyLoggedIn>} />
      <Route path="/admin-login" element={<AlreadyLoggedIn><AdminLogin/></AlreadyLoggedIn>} />
      <Route path="/register" element={<AlreadyLoggedIn><Signup/></AlreadyLoggedIn>} />
      <Route path="/auth" element={<LoginRegisterForm/>}/>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App 
