import { MouseEvent, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { CreateCompensationsStateContext } from '../../state/CreateCompensationsStateContext';

export const ListTypesCompensations = observer(() => {
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
            id={String(typeId)}
            onClick={(event: MouseEvent<HTMLButtonElement>) => createCompensationsState.addCompensation(Number(event.currentTarget.id))}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
});
