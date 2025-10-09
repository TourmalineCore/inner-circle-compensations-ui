import { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { AllCompensationsStateContext } from '../../state/AllCompensationsStateContext'
import { convertAmountsToNominals } from '../../convertAmountsToNominals'
import { AllCompensationsTableRow } from './components/AllCompensationsTableRow/AllCompensationsTableRow'
import { useTooltipLogic } from './utils/useTooltipLogic'
import { AllCompensationsTableHeader } from './components/AllCompensationsTableHeader/AllCompensationsTableHeader'
import { AllCompensationsTableFooter } from './components/AllCompensationsTableFooter/AllCompensationsTableFooter'

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
        <AllCompensationsTableHeader />

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

        <AllCompensationsTableFooter
          totalUnpaidCount={allCompensationsState.totalUnpaidCount}
          totalCount={allCompensationsState.totalCount}
          setShowNominalsForUnpaidAmount={setShowNominalsForUnpaidAmount}
        />
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
