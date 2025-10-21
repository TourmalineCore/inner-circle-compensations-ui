import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { CompensationsContainer } from './sections/compensations/CompensationsContainer'
import { CompensationsState } from './sections/compensations/state/CompensationsState'
import { CompensationsStateContext } from './sections/compensations/state/CompensationsStateContext'
import { CreateCompensations } from './sections/create-compensations/CreateCompensations'

export const CompensationsPage = observer(() => {
  const compensationsState = useMemo(
    () => new CompensationsState(),
    [],
  )

  return (
    <CompensationsStateContext.Provider value={compensationsState}>
      <div className="compensations-personal-page">
        <CreateCompensations />
        <CompensationsContainer />
      </div>
    </CompensationsStateContext.Provider>
  )
})
