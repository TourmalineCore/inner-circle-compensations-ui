import CompensationsAllFilter from './components/CompensationsAllFilter/CompensationsAllFilter';
import DateCompensationsAll from './components/DateCompensationsAll/DatePickerCompensationsAll';
import MarkAsPaidButton from './components/MarkAsPaidButton/MarkAsPaidButton';
import SearchBarAll from './components/SearchBarAll/SearchBarAll';

function CompensationsAllActions() {
  return (
    <div className="compensation-actions" data-cy="compensation-actions">
      <SearchBarAll />
      <DateCompensationsAll />
      <CompensationsAllFilter />
      <MarkAsPaidButton />
    </div>
  );
}

export default CompensationsAllActions;
