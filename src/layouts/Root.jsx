import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const Root = () => {
  return (
    <div className="flex flex-col justify-between">
      <Navbar />
      <div className="max-w-full overflow-x-hidden">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Root