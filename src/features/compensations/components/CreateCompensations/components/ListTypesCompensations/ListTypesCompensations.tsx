import { MouseEvent, useContext } from 'react';
import CreateCompensationsStateContext from '../../state/CreateCompensationsStateContext';

function ListTypesCompensations() {
  const createCompensationsState = useContext(CreateCompensationsStateContext);

  return (
    <ul data-cy="list-types-compensations">
      {createCompensationsState.allTypes.map(({ label, value }) => (
        <li key={value}>
          <button
            data-cy={`type-compensation-${value}`}
            type="button"
            id={value}
            onClick={(event: MouseEvent<HTMLButtonElement>) => createCompensationsState.addCompensation(event.currentTarget.id)}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ListTypesCompensations;
