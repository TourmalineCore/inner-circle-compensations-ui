import { observer } from 'mobx-react-lite';
import CompensationsAllActions from './components/CompensationsAllActions/CompensationsAllActions';
import CompensationsAllTable from './components/CompensationsAllTable/CompensationsAllTable';

function CompensationsAllContent() {
  return (
    <section data-cy="compensations-all">
      <CompensationsAllActions />
      <CompensationsAllTable />
    </section>
  );
}

export default observer(CompensationsAllContent);
