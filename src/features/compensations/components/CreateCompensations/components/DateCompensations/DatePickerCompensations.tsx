/* eslint-disable @typescript-eslint/no-use-before-define */
import { HTMLProps, forwardRef, useContext } from 'react';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react-lite';
import CreateCompensationsStateContext from '../../state/CreateCompensationsStateContext';

const DatePickerCompensationsCustomElement = forwardRef<HTMLButtonElement, HTMLProps<HTMLButtonElement>>(({ value, onClick }, ref) => (
  <button
    type="button"
    onClick={onClick}
    ref={ref}
    data-cy="date-picker-compensations-select"
  >
    <span data-cy="date-picker-compensations-result">{value}</span>
    <span>&or;</span>
  </button>
));

function DatePickerCompensations() {
  const createCompensationsState = useContext(CreateCompensationsStateContext);

  return (
    <div
      data-cy="date-picker-compensations"
    >
      <span>Month:</span>
      <DatePicker
        selected={createCompensationsState.dateCompensation}
        onChange={(date: Date) => createCompensationsState.updateDate(date)}
        showMonthYearPicker
        dateFormat="MMMM yyyy"
        customInput={<DatePickerCompensationsCustomElement />}
      />
    </div>
  );
}

export default observer(DatePickerCompensations);
