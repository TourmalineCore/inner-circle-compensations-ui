import { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { formatMoney } from '../../../../../common/utils/formatMoney'
import { AllCompensationsStateContext } from '../../state/AllCompensationsStateContext'
import { convertAmountsToNominals } from '../../convertAmountsToNominals'
import { AllCompensationsTableRow } from './components/AllCompensationsTableRow'
import { useTooltipLogic } from './utils/useTooltipLogic'

export const AllCompensationsTable = observer(({
  className = ``,
  onDeleteClick,
}: {
  className?: string,
  onDeleteClick: OnDeleteClick,
}) => {
  const allCompensationsState = useContext(AllCompensationsStateContext)

  const {
    showTooltip,
    rowRefs,
    tooltipRefs,
    handleTooltipShow,
    handleTooltipHide,
  } = useTooltipLogic({
    dependencies: [
      allCompensationsState.allCompensations.items,
    ],
  })

  const [
    showNominalsForUnpaidAmount,
    setShowNominalsForUnpaidAmount,
  ] = useState(false)

  const totalUnpaidAmountNominals = convertAmountsToNominals({
    amounts: allCompensationsState
      .allCompensations
      .items
      .map((item) => item.unpaidAmount),
  })

  return (
    <>
      <table
        data-cy="all-compensations-table"
        className={`all-compensations-table ${className}`}
      >
        <thead>
          <tr
            className="all-compensations-table__head"
            data-cy="all-compensations-table-head"
          >
            <th className="all-compensations-table__column-employee">Name</th>
            <th className="all-compensations-table__column-status">Status</th>
            <th className="all-compensations-table__column-action" />
            <th className="all-compensations-table__column-unpaid">Unpaid</th>
            <th className="all-compensations-table__column-amount">Amount</th>
          </tr>
        </thead>

        <tbody>
          {
            allCompensationsState
              .allCompensations
              .items
              .length !== 0
              ? (
                <div className="all-compensations-table__items-list">
                  {
                    allCompensationsState
                      .allCompensations
                      .items
                      .map((item) => (
                        <AllCompensationsTableRow
                          key={item.employeeId}
                          {...item}
                          onDeleteClick={onDeleteClick}
                          onTooltipShow={handleTooltipShow}
                          onTooltipHide={handleTooltipHide}
                          showTooltip={showTooltip}
                          rowRefs={rowRefs}
                          tooltipRefs={tooltipRefs}
                        />
                      ))}
                </div>
              )
              :
              (
                <tr>
                  <td
                    data-cy="all-compensations-table-no-data"
                    className="all-compensations-table__no-data"
                  >
                    {
                      allCompensationsState.filterTerm === `unpaid`
                        ? `No unpaid compensation in this month`
                        : `No records in this month`
                    }
                  </td>
                </tr>
              )}
        </tbody>

        <tfoot>
          <tr
            className="all-compensations-table__total"
            data-cy="all-compensations-table-total"
          >
            <td
              className="all-compensations-table__column-total"
              colSpan={3}
            >
              Total compensations per month
            </td>
            <th
              className="all-compensations-table__column-unpaid__sum"
              data-cy="all-compensations-table-unpaid-sum"
              onMouseEnter={() => setShowNominalsForUnpaidAmount(true)}
              onMouseLeave={() => setShowNominalsForUnpaidAmount(false)}
            >
              {formatMoney(allCompensationsState.totalUnpaidCount)}
            </th>
            <td
              className="all-compensations-table__column-amount__sum"
              data-cy="all-compensations-table-sum"
            >
              {formatMoney(allCompensationsState.totalCount)}
            </td>
          </tr>
        </tfoot>
      </table>
      {
        showNominalsForUnpaidAmount && (
          <div
            data-cy="all-compensations-table-unpaid-sum-nominals"
          >
            {
              totalUnpaidAmountNominals
                .nominals
                .map(({
                  nominal,
                  count,
                }) => `${nominal} * ${count}`)
                .join(`, `)
            }
          </div>
        )
      }
    </>
  )
})
