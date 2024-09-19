import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'


const Main = () => {
  return (
    <div>  
      <div>
      <Navbar></Navbar>  
      </div>
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
    </div>
  )
}

export default Main