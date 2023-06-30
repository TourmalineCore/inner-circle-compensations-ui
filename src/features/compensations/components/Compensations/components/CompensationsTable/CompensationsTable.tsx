import clsx from 'clsx';
import moment from 'moment';
import { formatMoney } from '../../../../../../common/utils/formatMoney';

const NO_DATA = 'No records in this month';

type CompensationsType = {
  list: { date: string; comment: string; amount: number; isUnpaid: boolean }[],
  totalUnpaidAmount: number;
};

function CompensationsTable({
  compensations,
}: {
  compensations: CompensationsType,
}) {
  return (
    <div
      data-cy="compensations-table"
      className="compensations-table"
    >
      {compensations.list.length !== 0 ? (
        <>
          {compensations.list.map(({
            date, amount, comment, isUnpaid,
          }) => (
            <div
              data-cy="compensations-table-row"
              className="compensations-table__row"
              key={date}
            >
              <span data-cy="compensations-table-row-month">{moment(date).format('MMMM YYYY')}</span>
              <span data-cy="compensations-table-row-date">{moment(date).format('DD.MM.YYYY')}</span>
              <span
                data-cy="compensations-table-row-comment"
                className="compensations-table__column-comment"
              >
                {comment}
              </span>
              <span
                data-cy="compensations-table-row-amount"
                className={clsx('compensations-table__column-amount compensations-table__column-amount--paid', {
                  'compensations-table__column-amount--unpaid': isUnpaid,
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
            <span className="compensations-table__total-amount">{formatMoney(compensations.totalUnpaidAmount)}</span>
          </div>
        </>
      ) : (
        <div
          data-cy="compensations-table-no-data"
          className="compensations-table__not-data"
        >
          {NO_DATA}
        </div>
      ) }

    </div>
  );
}

export default CompensationsTable;
