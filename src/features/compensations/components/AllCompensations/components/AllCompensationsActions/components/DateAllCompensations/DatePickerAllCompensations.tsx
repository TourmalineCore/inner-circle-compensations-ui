/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  HTMLProps, forwardRef, useContext,
} from 'react';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react-lite';
import AllCompensationsStateContext from '../../../../state/AllCompensationsStateContext';
import logoData from '../../../../../../../../assets/icons/logo-data-picker.svg';

const DatePickerCompensationsCustomElement = forwardRef<HTMLButtonElement, HTMLProps<HTMLButtonElement>>(({ value, onClick }, ref) => (
  <button
    type="button"
    onClick={onClick}
    ref={ref}
    className="date-picker-compensations-all__button"
    data-cy="date-picker-compensations-all-select"
  >
    <img className="date-picker-compensations-all__icon" src={logoData} width="24" height="24" alt="DataPicker" />
    <span data-cy="date-picker-compensations-all-result">{value}</span>
    <span className="date-picker-compensations-all__arrow">&or;</span>
  </button>
));

function DatePickerAllCompensations() {
  const allCompensationsState = useContext(AllCompensationsStateContext);

  return (
    <div
      className="date-picker-compensations-all"
      data-cy="date-picker-compensations-all"
    >
      <DatePicker
        selected={allCompensationsState.dateCompensation}
        onChange={(date: Date) => allCompensationsState.updateDate(date)}
        showMonthYearPicker
        dateFormat="MMM yyyy"
        customInput={<DatePickerCompensationsCustomElement />}
      />
    </div>
  );
}

export default observer(DatePickerAllCompensations);
