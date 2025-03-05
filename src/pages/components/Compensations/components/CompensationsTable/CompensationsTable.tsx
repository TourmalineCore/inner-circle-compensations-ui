import clsx from 'clsx'
import moment from 'moment'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { formatMoney } from '../../../../../common/utils/formatMoney'
import { CompensationsStateContext } from '../../state/CompensationsStateContext'

export const CompensationsTable = observer(({
  className = ``,
}: {
  className?: string,
}) => {
  const compensationsState = useContext(CompensationsStateContext)
  const sortedCompensations = [
    ...compensationsState.allCompensations.list,
  ]
    .sort((firstElement, secondElement) => moment(secondElement.compensationRequestedAtUtc)
      .diff(moment(firstElement.compensationRequestedAtUtc)))

  return (
    <table
      data-cy="compensations-table"
      className={`compensations-table ${className}`}
    >
      <thead>
        <tr className="compensations-table__head"
          data-cy="compensations-table-head">
          <th className="compensations-table__column-month">Month</th>
          <th className="compensations-table__column-type">Type</th>
          <th className="compensations-table__column-quantity">Quantity</th>
          <th className="compensations-table__column-amount">Amount</th>
          <th className="compensations-table__column-comment">Comment</th>
          <th className="compensations-table__column-total-amount">Total</th>
        </tr>
      </thead>
      <tbody>
        {compensationsState.allCompensations.list.length !== 0 ? (
          <>
            {sortedCompensations.map(({
              compensationRequestedForYearAndMonth, amount, comment, quantity, isPaid, id, compensationType,
            }) => (
              <tr
                data-cy="compensations-table-column"
                className="compensations-table__column"
                key={id}
              >
                <td
                  data-cy="compensations-table-column-month"
                  className="compensations-table__column-month"
                >
                  {moment(compensationRequestedForYearAndMonth)
                    .format(`MMM YYYY`)}
                </td>

                <td
                  data-cy="compensations-table-column-type"
                  className="compensations-table__column-type"
                >
                  {compensationType}
                </td>

                <td
                  data-cy="compensations-table-column-quantity"
                  className="compensations-table__column-quantity"
                >
                  <div className="compensations-table__column-quantity--text">
                    {quantity}
                  </div>
                </td>

                <td
                  data-cy="compensations-table-column-amount"
                  className="compensations-table__column-amount"
                >
                  <div className="compensations-table__column-amount--text">
                    {formatMoney(amount)}
                  </div>
                </td>

                <td
                  data-cy="compensations-table-column-comment"
                  className="compensations-table__column-comment"
                >
                  {comment}
                </td>

                <td
                  data-cy="compensations-table-column-total-amount"
                  className={clsx(`compensations-table__column-total-amount`, {
                    'compensations-table__column-total-amount--unpaid': !isPaid,
                    'compensations-table__column-total-amount--paid': isPaid,
                  })}
                >
                  <div className="compensations-table__column-total-amount--text">
                    {formatMoney(amount * quantity)}
                  </div>
                </td>
              </tr>
            ))}

            <tr>
              <td
                data-cy="compensations-table-column-total"
                className="compensations-table__column compensations-table__column-total"
              >
                <span>Unpaid</span>
                <span
                  className="compensations-table__total"
                  data-cy="compensations-table-sum"
                >
                  {formatMoney(compensationsState.allCompensations.totalUnpaidAmount)}
                </span>
              </td>
            </tr>
          </>
        ) : (
          <tr>
            <td
              data-cy="compensations-table-no-data"
              className="compensations-table__no-data"
            >
              {compensationsState.filterTerm === `unpaid` ? `No unpaid compensation` : `No records`}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
})
