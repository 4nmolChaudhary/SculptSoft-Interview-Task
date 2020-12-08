import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTable, useGlobalFilter, useRowSelect, usePagination } from 'react-table'
import usePatientDetail from '../store/PatientDetail'
import './table.css'

function Table({ mockData, tableColumns, filters, breadCrumb }) {
  const columns = useMemo(() => tableColumns, [tableColumns])
  const data = useMemo(() => mockData, [mockData])
  const { setPatientDetail } = usePatientDetail()
  const { getTableProps, getTableBodyProps, headerGroups, state, page, pageOptions, nextPage, canNextPage, canPreviousPage, previousPage, prepareRow } = useTable({ columns, data }, useGlobalFilter, usePagination, useRowSelect, hooks => {
    hooks.visibleColumns.push(columns => [
      {
        id: 'goto',
        Header: 'Go To',
        accessor: 'goto',
        Cell: ({ row }) => {
          const newTo = {
            pathname: `/patients/patients-details`,
            search: `?id=${row.original.id}`,
            state: { filters, breadCrumb },
          }
          return (
            // <Link to={{ pathname: `/patients/patients-details?id=${row.original.id}`, propsData: filters }}>
            <Link to={newTo}>
              <button className='edit-button' onClick={() => fetchPatientDetails(row)}>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'>
                  <path d='M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z' />
                </svg>
              </button>
            </Link>
          )
        },
      },
      ...columns,
    ])
  })
  const { pageIndex } = state

  const fetchPatientDetails = row => {
    setPatientDetail(row.original)
  }

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='pagination'>
        <div className='details'>
          Showing {pageIndex + 1} of {pageOptions.length}
        </div>
        <div className='controls'>
          <button className='next' onClick={() => previousPage()} disabled={!canPreviousPage}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'>
              <path d='M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 9V8l-4 4 4 4v-3h4v-2h-4z' />
            </svg>
          </button>
          <button className='next' onClick={() => nextPage()} disabled={!canNextPage}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'>
              <path d='M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 9H8v2h4v3l4-4-4-4v3z' />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default Table
