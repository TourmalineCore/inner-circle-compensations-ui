import { observer } from 'mobx-react-lite';
import { useContext, useMemo } from 'react';
import Compensations from './components/Compensations/Compensations';
import CompensationsAll from './components/CompensationsAll/CompensationsAll';
import CreateCompensations from './components/CreateCompensations/CreateCompensations';
import CompensationsStateContext from './components/Compensations/state/CompensationsStateContext';
import CompensationsState from './components/Compensations/state/CompensationsState';
import CompensationsAllState from './components/CompensationsAll/state/CompensationsAllState';
import CompensationsAllStateContext from './components/CompensationsAll/state/CompensationsAllStateContext';
import AccessBasedOnPemissionsStateContext from '../../routes/state/AccessBasedOnPemissionsStateContext';

function CompensationsPage() {
  const compensationsState = useMemo(
    () => new CompensationsState(),
    [],
  );
  const compensationsAllState = useMemo(
    () => new CompensationsAllState(),
    [],
  );

  const accessBasedOnPemissionsState = useContext(AccessBasedOnPemissionsStateContext);

  return (
    <CompensationsAllStateContext.Provider value={compensationsAllState}>
      <CompensationsStateContext.Provider value={compensationsState}>
        <div className="compensations-page">
          { accessBasedOnPemissionsState.accessPermissions.get('ViewPersonalCompensations') && (
            <div className="compensations-page__employee">
              <Compensations />
              <CreateCompensations />
            </div>
          )}

          { accessBasedOnPemissionsState.accessPermissions.get('CanManageCompensations') && <CompensationsAll />}
        </div>
      </CompensationsStateContext.Provider>
    </CompensationsAllStateContext.Provider>

  );
}

export default observer(CompensationsPage);
