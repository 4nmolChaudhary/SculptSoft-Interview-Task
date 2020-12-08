import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import SideBar from '../SideBar/SideBar'
import '../styles/main.css'
import usePatientDetail from '../store/PatientDetail'
import { Link, useLocation } from 'react-router-dom'

function PatientDetails() {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const { patientDetail } = usePatientDetail()
  const [header, setHeader] = useState('')
  const [accessible, setAccessiblity] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('isUserLoggedIn')) {
      setHeader(localStorage.getItem('LoggedInUserName'))
      setAccessiblity(true)
    }
  }, [])
  return accessible ? (
    <div className='main'>
      <SideBar />
      <div className='container'>
        <Header title='Patients Details' username={header} />
        <div className='breadcrumb'>
          <Link to={{ pathname: location.state.breadCrumb.route, state: location.state }} className='link'>
            {location.state.breadCrumb.name}
          </Link>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'>
            <path d='M16 12l-6 6V6z' />
          </svg>
          <div>Patient Detail</div>
        </div>
        <div className='patient-details'>
          <div>
            <span className='label'>ID :</span> {query.get('id')}
          </div>
          <div>
            <span className='label'>Name :</span> {patientDetail.name}
          </div>
          <div>
            <span className='label'>Email :</span> {patientDetail.patient?.email || patientDetail?.email}
          </div>
          <div>
            <span className='label'>Date of birth :</span> {patientDetail.patient?.dob || patientDetail?.dob}
          </div>
          <div>
            <span className='label'>Gender :</span> {patientDetail.patient?.gender || patientDetail?.gender}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='main'>Not Accessible</div>
  )
}

export default PatientDetails
