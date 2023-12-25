import { observer } from 'mobx-react-lite';
// import CompensationsAllFilter from './components/CompensationsAllFilter/CompensationsAllFilter';
import DateCompensationsAll from './components/DateCompensationsAll/DatePickerCompensationsAll';
// import MarkAsPaidButton from './components/MarkAsPaidButton/MarkAsPaidButton';
// import SearchBarAll from './components/SearchBarAll/SearchBarAll';

function CompensationsAllActions() {
  return (
    <div className="compensation-actions" data-cy="compensation-actions">
      {/* /<SearchBarAll /> */}
      <div className="compensation-actions--div--left" />
      <DateCompensationsAll />
      {/* <CompensationsAllFilter /> */}
      {/* <MarkAsPaidButton /> */}
      <div className="compensation-actions--div--right" />
    </div>
  );
}

export default observer(CompensationsAllActions);
