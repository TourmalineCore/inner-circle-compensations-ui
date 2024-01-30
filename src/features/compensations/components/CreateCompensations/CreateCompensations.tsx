import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { CreateCompensationsState } from './state/CreateCompensationsState';
import { CreateCompensationsStateContext } from './state/CreateCompensationsStateContext';
import { CreateCompensationsContainer } from './CreateCompensationsContainer';

export const CreateCompensations = observer(() => {
  const compensationsCreateState = useMemo(
    () => new CreateCompensationsState(),
    [],
  );

  return (
    <CreateCompensationsStateContext.Provider value={compensationsCreateState}>
      <CreateCompensationsContainer />
    </CreateCompensationsStateContext.Provider>
  );
});
