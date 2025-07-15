import ImageSlider from "./components/imageSlider"
import LandingPage from "./pages/landing"
import {BrowserRouter , Routes , Route, Navigate}  from "react-router-dom"
import Login from "./pages/login"
import Home from "./pages/home"
import { useStore } from "./store"
import { useEffect } from "react"
import { Api } from "./API"
import Signup from "./pages/register"
const App = () => {
  const {userInfo , setUserInfo} = useStore() ;

  const PrivateRoute = ({children}) => {
    const {userInfo} = useStore()
    return !!userInfo ? children : <Navigate to={'/'}/>
  }

  const RedirectIfAuthenticated = ({children}) => {
    const {userInfo} = useStore()
    return userInfo ? <Navigate to={'/home'} /> : children
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
      <Route path="/" element={<RedirectIfAuthenticated><LandingPage/></RedirectIfAuthenticated>} />
      <Route path="/login" element={<RedirectIfAuthenticated><Login/></RedirectIfAuthenticated>} />
      <Route path="/register" element={<RedirectIfAuthenticated><Signup/></RedirectIfAuthenticated>} />
      <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App 
