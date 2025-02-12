import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useMemo } from 'react'
import { withPrivateRoute } from './common/withPrivateRoute'
import Template from './template/Template'
import { AccessBasedOnPemissionsState } from './routes/state/AccessBasedOnPemissionsState'
import { AccessBasedOnPemissionsStateContext } from './routes/state/AccessBasedOnPemissionsStateContext'

import Sidebar from 'inner_circle_layout_ui/layout'

const WithPrivateRoute = withPrivateRoute(Template)

// eslint-disable-next-line import/no-default-export
export default function App() {

  const routesState = useMemo(
    () => new AccessBasedOnPemissionsState(),
    [],
  )

  return (
    <AccessBasedOnPemissionsStateContext.Provider value={routesState}>
      <BrowserRouter>
        <Routes>
          <Route path="/*"
            element={<WithPrivateRoute />} />
        </Routes>
        <Sidebar
          routesState={routesState} />
      </BrowserRouter>
    </AccessBasedOnPemissionsStateContext.Provider>
  )
}
