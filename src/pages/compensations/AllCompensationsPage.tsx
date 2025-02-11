import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { AllCompensations } from './components/AllCompensations/AllCompensations'
import { AllCompensationsStateContext } from './components/AllCompensations/state/AllCompensationsStateContext'
import { AllCompensationsState } from './components/AllCompensations/state/AllCompensationsState'

export const AllCompensationsPage = observer(() => {
  const allCompensationsState = useMemo(
    () => new AllCompensationsState(),
    [],
  )

  return (
    <AllCompensationsStateContext.Provider value={allCompensationsState}>
      <AllCompensations />
    </AllCompensationsStateContext.Provider>
  )
})
