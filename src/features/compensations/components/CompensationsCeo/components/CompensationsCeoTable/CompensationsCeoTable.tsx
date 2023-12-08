import clsx from 'clsx';
import moment from 'moment';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { formatMoney } from '../../../../../../common/utils/formatMoney';
import CompensationsCeoStateContext from '../../state/CompensationsCeoStateContext';

const NO_DATA = 'No records in this month';

function CompensationsCeoTable({
  className = '',
}: {
  className?: string;
}) {
  const compensationsCeoState = useContext(CompensationsCeoStateContext);

  let isSelected = false;

  return (
    <table data-cy="compensations-ceo-table" className={`compensations-ceo-table ${className}`}>
      <thead>
        <tr className="compensations-ceo-table__head" data-cy="table-create-compensations-head">
          <th className="compensations-ceo-table__column-checkbox" />
          <th className="compensations-ceo-table__column-employee">Name</th>
          <th className="compensations-ceo-table__column-month">Month</th>
          <th className="compensations-ceo-table__column-date">Date</th>
          <th className="compensations-ceo-table__column-comment">Comment</th>
          <th className="compensations-ceo-table__column-status">Status</th>
          <th className="compensations-ceo-table__column-amount">Amount</th>
        </tr>
      </thead>

      {compensationsCeoState.allCompensations.list.length !== 0 ? (
        <>
          {compensationsCeoState.allCompensations.list.map(({
            employeeFullName, dateCompensation, dateCreateCompensation, amount, comment, isPaid,
          }) => (
            <div
              data-cy="compensations-ceo-table-row"
              key={dateCreateCompensation}
              className={clsx('compensations-ceo-table__row', {
                'compensations-ceo-table__row--selected': isSelected,
                'compensations-ceo-table__row--not-selected': !isSelected,
              })}
            >
              <span
                data-cy="compensations-ceo-table-row-checkbox"
                className="compensations-ceo-table__column-checkbox"
              >
                <input
                  type="checkbox"
                  onChange={() => {
                    isSelected = !isSelected;
                  }}
                />
              </span>

              <span
                data-cy="compensations-ceo-table-row-employee"
                className="compensations-ceo-table__column-employee"
              >
                {employeeFullName}
              </span>

              <span
                data-cy="compensations-ceo-table-row-month"
                className="compensations-ceo-table__column-month"
              >
                {moment(dateCompensation).format('MMMM YYYY')}
              </span>

              <span
                data-cy="compensations-ceo-table-row-date"
                className="compensations-ceo-table__column-date"
              >
                {moment(dateCreateCompensation).format('DD.MM.YYYY')}
              </span>

              <span
                data-cy="compensations-ceo-table-row-comment"
                className="compensations-ceo-table__column-comment"
              >
                {comment}
              </span>

              <span
                data-cy="compensations-ceo-table-row-status"
                className={clsx('compensations-ceo-table__column-status', {
                  'compensations-ceo-table__column-status--content--unpaid': !isPaid,
                  'compensations-ceo-table__column-status--content--paid': isPaid,
                })}
              >
                <span className="compensations-ceo-table__column-status--content">
                  {isPaid ? 'PAID' : 'UNPAID'}
                </span>
              </span>

              <span
                data-cy="compensations-ceo-table-row-amount"
                className="compensations-ceo-table__column-amount"
              >
                {formatMoney(amount)}
              </span>
            </div>
          ))}

          <div
            data-cy="compensations-ceo-table-row-total"
            className="compensations-ceo-table__row compensations-ceo-table__row-total"
          >
            <span>Total compensations per month</span>
            <span className="compensations-ceo-table__total-amount">{formatMoney(compensationsCeoState.allCompensations.totalAmount)}</span>
          </div>
        </>
      ) : (
        <div
          data-cy="compensations-ceo-table-no-data"
          className="compensations-ceo-table__no-data"
        >
          {NO_DATA}
        </div>
      ) }

    </table>
  );
}

export default observer(CompensationsCeoTable);
