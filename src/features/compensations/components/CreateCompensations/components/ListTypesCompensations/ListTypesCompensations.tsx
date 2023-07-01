import { MouseEvent, useContext } from 'react';
import CreateCompensationsStateContext from '../../state/CreateCompensationsStateContext';

function ListTypesCompensations() {
  const createCompensationsState = useContext(CreateCompensationsStateContext);

  return (
    <ul
      className="list-types-compensations"
      data-cy="list-types-compensations"
    >
      {createCompensationsState.allTypes.map(({ label, value }) => (
        <li key={value}>
          <button
            className="list-types-compensations__button"
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
