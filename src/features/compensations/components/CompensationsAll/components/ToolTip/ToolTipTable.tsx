import { observer } from 'mobx-react-lite';
import { formatMoney } from '../../../../../../common/utils/formatMoney';

function ToolTipTable({
  compensations,
}: {
  compensations: EmployeeCompensationsAllItemType[]
}) {
  return (
    <div className="compensations-tooltip-item">
      <table data-cy="compensations-tooltip-table" className="compensations-tooltip-table">
        <thead>
          <tr className="compensations-tooltip-table__head" data-cy="compensations-tooltip-table-head">
            <th className="compensations-tooltip-table__column-type">Type</th>
            <th className="compensations-tooltip-table__column-comment">Comment</th>
            <th className="compensations-tooltip-table__column-amount">Amount</th>
          </tr>
        </thead>
        <tbody>
          {compensations.map(({
            id, compensationType, comment, amount,
          }) => (
            <tr
              data-cy="compensations-tooltip-table-item"
              key={id}
              className="compensations-tooltip-table__item"
            >

              <td
                data-cy="compensations-tooltip-table-row-type"
                className="compensations-tooltip-table__column-type"
              >
                {compensationType}
              </td>

              <td
                data-cy="compensations-tooltip-table-row-comment"
                className="compensations-tooltip-table__column-comment"
              >
                {comment}
              </td>

              <td
                data-cy="compensations-tooltip-table-row-amount"
                className="compensations-tooltip-table__column-amount"
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

export default observer(ToolTipTable);
