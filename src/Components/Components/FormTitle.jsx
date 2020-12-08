import React from 'react'
import '../Auth/login.css'

function FormTitle({ title, emoji }) {
  return (
    <div className='title'>
      {title}
      <span role='img' aria-label='emoji'>
        {emoji}
      </span>
    </div>
  )
}

export default FormTitle
