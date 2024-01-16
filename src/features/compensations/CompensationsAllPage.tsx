import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import CompensationsAll from './components/CompensationsAll/CompensationsAll';
import CompensationsAllState from './components/CompensationsAll/state/CompensationsAllState';
import CompensationsAllStateContext from './components/CompensationsAll/state/CompensationsAllStateContext';

function CompensationsAllPage() {
  const compensationsAllState = useMemo(
    () => new CompensationsAllState(),
    [],
  );

  return (
    <CompensationsAllStateContext.Provider value={compensationsAllState}>
      <CompensationsAll />
    </CompensationsAllStateContext.Provider>

  );
}

export default observer(CompensationsAllPage);
