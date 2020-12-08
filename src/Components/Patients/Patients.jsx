import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import PatientsData from '../../Data/patients.json'
import Table from '../Components/Table'
import SideBar from '../SideBar/SideBar'
import '../styles/main.css'
import Select from 'react-dropdown-select'
import { Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import PatientDetails from '../PatientDetails/PatientDetails'
import AccessDenied from '../Components/AccessDenied'

function Patients() {
  const [header, setHeader] = useState('')
  const [accessible, setAccessiblity] = useState(false)
  const location = useLocation()
  const [initialData, setInitialData] = useState([])

  const [refProgram, setRefProgram] = useState(location.state?.filters?.refProgram ?? '')
  const [refProgramOption, setRefProgramOption] = useState([])
  const [gender, setGender] = useState(location.state?.filters?.gender ?? null)
  const [genderOption, setGenderOption] = useState([])
  const [dataAfterRefFilter, setStartDataAfterRefFilter] = useState([])

  const columns = [
    { Header: 'Email', accessor: 'email' },
    { Header: 'Patient Name', accessor: 'name' },
    { Header: 'Gender', accessor: 'gender' },
    { Header: 'Referal Program', accessor: 'referral_program' },
  ]

  const [data, setData] = useState([])
  useEffect(() => {
    if (localStorage.getItem('isUserLoggedIn')) {
      setHeader(localStorage.getItem('LoggedInUserName'))
      setAccessiblity(true)
    }
    const modifiedData = PatientsData.data.map(item => {
      return {
        id: item.id,
        email: item.email,
        gender: item.gender,
        referral_program: item.referral_program,
        dob: item.dob,
        name: `${item.first_name} ${item.last_name}`,
      }
    })
    setInitialData(modifiedData)
    const arr = [...new Set(modifiedData.map(x => x.referral_program))]
    const optionsforRefProgram = arr.map(item => ({ label: item, value: item }))
    setRefProgramOption(optionsforRefProgram)
    const brr = [...new Set(modifiedData.map(x => x.gender))]
    const optionsforGender = brr.map(item => ({ label: item, value: item }))
    setGenderOption(optionsforGender)

    // * Prepoulating data based on state passed as props
    if (location.state?.breadCrumb.name === 'Patients') {
      if (location.state?.filters) {
        if (location.state?.filters?.refProgram) {
          const afterRefFilteredData = modifiedData.filter(ec => ec.referral_program === location.state?.filters?.refProgram)
          setStartDataAfterRefFilter(afterRefFilteredData)
          if (location.state?.filters?.gender !== null && location.state?.filters?.gender?.length !== 0) {
            const filter = []
            location.state?.filters?.gender?.forEach(element => filter.push(element.value))
            const filteredData = afterRefFilteredData.filter(ec => filter.includes(ec.gender))
            setData(filteredData)
          } else {
            setData(afterRefFilteredData)
          }
        } else {
          if (location.state?.filters?.gender !== null && location.state?.filters?.gender?.length !== 0) {
            const filter = []
            location.state?.filters?.gender.forEach(element => filter.push(element.value))
            const filteredData = modifiedData.filter(ec => filter.includes(ec.gender))
            setData(filteredData)
          } else setData(modifiedData)
        }
      } else {
        setData(modifiedData)
      }
    } else setData(modifiedData)
  }, [location.state])

  function handleReferalProgramFilter(val) {
    const filteredData = val.length === 0 ? initialData : initialData.filter(ec => ec.referral_program === val[0]?.value)
    setData(filteredData)
    setStartDataAfterRefFilter(filteredData)
    setRefProgram(val[0]?.value)
  }
  function handleGenderFilter(val) {
    const filter = []
    val.forEach(element => filter.push(element.value))
    const x = dataAfterRefFilter.length ? dataAfterRefFilter : initialData
    const filteredData = val.length === 0 ? x : x.filter(ec => filter.includes(ec.gender))
    setData(filteredData)
    setGender(val)
  }

  return accessible ? (
    location.pathname.split('/')[2] === undefined ? (
      <div className='main'>
        <SideBar />
        <div className='container'>
          <Header title='Patients' username={header} />
          <div className='toolbar'>
            <div>
              <div className='filter-label'>Referal Program</div>
              <Select options={refProgramOption} clearable values={[{ label: refProgram, value: refProgram }]} onChange={val => handleReferalProgramFilter(val)} />
            </div>
            <div>
              <div className='filter-label'>Gender</div>
              <Select multi options={genderOption} clearable values={gender?.filter(item => item.label !== null)} onChange={val => handleGenderFilter(val)} />
            </div>
          </div>
          <Table mockData={data} tableColumns={columns} filters={{ refProgram, gender }} breadCrumb={{ name: 'Patients', route: '/patients' }} />
        </div>
      </div>
    ) : (
      <Route path='/patients/patients-details' component={PatientDetails} />
    )
  ) : (
    <div className='main'>
      <AccessDenied />
    </div>
  )
}

export default Patients
