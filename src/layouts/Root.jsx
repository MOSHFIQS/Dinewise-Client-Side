import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const Root = () => {
  return (
    <div className="flex h-screen w-full items-center flex-col justify-between">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Root