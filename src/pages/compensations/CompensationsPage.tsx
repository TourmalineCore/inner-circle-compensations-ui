import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccessBasedOnPemissionsStateContext } from '../../routes/state/AccessBasedOnPemissionsStateContext'

export function CompensationsPage() {
  const navigate = useNavigate()
  const access = useContext(AccessBasedOnPemissionsStateContext)

  useEffect(() => {
    if (access.accessPermissions.get(`CanRequestCompensations`)) {
      navigate(`/compensations/my`)
      return
    }
    navigate(`/compensations/all`)
  }, [])

  return (
    <div>CompensationsPage</div>
  )
}
