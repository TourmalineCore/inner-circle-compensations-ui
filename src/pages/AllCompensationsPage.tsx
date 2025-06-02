import { useMemo } from 'react'
import { AllCompensationsStateContext } from './components/AllCompensations/state/AllCompensationsStateContext'
import { AllCompensationsState } from './components/AllCompensations/state/AllCompensationsState'
import { AllCompensationsContainer } from './components/AllCompensations/AllCompensationsContainer'

export function AllCompensationsPage() {
  const allCompensationsState = useMemo(
    () => new AllCompensationsState(),
    [],
  )

  return (
    <AllCompensationsStateContext.Provider value={allCompensationsState}>
      <AllCompensationsContainer
        onCompensationDeleted={() => allCompensationsState.triggerPageReload()}
      />
    </AllCompensationsStateContext.Provider>
  )
}
