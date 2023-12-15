import { useMemo } from 'react';
import CompensationsAllStateContext from './state/CompensationsAllStateContext';
import CompensationsAllState from './state/CompensationsAllState';
import CompensationsAllContent from './CompensationsAllContent';

function CompensationsAll() {
  const compensationsAllState = useMemo(
    () => new CompensationsAllState(),
    [],
  );

  return (
    <CompensationsAllStateContext.Provider value={compensationsAllState}>
      <CompensationsAllContent />
    </CompensationsAllStateContext.Provider>
  );
}

export default CompensationsAll;
