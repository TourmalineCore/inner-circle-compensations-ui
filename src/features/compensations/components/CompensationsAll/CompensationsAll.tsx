import { useMemo } from 'react';
import CompensationsAllStateContext from './state/CompensationsAllStateContext';
import CompensationsAllState from './state/CompensationsAllState';
import { CompensationsAllContainer } from './CompensationsAllContainer';

function CompensationsAll() {
  const compensationsAllState = useMemo(
    () => new CompensationsAllState(),
    [],
  );

  return (
    <CompensationsAllStateContext.Provider value={compensationsAllState}>
      <CompensationsAllContainer />
    </CompensationsAllStateContext.Provider>
  );
}

export { CompensationsAll };
