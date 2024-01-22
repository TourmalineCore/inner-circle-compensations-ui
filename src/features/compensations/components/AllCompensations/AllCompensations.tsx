import { useMemo } from 'react';
import { AllCompensationsContainer } from './AllCompensationsContainer';
import { AllCompensationsStateContext } from './state/AllCompensationsStateContext';
import { AllCompensationsState } from './state/AllCompensationsState';

export function AllCompensations() {
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
