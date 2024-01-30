import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { api } from '../../../../common/api';
import { LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';
import { CompensationsStateContext } from '../Compensations/state/CompensationsStateContext';
import { CreateCompensationsStateContext } from './state/CreateCompensationsStateContext';
import { CreateCompensationsContent } from './CreateCompensationsContent';

export const CreateCompensationsContainer = observer(() => {
  const createCompensationState = useContext(CreateCompensationsStateContext);
  const compensationsState = useContext(CompensationsStateContext);

  useEffect(() => {
    loadCompensationTypes();
  }, []);

  return (
    <div className="create-compensations">
      <h2 className="create-compensations__header">New compensation</h2>
      <CreateCompensationsContent />
      <div className="create-compensations__error-message" data-cy="create-compensations-error-message">
        {createCompensationState.isFilled && createCompensationState.isTriedToSubmit && ('Please fill required field')}
        {!createCompensationState.isFilled && createCompensationState.isNegative && createCompensationState.isTriedToSubmit && ('Amount can not be negative')}
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
      const { data } = await api.get(`${LINK_TO_SALARY_SERVICE}compensations/types`);

      createCompensationState.initializeTypes({ loadedTypes: data });
    } catch {
      console.log('error');
    }
  }

  async function createCompensation() {
    createCompensationState.setIsTriedToSubmit(true);

    try {
      await api.post(
        `${LINK_TO_SALARY_SERVICE}compensations/create`,
        {
          compensations: createCompensationState.allCompensations,
          dateCompensation: createCompensationState.dateCompensation,
        },
      );

      createCompensationState.removeCompensationsFromList();
      createCompensationState.setIsTriedToSubmit(false);

      const { data } = await api.get(`${LINK_TO_SALARY_SERVICE}compensations/all`);

      compensationsState.initialize({
        loadedCompensations: data,
      });
    } catch {
      console.log(createCompensationState.isFilled);
    }
  }
});
