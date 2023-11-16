import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import CreateCompensationsStateContext from './state/CreateCompensationsStateContext';
import TableCreateCompensations from './components/TableCreateCompensations/TableCreateCompensations';
import ListTypesCompensations from './components/ListTypesCompensations/ListTypesCompensations';
import DatePickerCompensations from './components/DateCompensations/DatePickerCompensations';
import { api } from '../../../../common/api';
import { LINK_TO_COMPENSATIONS_SERVICE, LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';

function CreateCompensationsContent() {
  const createCompensationState = useContext(CreateCompensationsStateContext);

  useEffect(() => {
    loadCompensationTypes();
  }, []);

  return (
    <div className="create-compensations">
      <h2 className="create-compensations__header">New compensation</h2>
      <ListTypesCompensations />
      <DatePickerCompensations />
      <TableCreateCompensations />
      <div className="create-compensations__error-message">
        {createCompensationState.isFilled && createCompensationState.isTriedToSubmit && ('Please fill required field.')}
      </div>
      <button
        className="create-compensations__button"
        data-cy="create-compensations-submit"
        type="button"
        onClick={() => createCompensation()}
      >
        Send
      </button>
    </div>
  );

  async function loadCompensationTypes() {
    try {
      const { data } = await api.get(`${LINK_TO_SALARY_SERVICE}/compensations/types`);

      createCompensationState.initializeTypes({ loadedTypes: data });
    } catch {
      console.log('error');
    }
  }

  async function createCompensation() {
    createCompensationState.setIsTriedToSubmit(true);

    try {
      await api.post(
        `${LINK_TO_COMPENSATIONS_SERVICE}create`,
        createCompensationState.allCompensations,
      );

      createCompensationState.removeCompensationsFromList();
      createCompensationState.setIsTriedToSubmit(false);
    } catch {
      console.log(createCompensationState.isFilled);
    }
  }
}

export default observer(CreateCompensationsContent);
