import { AllCompensationsFilter } from './components/AllCompensationsFilter/AllCompensationsFilter';
import { DatePickerAllCompensations } from './components/DateAllCompensations/DatePickerAllCompensations';

// TODO add SearchBarAll
function AllCompensationsActions() {
  return (
    <div className="compensation-actions" data-cy="compensation-actions">
      <div className="compensation-actions--div--left" />
      <DatePickerAllCompensations />
      <AllCompensationsFilter />
      <div className="compensation-actions--div--right" />
    </div>
  );
}

export {
  AllCompensationsActions,
};
