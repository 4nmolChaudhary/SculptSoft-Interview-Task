import React, { useState, useEffect } from 'react'
import './login.css'
import { Redirect } from 'react-router-dom'
import { nameValidation, passwordValidation } from './validations'
import TextInput from '../Components/TextInput'

function Login() {
  const [isLoginInvalid, setLogin] = useState(false)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState({ error: false })
  const [passwordError, setPasswordError] = useState({ error: false })
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    localStorage.getItem('isUserLoggedIn') && setRedirect(true)
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    setNameError(nameValidation(name))
    setPasswordError(passwordValidation(password))
    if (!nameValidation(name).error && !passwordValidation(password).error) {
      if (password === '12345678') {
        setLogin(false)
        setRedirect(true)
        localStorage.setItem('isUserLoggedIn', true)
        localStorage.setItem('LoggedInUserName', name)
      } else setLogin(true)
      console.log('login successful')
    }
  }

  return redirect === false ? (
    <div className='auth'>
      <div className='main'>
        <div className='form_container'>
          <div className='title'>Welcome ! </div>
          <div className='form'>
            <form onSubmit={handleSubmit}>
              <TextInput type='text' value={name} onChange={e => setName(e.target.value)} placeholder='Example : John Doe' label='User Name' errorObj={nameError} />
              <TextInput type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Default: 12345678' label='Password' errorObj={passwordError} />
              {isLoginInvalid && (
                <div className='login-error'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                    <path d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z' />
                  </svg>
                  <div className='login-error-text'>Username or Password is incorrect !</div>
                </div>
              )}
              <button type='submit'>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to='/encounters' />
  )
}

export default Login
