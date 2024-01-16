import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import Compensations from './components/Compensations/Compensations';
import CreateCompensations from './components/CreateCompensations/CreateCompensations';
import CompensationsStateContext from './components/Compensations/state/CompensationsStateContext';
import CompensationsState from './components/Compensations/state/CompensationsState';

function CompensationsPersonalPage() {
  const compensationsState = useMemo(
    () => new CompensationsState(),
    [],
  );

  return (
    <CompensationsStateContext.Provider value={compensationsState}>
      <div className="compensations-page__employee">
        <Compensations />
        <CreateCompensations />
      </div>
    </CompensationsStateContext.Provider>

  );
}

export default observer(CompensationsPersonalPage);
