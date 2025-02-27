import { BrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// import Sidebar from 'inner_circle_layout_ui/layout'
const Sidebar = lazy(
  async () => import(`inner_circle_layout_ui/layout`),
)

// eslint-disable-next-line import/no-default-export
export default function App() {
  return (
    <BrowserRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}>
      <Suspense fallback="loading...">
        <Sidebar />
      </Suspense>
    </BrowserRouter>
  )
}
