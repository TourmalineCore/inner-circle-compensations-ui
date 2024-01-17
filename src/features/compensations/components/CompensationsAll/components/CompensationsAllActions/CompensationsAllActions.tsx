import { observer } from 'mobx-react-lite';
import DateCompensationsAll from './components/DateCompensationsAll/DatePickerCompensationsAll';
import CompensationsAllFilter from './components/CompensationsAllFilter/CompensationsAllFilter';

// TODO add SearchBarAll
function CompensationsAllActions() {
  return (
    <div className="compensation-actions" data-cy="compensation-actions">
      <div className="compensation-actions--div--left" />
      <DateCompensationsAll />
      <CompensationsAllFilter />
      <div className="compensation-actions--div--right" />
    </div>
  );
}

export default observer(CompensationsAllActions);
