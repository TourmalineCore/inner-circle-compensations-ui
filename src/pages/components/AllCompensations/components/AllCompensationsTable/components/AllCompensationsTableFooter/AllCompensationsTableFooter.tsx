import { observer } from 'mobx-react-lite'
import { formatMoney } from '../../../../../../../common/utils/formatMoney'

export const AllCompensationsTableFooter = observer(({
  totalUnpaidCount,
  totalCount,
  setShowNominalsForUnpaidAmount,
}: {
  totalUnpaidCount: number,
  totalCount: number,
  setShowNominalsForUnpaidAmount: (value: boolean) => unknown,
}) => {
  return (
    <tfoot>
      <tr className="all-compensations-table-footer">
        <td
          className="all-compensations-table-footer__column-total"
          colSpan={3}
        >
          Total compensations per month
        </td>
        <th
          className="column-unpaid__sum"
          data-cy="all-compensations-table-unpaid-sum"
          onMouseEnter={() => setShowNominalsForUnpaidAmount(true)}
          onMouseLeave={() => setShowNominalsForUnpaidAmount(false)}
        >
          {formatMoney(totalUnpaidCount)}
        </th>
        <td
          className="column-amount__sum"
          data-cy="all-compensations-table-sum"
        >
          {formatMoney(totalCount)}
        </td>
      </tr>
    </tfoot>
  )
})
