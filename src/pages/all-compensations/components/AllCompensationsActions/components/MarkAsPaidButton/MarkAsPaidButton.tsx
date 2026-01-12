import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { api } from '../../../../../../common/api'
import { AllCompensationsStateContext } from '../../../../state/AllCompensationsStateContext'

export const MarkAsPaidButton = observer(({
  compensations,
}: {
  compensations: EmployeeAllCompensationsItemType[],
}) => {
  const allCompensationsState = useContext(AllCompensationsStateContext)

  return (
    <button
      className="mark-as-paid-button"
      data-cy="mark-as-paid-button"
      type="button"
      onClick={() => {
        markAsPaid(compensations)
      }}
    >
      Mark as paid
    </button>
  )

  async function markAsPaid(list: EmployeeAllCompensationsItemType[]) {
    const compensationsIds = list.map((compensation) => compensation.id)

    await api.put(`/mark-as-paid`, compensationsIds)

    allCompensationsState.updateStatus(!allCompensationsState.isChange)
  }
})
