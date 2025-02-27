import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { lazy, Suspense, useMemo } from 'react'
import { AccessBasedOnPemissionsState } from './routes/state/AccessBasedOnPemissionsState'
import { AccessBasedOnPemissionsStateContext } from './routes/state/AccessBasedOnPemissionsStateContext'
import { AllCompensationsPage } from './pages/compensations/AllCompensationsPage'
import { CompensationsPersonalPage } from './pages/compensations/CompensationsPersonalPage'
import { CompensationsPage } from './pages/compensations/CompensationsPage'

// import Sidebar from 'inner_circle_layout_ui/layout'
const Sidebar = lazy(
  async () => import(`inner_circle_layout_ui/layout`),
)

// eslint-disable-next-line import/no-default-export
export default function App() {

  const routesState = useMemo(
    () => new AccessBasedOnPemissionsState(),
    [],
  )

  return (
    <AccessBasedOnPemissionsStateContext.Provider value={routesState}>
      <BrowserRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}>
        <Routes>
          <Route
            path="/compensations/my"
            element={<CompensationsPersonalPage />}
          />
          <Route
            path="/compensations/all"
            element={<AllCompensationsPage />}
          />
          <Route
            path="/compensations/"
            element={<CompensationsPage />}
          />
        </Routes>
        {/* <Sidebar
          routesState={routesState}
        /> */}
        <Suspense fallback="loading...">
          <Sidebar
            routesState={routesState}
          />
        </Suspense>
      </BrowserRouter>
    </AccessBasedOnPemissionsStateContext.Provider>
  )
}
