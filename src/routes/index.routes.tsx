import { OAuthPopup } from '@tasoskakour/react-use-oauth2'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthScreen } from '../pages/auth.page'
import { DashScreen } from '../pages/dashboard.page'
import { LogoutScreen } from '../pages/logout.page'
import { PackageScreen } from '../pages/package.page'
import { Preload } from '../pages/preload.page'

const IndexRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<OAuthPopup />} path="/oauth/callback" />
        <Route element={<AuthScreen />} path="/login" />
        <Route element={<LogoutScreen />} path="/logout" />
        <Route element={<DashScreen />} path="/dashboard" />
        <Route element={<PackageScreen />} path="/packages" />
        <Route element={<Preload />} path="/" />
      </Routes>
    </BrowserRouter>
  )
}

export default IndexRoutes
