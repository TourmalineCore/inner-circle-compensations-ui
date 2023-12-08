import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import CreateCompensationsStateContext from './state/CreateCompensationsStateContext';
import CreateCompensationsState from './state/CreateCompensationsState';
import CreateCompensationsContent from './CreateCompensationsContent';

function CreateCompensations() {
  const compensationsCreateState = useMemo(
    () => new CreateCompensationsState(),
    [],
  );

  return (
    <CreateCompensationsStateContext.Provider value={compensationsCreateState}>
      <CreateCompensationsContent />
    </CreateCompensationsStateContext.Provider>
  );
}

export default observer(CreateCompensations);
