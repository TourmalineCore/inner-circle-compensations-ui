import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import Compensations from './components/Compensations/Compensations';
import CompensationsCeo from './components/CompensationsCeo/CompensationsCeo';
import CreateCompensations from './components/CreateCompensations/CreateCompensations';
import CompensationsStateContext from './components/Compensations/state/CompensationsStateContext';
import CompensationsState from './components/Compensations/state/CompensationsState';
import CompensationsCeoState from './components/CompensationsCeo/state/CompensationsCeoState';
import CompensationsCeoStateContext from './components/CompensationsCeo/state/CompensationsCeoStateContext';

function CompensationsPage() {
  const compensationsState = useMemo(
    () => new CompensationsState(),
    [],
  );
  const compensationsCeoState = useMemo(
    () => new CompensationsCeoState(),
    [],
  );

  return (
    <CompensationsCeoStateContext.Provider value={compensationsCeoState}>
      <CompensationsStateContext.Provider value={compensationsState}>
        <div className="compensations-page">
          <div className="compensations-page__employee">
            <Compensations />
            <CreateCompensations />
          </div>
          <CompensationsCeo />
        </div>
      </CompensationsStateContext.Provider>
    </CompensationsCeoStateContext.Provider>

  );
}

export default observer(CompensationsPage);
