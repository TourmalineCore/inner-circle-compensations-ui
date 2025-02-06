import { formatMoney } from '../../../../../../common/utils/formatMoney'

export function ToolTipTable({
  compensations,
}: {
  compensations: EmployeeAllCompensationsItemType[],
}) {
  return (
    <div className="tooltip-table">
      <table data-cy="tooltip-table"
        className="tooltip-table__table">
        <thead>
          <tr className="tooltip-table__table__head"
            data-cy="tooltip-table-head">
            <th className="tooltip-table__table__column-type">Type</th>
            <th className="tooltip-table__table__column-quantity">Quantity</th>
            <th className="tooltip-table__table__column-amount">Amount</th>
            <th className="tooltip-table__table__column-comment">Comment</th>
            <th className="tooltip-table__table__column-total-amount">Total</th>
          </tr>
        </thead>
        <tbody>
          {compensations.map(({
            id, compensationType, quantity, amount, comment,
          }) => (
            <tr
              data-cy="tooltip-table-item"
              key={id}
              className="tooltip-table__table__item"
            >

              <td
                data-cy="tooltip-table-column-type"
                className="tooltip-table__table__column-type"
              >
                {compensationType}
              </td>

              <td
                data-cy="tooltip-table-column-quantity"
                className="tooltip-table__table__column-quantity"
              >
                {quantity}
              </td>

              <td
                data-cy="tooltip-table-column-amount"
                className="tooltip-table__table__column-amount"
              >
                {formatMoney(amount)}
              </td>

              <td
                data-cy="tooltip-table-column-comment"
                className="tooltip-table__table__column-comment"
              >
                {comment}
              </td>

              <td
                data-cy="tooltip-table-column-total-amount"
                className="tooltip-table__table__column-total-amount"
              >
                {formatMoney(quantity * amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
