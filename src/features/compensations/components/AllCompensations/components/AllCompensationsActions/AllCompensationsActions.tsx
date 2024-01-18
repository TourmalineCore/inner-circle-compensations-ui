import { observer } from 'mobx-react-lite';
import DateAllCompensations from './components/DateAllCompensations/DatePickerAllCompensations';
import AllCompensationsFilter from './components/AllCompensationsFilter/AllCompensationsFilter';

// TODO add SearchBarAll
function AllCompensationsActions() {
  return (
    <div className="compensation-actions" data-cy="compensation-actions">
      <div className="compensation-actions--div--left" />
      <DateAllCompensations />
      <AllCompensationsFilter />
      <div className="compensation-actions--div--right" />
    </div>
  );
}

export default observer(AllCompensationsActions);
