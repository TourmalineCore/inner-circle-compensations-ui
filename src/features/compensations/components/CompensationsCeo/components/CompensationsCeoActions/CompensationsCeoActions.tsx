import CompensationsCeoFilter from './components/CompensationsCeoFilter/CompensationsCeoFilter';
import DateCompensationsCeo from './components/DateCompensationsCeo/DatePickerCompensationsCeo';
import SearchBarCeo from './components/SearchBarCeo/SearchBarCeo';

function CompensationsCeoActions() {
  return (
    <div className="compensation-actions">
      <CompensationsCeoFilter />
      <DateCompensationsCeo />
      <SearchBarCeo />
    </div>
  );
}

export default CompensationsCeoActions;
