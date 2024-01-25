import clsx from 'clsx';
import moment from 'moment';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { formatMoney } from '../../../../../../common/utils/formatMoney';
import { CompensationsStateContext } from '../../state/CompensationsStateContext';

export const CompensationsTable = observer(({
  className = '',
}: {
  className?: string;
}) => {
  const compensationsState = useContext(CompensationsStateContext);

  return (
    <div
      data-cy="compensations-table"
      className={`compensations-table ${className}`}
    >
      {compensationsState.allCompensations.list.length !== 0 ? (
        <>
          {compensationsState.allCompensations.list.map(({
            dateCompensation, dateCreateCompensation, amount, comment, isPaid,
          }) => (
            <div
              data-cy="compensations-table-row"
              className="compensations-table__row"
              key={dateCreateCompensation}
            >
              <span data-cy="compensations-table-row-month">{moment(dateCompensation).format('MMMM YYYY')}</span>
              <span data-cy="compensations-table-row-date">{moment(dateCreateCompensation).format('DD.MM.YYYY')}</span>
              <span
                data-cy="compensations-table-row-comment"
                className="compensations-table__column-comment"
              >
                {comment}
              </span>
              <span
                data-cy="compensations-table-row-amount"
                className={clsx('compensations-table__column-amount', {
                  'compensations-table__column-amount--unpaid': !isPaid,
                  'compensations-table__column-amount--paid': isPaid,
                })}
              >
                {formatMoney(amount)}
              </span>
            </div>
          ))}

          <div
            data-cy="compensations-table-row-total"
            className="compensations-table__row compensations-table__row-total"
          >
            <span>Unpaid</span>
            <span className="compensations-table__total-amount" data-cy="compensations-table-sum">{formatMoney(compensationsState.allCompensations.totalUnpaidAmount)}</span>
          </div>
        </>
      ) : (
        <div
          data-cy="compensations-table-no-data"
          className="compensations-table__no-data"
        >
          {compensationsState.filterTerm === 'unpaid' ? 'No unpaid compensation in this month' : 'No records in this month' }
        </div>
      ) }

    </div>
  );
});
