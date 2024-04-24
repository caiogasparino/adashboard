import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box, IconButton } from '@mui/material'
import { ColDef } from 'ag-grid-community'
import { AgGridReact, AgGridReactProps } from 'ag-grid-react'
import * as React from 'react'
import { useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTheme } from 'styled-components'
import { Package } from '../../../@types/packages'
import { usePackageStore } from '../../../store/package.store'
import { useThemeStore } from '../../../store/theme.store'
import UpdatePackageForm from '../../forms/update-package'
import ModalComponent from '../../modal'
import { Text } from './styles'

const TablePackage: React.FC = () => {
  const theme = useTheme()
  const [openModal, setOpenModal] = useState(false)
  const { packages } = usePackageStore()
  const [selectPackages, setSelectPackages] = useState<Package>({} as Package)
  const gridRef = useRef<AgGridReact>(null)
  const { theme: themeStore } = useThemeStore()
  const containerStyle = useMemo(() => ({ width: '100%', height: '10px' }), [])
  const gridStyle = useMemo(() => ({ height: '400px', width: '100%' }), [])

  const classNameTheme =
    themeStore === 'dark' ? 'ag-theme-quartz' : 'ag-theme-quartz-dark'

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
    }
  }, [])

  //   const onFilterTextBoxChanged = useCallback(() => {
  //     if (gridRef.current) {
  //       gridRef.current.api.setGridOption(
  //         'quickFilterText',
  //         (document.getElementById('filter-text-box') as HTMLInputElement).value,
  //       )
  //     }
  //   }, [gridRef.current])

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

    return <Text color={theme.COLORS.secondary}>{version}</Text>
  }

  const renderActions = (params: any) => {
    const { data } = params
    const [links] = data?.links || []
    const link = links?.link || ''

    return (
      <Box sx={styles.icon}>
        <IconButton onClick={() => copyLinkToClipboard(link)}>
          <ContentCopyIcon sx={{ color: theme.COLORS.gray }} />
        </IconButton>
        <IconButton onClick={() => handleOpenModal(params)}>
          <OpenInNewIcon sx={{ color: theme.COLORS.gray }} />
        </IconButton>
      </Box>
    )
  }

  const columnDefs: AgGridReactProps['columnDefs'] = [
    {
      headerName: 'Package',
      field: 'name',
      cellStyle: { color: theme.COLORS.gray, fontWeight: 600 },
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
          {/* <Input
            id="filter-text-box"
            label="Search"
            variant="outlined"
            style={{ margin: '10px 0' }}
            theme={theme}
            onChange={onFilterTextBoxChanged}
          /> */}
          <div className={classNameTheme} style={gridStyle}>
            <AgGridReact
              ref={gridRef}
              rowStyle={{
                fontFamily: 'Montserrat',
                fontSize: '14px',
                fontWeight: 400,
              }}
              //   onGridSizeChanged={onFilterTextBoxChanged}
              //   onFilterChanged={onFilterTextBoxChanged}
              rowData={packages}
              animateRows
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
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
