import { AllCompensationsFilter } from './components/AllCompensationsFilter/AllCompensationsFilter';
import { DatePickerAllCompensations } from './components/DateAllCompensations/DatePickerAllCompensations';

export function AllCompensationsActions() {
  return (
    <div className="all-compensations-actions" data-cy="all-compensations-actions">
      <DatePickerAllCompensations />
      <AllCompensationsFilter />
    </div>
  );
}
