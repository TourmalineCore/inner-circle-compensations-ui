import { BrowserRouter } from 'react-router-dom'

import { lazy, Suspense, useMemo } from 'react'
import { AccessBasedOnPemissionsState } from './routes/state/AccessBasedOnPemissionsState'
import { AccessBasedOnPemissionsStateContext } from './routes/state/AccessBasedOnPemissionsStateContext'

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
