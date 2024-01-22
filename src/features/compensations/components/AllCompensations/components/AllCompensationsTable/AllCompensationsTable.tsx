import clsx from 'clsx';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { formatMoney } from '../../../../../../common/utils/formatMoney';
import AllCompensationsStateContext from '../../state/AllCompensationsStateContext';
import { ToolTipTable } from '../ToolTip/ToolTipTable';
import { MarkAsPaidButton } from '../AllCompensationsActions/components/MarkAsPaidButton/MarkAsPaidButton';

export const AllCompensationsTable = observer(({
  className = '',
}: {
  className?: string;
}) => {
  const allCompensationsState = useContext(AllCompensationsStateContext);

  return (
    <table data-cy="all-compensations-table" className={`all-compensations-table ${className}`}>
      <thead>
        <tr className="all-compensations-table__head" data-cy="all-compensations-table-head">
          <th className="all-compensations-table__column-employee">Name</th>
          <th className="all-compensations-table__column-status">Status</th>
          <th className="all-compensations-table__column-action" />
          <th className="all-compensations-table__column-amount">Amount</th>
        </tr>
      </thead>
      <tbody>
        {allCompensationsState.allCompensations.items.length !== 0 ? (
          <>
            {allCompensationsState.allCompensations.items.map(({
              employeeId, employeeFullName, totalAmount, isSelected, isPaid, compensations,
            }) => (
              <tr
                data-cy="all-compensations-table-item"
                key={employeeId}
                className={clsx('all-compensations-table__item', {
                  'all-compensations-table__item--selected': isSelected,
                  'all-compensations-table__item--not-selected': !isSelected,
                })}
              >

                <td
                  data-cy="all-compensations-table-row-employee"
                  className="all-compensations-table__column-employee"
                >
                  {employeeFullName}
                </td>

                <td
                  data-cy="all-compensations-table-row-status"
                  className={clsx('all-compensations-table__column-status', {
                    'all-compensations-table__column-status--content--unpaid': !isPaid,
                    'all-compensations-table__column-status--content--paid': isPaid,
                  })}
                >
                  <span className="all-compensations-table__column-status--content">
                    {isPaid ? 'PAID' : 'UNPAID'}
                  </span>
                </td>

                <td
                  data-cy="all-compensations-table-row-action"
                  className={clsx('all-compensations-table__column-action', {
                    'all-compensations-table__column-action--unpaid': !isPaid,
                    'all-compensations-table__column-action--paid': isPaid,
                  })}
                >
                  <MarkAsPaidButton compensations={compensations} />
                </td>

                <td className="all-compensations-table__column-amount">
                  <span className="compensations-tooltip" data-cy="compensations-tooltip">
                    <span data-cy="all-compensations-table-row-amount">
                      {formatMoney(totalAmount)}
                    </span>
                    <div className="tooltip" data-cy="tooltip">
                      <ToolTipTable compensations={compensations} />
                    </div>
                  </span>
                </td>
              </tr>
            ))}
          </>
        ) : (
          <div
            data-cy="all-compensations-table-no-data"
            className="all-compensations-table__no-data"
          >
            {allCompensationsState.filterTerm === 'paid' ? 'No records in this month' : 'No unpaid compensation in this month'}
          </div>
        )}
      </tbody>
      <tfoot>
        <tr className="all-compensations-table__total" data-cy="all-compensations-table-total">
          <td className="all-compensations-table__column-total" colSpan={3}>Total compensations per month</td>
          <td className="all-compensations-table__column-amount__sum" data-cy="all-compensations-table-sum">{`${allCompensationsState.totalCount} ₽`}</td>
        </tr>
      </tfoot>
    </table>
  );
});
