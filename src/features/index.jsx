import React from 'react'
import Navbar from '../modules/Navbar'
import Header from '../modules/Header'
import getToken from '../hooks/getToken'

const DashboardLayout = ({children}) => {
  const {hideMenu} = getToken()
  return (
    <>
    <Header/>
    <div className='flex justify-baseline'>
        <Navbar/>
        <div className={`${hideMenu ? "w-full" : "w-[80%]"}  h-[89vh] overflow-y-auto`}>
            {children}
        </div>
    </div>
    </>
  )
}

export default DashboardLayout