import moment from 'moment';
import { formatMoney } from '../../../common/utils/formatMoney';

const NO_DATA = 'Not';

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
    <div data-cy="compensations-table">
      {compensations.list.length !== 0 ? (
        <>
          {compensations.list.map(({
            date, amount, comment,
          }) => (
            <div data-cy="compensations-table-row" key={date}>
              <span>{moment(date).format('MMMM YYYY')}</span>
              <span>{moment(date).format('DD.MM.YYYY')}</span>
              <span>{comment}</span>
              <span>{formatMoney(amount)}</span>
            </div>
          ))}

          <div data-cy="compensations-table-row-total">
            <span>Unpaid</span>
            <span>{formatMoney(compensations.totalUnpaidAmount)}</span>
          </div>
        </>
      ) : (
        <div data-cy="compensations-table-no-data">{NO_DATA}</div>
      ) }

    </div>
  );
}

export default CompensationsTable;
