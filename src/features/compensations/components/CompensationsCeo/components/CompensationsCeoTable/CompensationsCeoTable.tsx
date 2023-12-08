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
    <div
      data-cy="compensations-ceo-table"
      className={`compensations-ceo-table ${className}`}
    >
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
              <span data-cy="compensations-ceo-table-row-checkbox">
                <input
                  type="checkbox"
                  onChange={() => {
                    isSelected = !isSelected;
                  }}
                />
              </span>
              <span data-cy="compensations-ceo-table-row-employee">{employeeFullName}</span>
              <span data-cy="compensations-ceo-table-row-month">{moment(dateCompensation).format('MMMM YYYY')}</span>
              <span data-cy="compensations-ceo-table-row-date">{moment(dateCreateCompensation).format('DD.MM.YYYY')}</span>
              <span
                data-cy="compensations-ceo-table-row-comment"
                className="compensations-ceo-table__column-comment"
              >
                {comment}
              </span>
              <span
                data-cy="compensations-ceo-table-row-status"
                className={clsx('compensations-ceo-table__column-status', {
                  'compensations-ceo-table__column-status--unpaid': !isPaid,
                  'compensations-ceo-table__column-status--paid': isPaid,
                })}
              />
              <span
                data-cy="compensations-ceo-table-row-amount"
                className={clsx('compensations-ceo-table__column-amount', {
                  'compensations-ceo-table__column-amount--unpaid': !isPaid,
                  'compensations-ceo-table__column-amount--paid': isPaid,
                })}
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

    </div>
  );
}

export default observer(CompensationsCeoTable);
