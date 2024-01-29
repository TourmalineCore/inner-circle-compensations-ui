import { AllCompensationsFilter } from './components/AllCompensationsFilter/AllCompensationsFilter';
import { DatePickerAllCompensations } from './components/DateAllCompensations/DatePickerAllCompensations';

// TODO add SearchBarAll
export function AllCompensationsActions() {
  return (
    <div className="compensation-actions" data-cy="compensation-actions">
      <div className="compensation-actions--left" />
      <DatePickerAllCompensations />
      <AllCompensationsFilter />
      <div className="compensation-actions--right" />
    </div>
  );
}
