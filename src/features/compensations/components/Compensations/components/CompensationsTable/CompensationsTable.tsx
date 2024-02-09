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
  const sortedCompensations = compensationsState.allCompensations.list
    .slice()
    .sort((firstElement, secondElement) => moment(secondElement.dateCreateCompensation).diff(moment(firstElement.dateCreateCompensation)));

  return (
    <div
      data-cy="compensations-table"
      className={`compensations-table ${className}`}
    >
      {compensationsState.allCompensations.list.length !== 0 ? (
        <>
          {sortedCompensations.map(({
            dateCompensation, amount, comment, isPaid, id, compensationType,
          }) => (
            <div
              data-cy="compensations-table-column"
              className="compensations-table__column"
              key={id}
            >
              <span
                data-cy="compensations-table-column-month"
                className="compensations-table__column-month"
              >
                {moment(dateCompensation).format('MMM YYYY')}
              </span>
              <span
                data-cy="compensations-table-column-type"
                className="compensations-table__column-type"
              >
                {compensationType}
              </span>
              <span
                data-cy="compensations-table-column-comment"
                className="compensations-table__column-comment"
              >
                {comment}
              </span>
              <span
                data-cy="compensations-table-column-amount"
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
            data-cy="compensations-table-column-total"
            className="compensations-table__column compensations-table__column-total"
          >
            <span>Unpaid</span>
            <span
              className="compensations-table__total-amount"
              data-cy="compensations-table-sum"
            >
              {formatMoney(compensationsState.allCompensations.totalUnpaidAmount)}
            </span>
          </div>
        </>
      ) : (
        <div
          data-cy="compensations-table-no-data"
          className="compensations-table__no-data"
        >
          {compensationsState.filterTerm === 'unpaid' ? 'No unpaid compensation' : 'No records' }
        </div>
      ) }

    </div>
  );
});
