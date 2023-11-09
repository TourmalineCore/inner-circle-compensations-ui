import { useMemo } from 'react';
import CreateCompensationsStateContext from './state/CreateCompensationsStateContext';
import CreateCompensationsState from './state/CreateCompensationsState';
import CreateCompensationsContent from './CreateCompensationsContent';

function CreateCompensations() {
  const compensationsState = useMemo(
    () => new CreateCompensationsState(),
    [],
  );

  return (
    <CreateCompensationsStateContext.Provider value={compensationsState}>
      <CreateCompensationsContent />
    </CreateCompensationsStateContext.Provider>
  );
}

export default CreateCompensations;
