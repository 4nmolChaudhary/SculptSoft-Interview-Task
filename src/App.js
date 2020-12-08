import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from './Components/Auth/Login'
import './App.css'
import Encounter from './Components/Encounter/Encounter'
import Patients from './Components/Patients/Patients'

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/login' />} />
          <Route path='/login' component={Login} />
          <Route path='/encounters' component={Encounter} />
          <Route path='/patients' component={Patients} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
