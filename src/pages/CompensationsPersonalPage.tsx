import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { Compensations } from './components/Compensations/Compensations'
import { CompensationsStateContext } from './components/Compensations/state/CompensationsStateContext'
import { CompensationsState } from './components/Compensations/state/CompensationsState'
import { CreateCompensations } from './components/CreateCompensations/CreateCompensations'

export const CompensationsPersonalPage = observer(() => {
  const compensationsState = useMemo(
    () => new CompensationsState(),
    [],
  )

  return (
    <CompensationsStateContext.Provider value={compensationsState}>
      <div className="compensations-personal-page">
        <CreateCompensations />
        <Compensations />
      </div>
    </CompensationsStateContext.Provider>
  )
})
