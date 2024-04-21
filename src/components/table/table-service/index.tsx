import { ColDef } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { AgGridReact } from 'ag-grid-react'
import { columnDefs } from './constants'

import * as React from 'react'
import { useCallback, useMemo, useRef } from 'react'
import { useGetServices } from '../../../service/dashboard/dashboard.services'
import { useServiceStore } from '../../../store/services.store'
import { Input } from './styles'
const TableService: React.FC = () => {
  const { setServices } = useServiceStore()
  const { data: services } = useGetServices()

  useCallback(() => {
    setServices(services || [])
  }, [services])

  const gridRef = useRef<AgGridReact>(null)
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), [])
  const gridStyle = useMemo(() => ({ height: '600px', width: '100%' }), [])

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
    }
  }, [])

  const onFilterTextBoxChanged = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.api.setGridOption(
        'quickFilterText',
        (document.getElementById('filter-text-box') as HTMLInputElement).value,
      )
    }
  }, [gridRef.current])

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          <Input
            id="filter-text-box"
            placeholder="Search"
            variant="outlined"
            style={{ margin: '10px 0' }}
            onChange={onFilterTextBoxChanged}
          />
          <div className="ag-theme-quartz-dark" style={gridStyle}>
            <AgGridReact
              ref={gridRef}
              rowStyle={{
                fontFamily: 'Montserrat',
                fontSize: '14px',
                fontWeight: 400,
              }}
              rowData={services}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination
              paginationPageSize={10}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableService
