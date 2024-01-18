import { useMemo } from 'react';
import AllCompensationsStateContext from './state/AllCompensationsStateContext';
import AllCompensationsState from './state/AllCompensationsState';
import { AllCompensationsContainer } from './AllCompensationsContainer';

function AllCompensations() {
  const allCompensationsState = useMemo(
    () => new AllCompensationsState(),
    [],
  );

  return (
    <AllCompensationsStateContext.Provider value={allCompensationsState}>
      <AllCompensationsContainer />
    </AllCompensationsStateContext.Provider>
  );
}

export { AllCompensations };
