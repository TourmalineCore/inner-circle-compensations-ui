/* eslint-disable @typescript-eslint/no-use-before-define */
import { HTMLProps, forwardRef, useContext } from 'react';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react-lite';
import CompensationsCeoStateContext from '../../../../state/CompensationsCeoStateContext';

import logoData from '../../../../../../../../assets/icons/logo-data-picker.svg';

const DatePickerCompensationsCustomElement = forwardRef<HTMLButtonElement, HTMLProps<HTMLButtonElement>>(({ value, onClick }, ref) => (
  <button
    type="button"
    onClick={onClick}
    ref={ref}
    className="date-picker-compensations-ceo__button"
    data-cy="date-picker-compensations-ceo-select"
  >
    <img className="date-picker-compensations-ceo__icon" src={logoData} width="24" height="24" alt="DataPicker" />
    <span data-cy="date-picker-compensations-ceo-result">{value}</span>
    <span className="date-picker-compensations-ceo__arrow">&or;</span>
  </button>
));

function DatePickerCompensationsCeo() {
  const compensationsCeoState = useContext(CompensationsCeoStateContext);

  return (
    <div
      className="date-picker-compensations-ceo"
      data-cy="date-picker-compensations-ceo"
    >
      <DatePicker
        selected={compensationsCeoState.dateCompensation}
        onChange={(date: Date) => compensationsCeoState.updateDate(date)}
        showMonthYearPicker
        dateFormat="MMM yyyy"
        customInput={<DatePickerCompensationsCustomElement />}
      />
    </div>
  );
}

export default observer(DatePickerCompensationsCeo);
