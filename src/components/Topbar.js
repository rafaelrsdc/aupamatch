import React from 'react'
import {useLocation, Link} from 'react-router-dom'

const Topbar = () => {

    const {pathname} = useLocation();

  return (
    <nav className="flex flex-auto h-16">
    <Link to="/home" className="text-lg font-semibold mx-5 my-3 text-black hover:text-black" style={{ textDecoration: 'none' }}>AupaMatch</Link>
    <div className="my-3 mr-64 navbar-nav ml-auto block">
        {pathname === "/home" && (<li className="nav-item">
          <Link to={"/login"} className="nav-link">
            <button class=" hover:bg-lime-50 text-blue-500 border-2 border-blue-500 font-bold py-1 px-4 rounded">
              Login
            </button>
          </Link>
        </li>)  }
         
    </div>
  </nav>
  )
}

export default Topbar