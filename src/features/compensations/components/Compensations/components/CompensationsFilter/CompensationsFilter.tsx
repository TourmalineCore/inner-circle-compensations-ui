import {
  MouseEvent, useContext,
} from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { CompensationsStateContext } from '../../state/CompensationsStateContext';

const filterElements = [
  {
    id: 'all',
    name: 'All',
  },
  {
    id: 'unpaid',
    name: 'Unpaid',
  },
];

export const CompensationsFilter = observer(({
  className = '',
}: {
  className?: string;
}) => {
  const compensationsState = useContext(CompensationsStateContext);

  return (
    <div className={`compensations-filter ${className}`} data-cy="compensations-filter">
      {filterElements.map((item) => (
        <button
          type="button"
          data-cy="compensations-filter-button"
          className={clsx('compensations-filter__button', {
            'compensations-filter__button--active': item.id === compensationsState.filterTerm,
          })}
          key={item.id}
          id={item.id}
          onClick={(event: MouseEvent<HTMLButtonElement>) => compensationsState.updateFilterTerm(event.currentTarget.id)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
});
