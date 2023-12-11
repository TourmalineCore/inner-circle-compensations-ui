import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import Compensations from './components/Compensations/Compensations';
import CompensationsAll from './components/CompensationsAll/CompensationsAll';
import CreateCompensations from './components/CreateCompensations/CreateCompensations';
import CompensationsStateContext from './components/Compensations/state/CompensationsStateContext';
import CompensationsState from './components/Compensations/state/CompensationsState';
import CompensationsAllState from './components/CompensationsAll/state/CompensationsAllState';
import CompensationsAllStateContext from './components/CompensationsAll/state/CompensationsAllStateContext';

function CompensationsPage() {
  const compensationsState = useMemo(
    () => new CompensationsState(),
    [],
  );
  const compensationsAllState = useMemo(
    () => new CompensationsAllState(),
    [],
  );

  return (
    <CompensationsAllStateContext.Provider value={compensationsAllState}>
      <CompensationsStateContext.Provider value={compensationsState}>
        <div className="compensations-page">
          <div className="compensations-page__employee">
            <Compensations />
            <CreateCompensations />
          </div>
          <CompensationsAll />
        </div>
      </CompensationsStateContext.Provider>
    </CompensationsAllStateContext.Provider>

  );
}

export default observer(CompensationsPage);
