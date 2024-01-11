import { observer } from 'mobx-react-lite';
import DateCompensationsAll from './components/DateCompensationsAll/DatePickerCompensationsAll';

// TODO add SearchBarAll, CompensationsAllFilter and MarkAsPaidButton
function CompensationsAllActions() {
  return (
    <div className="compensation-actions" data-cy="compensation-actions">
      <div className="compensation-actions--div--left" />
      <DateCompensationsAll />
      <div className="compensation-actions--div--right" />
    </div>
  );
}

export default observer(CompensationsAllActions);
