import React, { useState } from 'react'
import './sidebar.css'
import { Link, useLocation, Redirect } from 'react-router-dom'

function SideBar() {
  const { pathname } = useLocation()
  const routeName = pathname.split('/').slice(-1)[0]
  const [redirect, setRedirect] = useState(false)

  const logOut = () => {
    localStorage.removeItem('isUserLoggedIn')
    localStorage.removeItem('LoggedInUserName')
    setRedirect(true)
  }

  return redirect === false ? (
    <div className='sidebar'>
      <div>
        <Link to={`/encounters`} className='link'>
          <button className={routeName === 'encounters' ? 'active' : ''}>Encounters</button>
        </Link>
        <Link to={`/patients`} className='link'>
          <button className={routeName === 'patients' ? 'active' : ''}>Patients</button>
        </Link>
      </div>
      <button className='log-out' onClick={logOut}>
        Log Out
      </button>
    </div>
  ) : (
    <Redirect to='/login' />
  )
}

export default SideBar
