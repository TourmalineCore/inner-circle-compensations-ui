import {
  MouseEvent, useContext,
} from 'react';

import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import CompensationsAllStateContext from '../../../../state/CompensationsAllStateContext';

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

function CompensationsAllFilter({
  className = '',
}: {
  className?: string;
}) {
  const compensationsAllState = useContext(CompensationsAllStateContext);

  return (
    <div className={`compensations-all-filter ${className}`} data-cy="compensations-all-filter-inner">
      {filterElements.map((item) => (
        <button
          type="button"
          data-cy="compensations-all-filter"
          className={clsx('compensations-all-filter__button', {
            'compensations-all-filter__button--active': item.id === compensationsAllState.filterTerm,
          })}
          key={item.id}
          id={item.id}
          onClick={(event: MouseEvent<HTMLButtonElement>) => compensationsAllState.updateFilterTerm(event.currentTarget.id)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default observer(CompensationsAllFilter);
