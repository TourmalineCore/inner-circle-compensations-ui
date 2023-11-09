import { useMemo } from 'react';
import CompensationsStateContext from './state/CompensationsStateContext';
import CompensationsState from './state/CompensationsState';
import CompensationsContent from './CompensationsContent';

function Compensations() {
  const compensationsState = useMemo(
    () => new CompensationsState(),
    [],
  );

  return (
    <CompensationsStateContext.Provider value={compensationsState}>
      <CompensationsContent />
    </CompensationsStateContext.Provider>
  );
}

export default Compensations;
