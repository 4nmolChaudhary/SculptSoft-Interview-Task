import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Encounters from '../../Data/encounters.json'
import Table from '../Components/Table'
import '../styles/main.css'
import SideBar from '../SideBar/SideBar'
import DatePicker from 'react-date-picker'
import Select from 'react-dropdown-select'
import { format } from 'date-fns'
import { useLocation } from 'react-router-dom'
import AccessDenied from '../Components/AccessDenied'

function Encounter() {
  const location = useLocation()
  const [initialData, setInitialData] = useState([])
  const [data, setData] = useState([])
  const [header, setHeader] = useState('')
  const [startDate, setStartDate] = useState(location.state?.filters?.startDate ?? undefined)
  const [dataAfterStart, setStartDataAfterStart] = useState([])
  const [dataAfterCon, setStartDataAfterCon] = useState([])
  const [endDate, setEndDate] = useState(location.state?.filters?.endDate ?? undefined)
  const [options, setOptions] = useState([])
  const [conType, setConType] = useState(location.state?.filters?.conType ?? '')
  const [accessible, setAccessiblity] = useState(false)
  const columns = [
    { Header: 'Date of Service', accessor: 'date_of_service', Cell: ({ value }) => format(new Date(value), 'MM/dd/yyyy') },
    { Header: 'Patient Name', accessor: 'name', disableFilters: true },
    { Header: 'Consultation Type', accessor: 'consultation_type' },
  ]

  useEffect(() => {
    const modifiedData = Encounters.data.map(item => {
      return {
        id: item.id,
        date_of_service: item.date_of_service,
        consultation_type: item.consultation_type,
        patient: item.patient,
        name: `${item.patient.first_name} ${item.patient.last_name}`,
      }
    })
    const arr = [...new Set(modifiedData.map(x => x.consultation_type))]
    const options = arr.map(item => ({ label: item, value: item }))
    setOptions(options)
    setInitialData(modifiedData)
    if (localStorage.getItem('isUserLoggedIn')) {
      setHeader(localStorage.getItem('LoggedInUserName'))
      setAccessiblity(true)
    }

    // * Prepoulating data based on state passed as props
    if (location.state?.filters) {
      if (location.state?.filters?.conType) {
        const filteredData = modifiedData.filter(ec => ec.consultation_type === location.state?.filters?.conType)
        setStartDataAfterCon(filteredData)
        if (location.state?.filters?.startDate) {
          const afterStartingDate = filteredData.filter(ec => format(new Date(ec.date_of_service), 'MM/dd/yyyy') >= format(new Date(location.state?.filters?.startDate), 'MM/dd/yyyy'))
          setStartDataAfterStart(afterStartingDate)
          if (location.state?.filters?.endDate) {
            const afterEndingDate = afterStartingDate.filter(ec => format(new Date(ec.date_of_service), 'MM/dd/yyyy') <= format(new Date(location.state?.filters?.endDate), 'MM/dd/yyyy'))
            setData(afterEndingDate)
          } else setData(afterStartingDate)
        } else setData(filteredData)
      } else {
        if (location.state?.filters?.startDate) {
          const afterStartingDate = modifiedData.filter(ec => format(new Date(ec.date_of_service), 'MM/dd/yyyy') >= format(new Date(location.state?.filters?.startDate), 'MM/dd/yyyy'))
          setStartDataAfterStart(afterStartingDate)
          if (location.state?.filters?.endDate) {
            const afterEndingDate = afterStartingDate.filter(ec => format(new Date(ec.date_of_service), 'MM/dd/yyyy') <= format(new Date(location.state?.filters?.endDate), 'MM/dd/yyyy'))
            setData(afterEndingDate)
          } else setData(afterStartingDate)
        } else {
          if (location.state?.filters?.endDate) {
            const afterEndingDate = modifiedData.filter(ec => format(new Date(ec.date_of_service), 'MM/dd/yyyy') <= format(new Date(location.state?.filters?.endDate), 'MM/dd/yyyy'))
            setData(afterEndingDate)
          } else setData(modifiedData)
        }
      }
    } else {
      setData(modifiedData)
    }
  }, [location.state])

  function handleConsultationFilter(val) {
    const filteredData = val.length === 0 ? initialData : initialData.filter(ec => ec.consultation_type === val[0]?.value)
    setData(filteredData)
    setStartDataAfterCon(filteredData)
    setConType(val[0]?.value)
  }

  function handleEndDateFilter(val) {
    const x = dataAfterStart.length ? dataAfterStart : dataAfterCon.length ? dataAfterCon : initialData
    const filteredData = val === null ? x : x.filter(ec => format(new Date(ec.date_of_service), 'MM/dd/yyyy') <= format(new Date(val), 'MM/dd/yyyy'))
    setData(filteredData)
    setEndDate(val)
  }

  function handleStartDateFilter(val) {
    const x = dataAfterCon.length ? dataAfterCon : initialData
    const filteredData = val === null ? x : x.filter(ec => format(new Date(ec.date_of_service), 'MM/dd/yyyy') >= format(new Date(val), 'MM/dd/yyyy'))
    setStartDataAfterStart(filteredData)
    setData(filteredData)
    setStartDate(val)
  }

  return accessible ? (
    <div className='main'>
      <SideBar />
      <div className='container'>
        <Header title='Encounter' username={header} />
        <div className='toolbar'>
          <div>
            <div className='filter-label'>Consultation Type</div>
            <Select options={options} clearable values={[{ label: conType, value: conType }]} onChange={val => handleConsultationFilter(val)} />
          </div>
          <div>
            <div className='filter-label'>Date Of Service</div>
            <DatePicker onChange={val => handleStartDateFilter(val)} value={startDate} />
            <DatePicker onChange={val => handleEndDateFilter(val)} value={endDate} />
          </div>
        </div>
        <Table mockData={data} tableColumns={columns} filters={{ conType, startDate, endDate }} breadCrumb={{ name: 'Encounters', route: '/encounters' }} />
      </div>
    </div>
  ) : (
    <div className='main'>
      <AccessDenied />
    </div>
  )
}

export default Encounter
