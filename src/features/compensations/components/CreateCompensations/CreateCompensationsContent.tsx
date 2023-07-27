import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import CreateCompensationsStateContext from './state/CreateCompensationsStateContext';
import ListTypesCompensations from './components/ListTypesCompensations/ListTypesCompensations';
import DatePickerCompensations from './components/DateCompensations/DatePickerCompensations';
import { api } from '../../../../common/api';
import { LINK_TO_COMPENSATIONS_SERVICE } from '../../../../common/config/config';

function CreateCompensationsContent() {
  const createCompensationState = useContext(CreateCompensationsStateContext);

  useEffect(() => {
    loadCompensationTypes();
  }, []);

  return (
    <div>
      <h2>New compensation</h2>
      <ListTypesCompensations />
      <DatePickerCompensations />
    </div>
  );

  async function loadCompensationTypes() {
    try {
      const { data } = await api.get(`${LINK_TO_COMPENSATIONS_SERVICE}types`);

      createCompensationState.initializeTypes({ loadedTypes: data });
    } catch {
      console.log('error');
    }
  }
}

export default observer(CreateCompensationsContent);
