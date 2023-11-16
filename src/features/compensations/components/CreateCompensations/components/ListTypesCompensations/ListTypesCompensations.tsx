import { MouseEvent, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import CreateCompensationsStateContext from '../../state/CreateCompensationsStateContext';

function ListTypesCompensations() {
  const createCompensationsState = useContext(CreateCompensationsStateContext);

  return (
    <ul
      className="list-types-compensations"
      data-cy="list-types-compensations"
    >
      {createCompensationsState.allTypes.map(({ typeId, label }) => (
        <li key={typeId}>
          <button
            className="list-types-compensations__button"
            data-cy={`type-compensation-${typeId}`}
            type="button"
            id={typeId.toString()}
            onClick={(event: MouseEvent<HTMLButtonElement>) => createCompensationsState.addCompensation(Number(event.currentTarget.id))}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default observer(ListTypesCompensations);
