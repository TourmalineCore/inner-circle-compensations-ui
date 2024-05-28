/* eslint-disable @typescript-eslint/no-use-before-define */
import { HTMLProps, forwardRef, useContext } from 'react';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react-lite';
import { CreateCompensationsStateContext } from '../../state/CreateCompensationsStateContext';

const DatePickerCompensationsCustomElement = forwardRef<HTMLButtonElement, HTMLProps<HTMLButtonElement>>(({ value, onClick }, ref) => (
  <button
    type="button"
    onClick={onClick}
    ref={ref}
    className="date-picker-compensations__button"
    data-cy="date-picker-compensations-select"
  >
    <span data-cy="date-picker-compensations-result">{value}</span>
    <span className="date-picker-compensations__arrow">&or;</span>
  </button>
));

export const DatePickerCompensations = observer(() => {
  const createCompensationsState = useContext(CreateCompensationsStateContext);

  return (
    <div
      className="date-picker-compensations"
      data-cy="date-picker-compensations"
    >
      <span className="date-picker-compensations__title">Month:</span>
      <DatePicker
        selected={createCompensationsState.compensationRequestedForYearAndMonth}
        onChange={(date: Date) => createCompensationsState.updateDate(date)}
        showMonthYearPicker
        dateFormat="MMMM yyyy"
        customInput={<DatePickerCompensationsCustomElement />}
      />
    </div>
  );
});
