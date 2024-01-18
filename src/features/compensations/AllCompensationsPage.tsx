import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { AllCompensations } from './components/AllCompensations/AllCompensations';
import AllCompensationsState from './components/AllCompensations/state/AllCompensationsState';
import AllCompensationsStateContext from './components/AllCompensations/state/AllCompensationsStateContext';

function AllCompensationsPage() {
  const allCompensationsState = useMemo(
    () => new AllCompensationsState(),
    [],
  );

  return (
    <AllCompensationsStateContext.Provider value={allCompensationsState}>
      <AllCompensations />
    </AllCompensationsStateContext.Provider>

  );
}

export default observer(AllCompensationsPage);
