import React from 'react'
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <div className="hidden lg:flex fixed top-0 left-0 w-60 shadow-md bg-white h-full border-r bg-black">
        <div className="w-60 h-screen py-4 text-2xl font-semibold  bold text-center text-bold">
            <Link to="/" style={{textDecoration: 'none'}} ><p className='text-black px-7 text-left h2'>AupaMatch</p></Link>
            <ul class="relative my-8 "  >
                <li class="relative my-2">
                  <Link style={{textDecoration: 'none'}} class="flex items-center text-md py-3 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-orange-100 transition duration-300 ease-in-out" to="/" data-mdb-ripple="true" data-mdb-ripple-color="dark">Dashboard</Link>
                </li>
                <li class="relative my-2">
                  <Link style={{textDecoration: 'none'}} class="flex items-center text-md py-3 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-orange-100 transition duration-300 ease-in-out" to="/busca" data-mdb-ripple="true" data-mdb-ripple-color="dark">Busca de Vagas</Link>
                </li>
                <li class="relative my-2">
                  <Link style={{textDecoration: 'none'}} class="flex items-center text-md py-3 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-orange-100 transition duration-300 ease-in-out" to="/" data-mdb-ripple="true" data-mdb-ripple-color="dark"></Link>
                </li>
                <li class="relative my-2">
                  <Link style={{textDecoration: 'none'}} class="flex items-center text-md py-3 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-orange-100 transition duration-300 ease-in-out" to="/" data-mdb-ripple="true" data-mdb-ripple-color="dark"></Link>
                </li>
                <li class="relative my-2">
                  <Link style={{textDecoration: 'none'}} class="flex items-center text-md py-3 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-orange-100 transition duration-300 ease-in-out" to="/" data-mdb-ripple="true" data-mdb-ripple-color="dark"></Link>
                </li>
                <li class="relative my-2">
                  <Link style={{textDecoration: 'none'}} class="flex items-center text-md py-3 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-orange-100 transition duration-300 ease-in-out" to="/" data-mdb-ripple="true" data-mdb-ripple-color="dark"></Link>
                </li>
            </ul>
        </div>
  </div>
  )
}

export default Navbar