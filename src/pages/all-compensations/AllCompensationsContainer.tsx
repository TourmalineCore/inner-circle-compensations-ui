import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { api } from '../../common/api'
import { AllCompensationsContent } from './AllCompensationsContent'
import { AllCompensationsStateContext } from './state/AllCompensationsStateContext'
import { AxiosResponse } from 'axios'

export const AllCompensationsContainer = observer(() => {
  const allCompensationsState = useContext(AllCompensationsStateContext)

  useEffect(() => {
    loadCompensations()
  }, [
    allCompensationsState.isChange,
    allCompensationsState.selectedDate,
    allCompensationsState.needToReloadCompensations,
  ])

  return (
    <AllCompensationsContent
      onDeleteClick={onDeleteSelectedCompensation}
    />
  )

  async function loadCompensations() {
    const dateFilteringCompensations = allCompensationsState.monthYearDate

    const {
      data,
    } = await api.get(`/admin/all?year=${dateFilteringCompensations.year}&month=${dateFilteringCompensations.month}`)

    allCompensationsState.initialize({
      loadedCompensations: data,
    })

    allCompensationsState.setFilterTerm()
  }

  async function onDeleteSelectedCompensation({
    compensationId,
  }: {
    compensationId: number,
  }) {
    await api.delete<
      void,
      AxiosResponse<void>
    >(
      `/${compensationId}/soft-delete`,
    )

    allCompensationsState.triggerCompensationsReload()
  }
})
