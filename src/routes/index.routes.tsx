import { OAuthPopup } from '@tasoskakour/react-use-oauth2'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthScreen } from '../pages/auth.page'
import DashScreen from '../pages/dashboard.page'
import CreateServiceScreen from '../pages/dashboard.page/create-service'
import PackageScreen from '../pages/package.page'
import CreatePackageScreen from '../pages/package.page/create-package'
import Preload from '../pages/preload.page'

const IndexRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<OAuthPopup />} path="/oauth/callback" />
        <Route element={<AuthScreen />} path="/login" />
        <Route element={<DashScreen />} path="/dashboard" />
        <Route element={<CreateServiceScreen />} path="/service/create" />
        <Route element={<PackageScreen />} path="/packages" />
        <Route element={<CreatePackageScreen />} path="/package/create" />
        <Route element={<Preload />} path="/" />
      </Routes>
    </BrowserRouter>
  )
}

export default IndexRoutes
