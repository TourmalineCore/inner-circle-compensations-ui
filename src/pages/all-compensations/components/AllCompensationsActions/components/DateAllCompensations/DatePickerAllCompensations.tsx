import { HTMLProps, forwardRef, useContext } from 'react'
import DatePicker from 'react-datepicker'
import { observer } from 'mobx-react-lite'
import logoData from '../../../../../../assets/icons/logo-data-picker.svg'
import { AllCompensationsStateContext } from '../../../../state/AllCompensationsStateContext'

const DatePickerAllCompensationsCustomElement = forwardRef<HTMLButtonElement, HTMLProps<HTMLButtonElement>>(({
  value, onClick,
}, ref) => (
  <button
    type="button"
    onClick={onClick}
    ref={ref}
    className="date-picker-all-compensations__button"
    data-cy="date-picker-all-compensations-select"
  >
    <img className="date-picker-all-compensations__icon"
      src={logoData}
      width="24"
      height="24"
      alt="DataPicker" />
    <span data-cy="date-picker-all-compensations-result">{value}</span>
    <span className="date-picker-all-compensations__arrow">&or;</span>
  </button>
))

export const DatePickerAllCompensations = observer(() => {
  const allCompensationsState = useContext(AllCompensationsStateContext)

  return (
    <div
      className="date-picker-all-compensations"
      data-cy="date-picker-all-compensations"
    >
      <DatePicker
        selected={allCompensationsState.selectedDate}
        onChange={(date: Date) => allCompensationsState.updateDate(date)}
        showMonthYearPicker
        dateFormat="MMM yyyy"
        customInput={<DatePickerAllCompensationsCustomElement />}
      />
    </div>
  )
})
