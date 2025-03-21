import { BrowserRouter } from 'react-router-dom'
import { lazy, Suspense, useContext, useEffect } from 'react'
import { getPageRoutes } from './routes/pageRoutes'
import { authService } from './common/authService'

// import Layout from remote app
const Layout = lazy(
  async () => import(`inner_circle_layout_ui/layout`),
)

// eslint-disable-next-line import/no-default-export
export default function App() {

  // @ts-ignore
  const [
    token,
  ] = useContext(authService.AuthContext)

  useEffect(() => {
    if (!token) {
      window.location.href = `/auth`
    }
  }, [
    token,
  ])

  return (
    <BrowserRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}>
      <Suspense fallback="loading...">
        <Layout getPageRoutes={getPageRoutes} />
      </Suspense>
    </BrowserRouter>
  )
}
