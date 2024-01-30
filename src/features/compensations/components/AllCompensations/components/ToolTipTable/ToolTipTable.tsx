import { formatMoney } from '../../../../../../common/utils/formatMoney';

export function ToolTipTable({
  compensations,
}: {
  compensations: EmployeeAllCompensationsItemType[]
}) {
  return (
    <div className="tooltip-table">
      <table data-cy="tooltip-table" className="tooltip-table__table">
        <thead>
          <tr className="tooltip-table__table__head" data-cy="tooltip-table-head">
            <th className="tooltip-table__table__column-type">Type</th>
            <th className="tooltip-table__table__column-comment">Comment</th>
            <th className="tooltip-table__table__column-amount">Amount</th>
          </tr>
        </thead>
        <tbody>
          {compensations.map(({
            id, compensationType, comment, amount,
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
                data-cy="tooltip-table-column-comment"
                className="tooltip-table__table__column-comment"
              >
                {comment}
              </td>

              <td
                data-cy="tooltip-table-column-amount"
                className="tooltip-table__table__column-amount"
              >
                {formatMoney(amount)}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
