import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import CreateCompensationsStateContext from './state/CreateCompensationsStateContext';
import TableCreateCompensations from './components/TableCreateCompensations/TableCreateCompensations';
import ListTypesCompensations from './components/ListTypesCompensations/ListTypesCompensations';
import DatePickerCompensations from './components/DateCompensations/DatePickerCompensations';
import { api } from '../../../../common/api';
import { LINK_TO_COMPENSATIONS_SERVICE } from '../../../../common/config/config';

const INITIAL_TYPES = [
  {
    typeId: 1,
    label: 'English',
  },
  {
    typeId: 2,
    label: 'German',
  },
  {
    typeId: 3,
    label: 'Swimming',
  },
  {
    typeId: 4,
    label: 'Water',
  },
  {
    typeId: 5,
    label: 'Coworking',
  },
  {
    typeId: 6,
    label: 'Massage',
  },
  {
    typeId: 7,
    label: 'Products',
  },
  {
    typeId: 8,
    label: 'Consumables',
  },
  {
    typeId: 9,
    label: 'Periphery',
  },
  {
    typeId: 10,
    label: 'Business trip',
  },
  {
    typeId: 11,
    label: 'Other',
  },
];

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
      const { data } = await api.get(`${LINK_TO_COMPENSATIONS_SERVICE}types`);

      createCompensationState.initializeTypes({ loadedTypes: data });
    } catch {
      console.log('error');
      createCompensationState.initializeTypes({ loadedTypes: INITIAL_TYPES });
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
