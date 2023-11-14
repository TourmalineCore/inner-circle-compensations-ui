import CompensationsCeoFilter from './components/CompensationsCeoFilter/CompensationsCeoFilter';
import DateCompensationsCeo from './components/DateCompensationsCeo/DatePickerCompensationsCeo';
import MarkAsPaidButton from './components/MarkAsPaidButton/MarkAsPaidButton';
import SearchBarCeo from './components/SearchBarCeo/SearchBarCeo';

function CompensationsCeoActions() {
  return (
    <div className="compensation-actions">
      <SearchBarCeo />
      <DateCompensationsCeo />
      <CompensationsCeoFilter />
      <MarkAsPaidButton />
    </div>
  );
}

export default CompensationsCeoActions;
