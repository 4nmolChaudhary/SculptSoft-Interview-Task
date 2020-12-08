import React from 'react'
import '../Auth/login.css'

function Select({ label, value, onChange, placeholder, options, errorObj }) {
  return (
    <div className='input'>
      <span className={!errorObj.error ? 'input-label' : 'input-label-error'}>{label}</span>
      <div className={!errorObj.error ? 'form-field' : 'form-field-error'}>
        <select value={value} onChange={onChange} placeholder={placeholder}>
          {options.map(op => (
            <option className='dropdown' value={op.value} key={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      </div>
      <div className='error' style={!errorObj.error ? { display: 'none' } : { display: 'flex' }}>
        <div className='error-icon'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'>
            <path d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z' fill='rgba(254,18,18,1)' />
          </svg>
        </div>
        <div className='error-text'>{errorObj.message}</div>
      </div>
    </div>
  )
}

export default Select
