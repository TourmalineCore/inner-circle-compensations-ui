import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { api } from '../../../common/api'
import { LINK_TO_COMPENSATIONS_SERVICE } from '../../../common/config/config'
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
  ])

  return (
    <AllCompensationsContent
      onDeleteCompensation={onDeleteCompensation}
    />
  )

  async function loadCompensations() {
    const dateFilteringCompensations = allCompensationsState.monthYearDate

    const {
      data,
    } = await api.get(`${LINK_TO_COMPENSATIONS_SERVICE}admin/all?year=${dateFilteringCompensations.year}&month=${dateFilteringCompensations.month}`)

    allCompensationsState.initialize({
      loadedCompensations: data,
    })

    allCompensationsState.setFilterTerm()
  }

  async function onDeleteCompensation(compensationId: number) {
    await api.delete<
      void,
      AxiosResponse<void>
    >(
      `${LINK_TO_COMPENSATIONS_SERVICE}${compensationId}/soft-delete`,
    )
  }
})
