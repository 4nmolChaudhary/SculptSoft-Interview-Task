import React from 'react'
import './header.css'

function Header({ title, username }) {
  return (
    <div className='header'>
      <div className='title'>{title}</div>
      <div className='user'>
        <div>Welcome, {username}</div>
        <div className='icon'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'>
            <path d='M4 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z' fill='rgba(157,160,164,1)' />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Header
