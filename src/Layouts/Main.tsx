import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'


const Main = () => {
  return (
    <div>  
      <div>
      <Navbar></Navbar>  
      </div>
      <div className=' mx-auto min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
    </div>
  )
}

export default Main