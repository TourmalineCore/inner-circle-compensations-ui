import clsx from 'clsx';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { formatMoney } from '../../../../../../common/utils/formatMoney';
import { ToolTipTable } from '../ToolTipTable/ToolTipTable';
import { MarkAsPaidButton } from '../AllCompensationsActions/components/MarkAsPaidButton/MarkAsPaidButton';
import { AllCompensationsStateContext } from '../../state/AllCompensationsStateContext';

export const AllCompensationsTable = observer(({
  className = '',
}: {
  className?: string;
}) => {
  const allCompensationsState = useContext(AllCompensationsStateContext);

  return (
    <table data-cy="all-compensations-table" className={`all-compensations-table ${className}`}>
      <thead className="all-compensations-table__table-header">
        <tr className="all-compensations-table__head" data-cy="all-compensations-table-head">
          <th className="all-compensations-table__column-employee">Name</th>
          <th className="all-compensations-table__column-status">Status</th>
          <th className="all-compensations-table__column-action" />
          <th className="all-compensations-table__column-unpaid">Unpaid</th>
          <th className="all-compensations-table__column-amount">Amount</th>
        </tr>
      </thead>

      <tbody>
        {allCompensationsState.allCompensations.items.length !== 0 ? (
          <div className="all-compensations-table__items-list">
            {allCompensationsState.allCompensations.items.map(({
              employeeId, employeeFullName, totalAmount, unpaidAmount, isSelected, isPaid, compensations,
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
                  data-cy="all-compensations-table-column-employee"
                  className="all-compensations-table__column-employee"
                >
                  {employeeFullName}
                </td>

                <td
                  data-cy="all-compensations-table-column-status"
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
                  data-cy="all-compensations-table-column-action"
                  className={clsx('all-compensations-table__column-action', {
                    'all-compensations-table__column-action--unpaid': !isPaid,
                    'all-compensations-table__column-action--paid': isPaid,
                  })}
                >
                  <MarkAsPaidButton compensations={compensations} />
                </td>

                <td className="all-compensations-table__column-unpaid">
                  <span data-cy="all-compensations-table-column-unpaid">
                    {formatMoney(unpaidAmount)}
                  </span>
                </td>

                <td className="all-compensations-table__column-amount">
                  <span className="all-compensations-table__tooltip" data-cy="all-compensations-table-tooltip">
                    <span data-cy="all-compensations-table-column-amount">
                      {formatMoney(totalAmount)}
                    </span>
                    <div className="all-compensations-table__tooltip__item" data-cy="all-compensations-table-tooltip-item">
                      <ToolTipTable compensations={compensations} />
                    </div>
                  </span>
                </td>
              </tr>
            ))}
          </div>
        ) : (
          <div
            data-cy="all-compensations-table-no-data"
            className="all-compensations-table__no-data"
          >
            {allCompensationsState.filterTerm === 'unpaid' ? 'No unpaid compensation in this month' : 'No records in this month' }
          </div>
        )}
      </tbody>

      <tfoot>
        <tr className="all-compensations-table__total" data-cy="all-compensations-table-total">
          <td className="all-compensations-table__column-total" colSpan={3}>Total compensations per month</td>
          <th className="all-compensations-table__column-unpaid__sum" data-cy="all-compensations-table-unpaid-sum">{formatMoney(allCompensationsState.totalUnpaidCount)}</th>
          <td className="all-compensations-table__column-amount__sum" data-cy="all-compensations-table-sum">{formatMoney(allCompensationsState.totalCount)}</td>
        </tr>
      </tfoot>
    </table>
  );
});
