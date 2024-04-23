import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box, IconButton } from '@mui/material'
import { ColDef } from 'ag-grid-community'
import { AgGridReact, AgGridReactProps } from 'ag-grid-react'
import * as React from 'react'
import { useCallback, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Package } from '../../../@types/packages'
import { theme } from '../../../design/theme'
import { usePackageStore } from '../../../store/package.store'
import UpdatePackageForm from '../../forms/update-package'
import ModalComponent from '../../modal'
import { Input, Text } from './styles'

const TablePackage: React.FC = () => {
  const [openModal, setOpenModal] = useState(false)
  const { packages } = usePackageStore()
  const [selectPackages, setSelectPackages] = useState<Package>({} as Package)
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

  const styles = {
    icon: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }

  const handleOpenModal = (params: any) => {
    const { data } = params
    setSelectPackages(data)
    setOpenModal(true)
  }

  const copyLinkToClipboard = (link: string) => {
    navigator.clipboard.writeText(link)
    toast.success('Link copiado para a área de transferência!')
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const versionRenderer = (params: any) => {
    const { data } = params
    const version = data?.version || ''
    console.log('🚀 ~ versionRenderer ~ version:', data?.version)

    return <Text color={theme.colors.red}>{version}</Text>
  }

  const renderActions = (params: any) => {
    const { data } = params
    const [links] = data?.links || []
    const link = links?.link || ''

    return (
      <Box sx={styles.icon}>
        <IconButton onClick={() => copyLinkToClipboard(link)}>
          <ContentCopyIcon sx={{ color: theme.colors.lightGray }} />
        </IconButton>
        <IconButton onClick={() => handleOpenModal(params)}>
          <OpenInNewIcon sx={{ color: theme.colors.lightGray }} />
        </IconButton>
      </Box>
    )
  }

  const columnDefs: AgGridReactProps['columnDefs'] = [
    {
      headerName: 'Package',
      field: 'name',
      cellStyle: { color: theme.colors.lightGray, fontWeight: 600 },
    },
    {
      headerName: 'Version',
      field: 'version',
      cellRenderer: versionRenderer,
    },

    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: renderActions,
      headerClass: 'ag-header-cell-label',
    },
  ]

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
              rowData={packages}
              animateRows
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination
              paginationPageSize={10}
            />
          </div>
        </div>
      </div>
      <ModalComponent
        open={openModal}
        onClose={handleCloseModal}
        title="Package View"
      >
        <UpdatePackageForm onClose={handleCloseModal} data={selectPackages} />
      </ModalComponent>
    </div>
  )
}

export default TablePackage
