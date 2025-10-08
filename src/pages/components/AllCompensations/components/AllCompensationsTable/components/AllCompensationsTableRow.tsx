import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import { MarkAsPaidButton } from '../../AllCompensationsActions/components/MarkAsPaidButton/MarkAsPaidButton'
import { formatMoney } from '../../../../../../common/utils/formatMoney'
import { ToolTipTable } from '../../ToolTipTable/ToolTipTable'

interface AllCompensationsTableRowProps extends AllCompensationsItemType {
  onDeleteClick: OnDeleteClick,
  onTooltipShow: (row: HTMLTableRowElement, index: number) => unknown,
  onTooltipHide: (index: number) => unknown,
  showTooltip: boolean,
  rowRefs: React.MutableRefObject<(HTMLTableRowElement | null)[]>,
  tooltipRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
}

export const AllCompensationsTableRow = observer(({
  employeeId,
  employeeFullName,
  totalAmount,
  unpaidAmount,
  isSelected,
  isPaid,
  compensations,
  onDeleteClick,
  onTooltipShow,
  onTooltipHide,
  showTooltip,
  rowRefs,
  tooltipRefs,
}: AllCompensationsTableRowProps) => {
  return (
    <tr
      data-cy="all-compensations-table-row-item"
      key={employeeId}
      className={clsx(`all-compensations-table-row__item`, {
        'all-compensations-table-row__item--selected': isSelected,
      })}
    >
      <td
        data-cy="all-compensations-table-column-employee"
        className="all-compensations-table__column-employee"
      >
        {employeeFullName}
      </td>

      <td
        data-cy="all-compensations-table-column-status"
        className={clsx(`all-compensations-table__column-status`, {
          'all-compensations-table__column-status--content--unpaid': !isPaid,
          'all-compensations-table__column-status--content--paid': isPaid,
        })}
      >
        <span className="all-compensations-table__column-status--content">
          {
            isPaid
              ? `PAID`
              : `UNPAID`
          }
        </span>
      </td>

      <td
        data-cy="all-compensations-table-column-action"
        className={clsx(`all-compensations-table__column-action`, {
          'all-compensations-table__column-action--unpaid': !isPaid,
          'all-compensations-table__column-action--paid': isPaid,
        })}
      >
        <MarkAsPaidButton compensations={compensations} />
      </td>

      <td className="all-compensations-table__column-unpaid">
        <span data-cy="all-compensations-table-column-unpaid">
          {formatMoney(unpaidAmount)}
        </span>
      </td>

      <td className="all-compensations-table__column-amount">
        <span
          className="all-compensations-table-row__tooltip"
          data-cy="all-compensations-table-row-tooltip"
          onMouseEnter={(e) => onTooltipShow(e.currentTarget as HTMLTableRowElement, employeeId)}
          onMouseLeave={() => onTooltipHide(employeeId)}
          ref={(el) => (rowRefs.current[employeeId] = el as HTMLTableRowElement | null)}
        >
          <span data-cy="all-compensations-table-column-amount">
            {formatMoney(totalAmount)}
          </span>
          <div
            className="all-compensations-table-row__tooltip__item"
            data-cy="all-compensations-table-row-tooltip-item"
            ref={(el) => (tooltipRefs.current[employeeId] = el as HTMLDivElement | null)}
          >
            {
              showTooltip && (
                <ToolTipTable
                  compensations={compensations}
                  onDeleteClick={onDeleteClick}
                />
              )
            }
          </div>
        </span>
      </td>
    </tr>
  )
})
