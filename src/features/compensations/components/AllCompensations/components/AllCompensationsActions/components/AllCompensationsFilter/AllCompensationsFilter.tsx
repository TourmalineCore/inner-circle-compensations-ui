import {
  MouseEvent, useContext,
} from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import AllCompensationsStateContext from '../../../../state/AllCompensationsStateContext';

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

export const AllCompensationsFilter = observer(({
  className = '',
}: {
  className?: string;
}) => {
  const allCompensationsState = useContext(AllCompensationsStateContext);

  return (
    <div className={`all-compensations-filter ${className}`} data-cy="all-compensations-filter-inner">
      {filterElements.map((item) => (
        <button
          type="button"
          data-cy="all-compensations-filter"
          className={clsx('all-compensations-filter__button', {
            'all-compensations-filter__button--active': item.id === allCompensationsState.filterTerm,
          })}
          key={item.id}
          id={item.id}
          onClick={(event: MouseEvent<HTMLButtonElement>) => allCompensationsState.updateFilterTerm(event.currentTarget.id)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
});
