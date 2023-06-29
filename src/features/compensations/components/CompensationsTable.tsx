import moment from 'moment';
import { formatMoney } from '../../../common/utils/formatMoney';

type CompensationsType = {
  list: { date: string; comment: string; amount: number; isUnpaid: boolean }[],
};

function CompensationsTable({
  compensations,
}: {
  compensations: CompensationsType,
}) {
  return (
    <div data-cy="compensations-table">
      {compensations.list.map(({
        date, amount, comment,
      }) => (
        <div
          data-cy="compensations-table-row"
          key={date}
        >
          <span>{moment(date).format('MMMM YYYY')}</span>
          <span>{moment(date).format('DD.MM.YYYY')}</span>
          <span>{comment}</span>
          <span>{formatMoney(amount)}</span>
        </div>
      ))}

    </div>
  );
}

export default CompensationsTable;
