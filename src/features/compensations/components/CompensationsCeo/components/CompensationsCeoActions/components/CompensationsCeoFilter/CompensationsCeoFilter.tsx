import {
  MouseEvent, useContext,
} from 'react';

import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import CompensationsCeoStateContext from '../../../../state/CompensationsCeoStateContext';

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

function CompensationsCeoFilter({
  className = '',
}: {
  className?: string;
}) {
  const compensationsCeoState = useContext(CompensationsCeoStateContext);

  return (
    <div className={`compensations-ceo-filter ${className}`} data-cy="compensations-ceo-filter-inner">
      {filterElements.map((item) => (
        <button
          type="button"
          data-cy="compensations-ceo-filter"
          className={clsx('compensations-ceo-filter__button', {
            'compensations-ceo-filter__button--active': item.id === compensationsCeoState.filterTerm,
          })}
          key={item.id}
          id={item.id}
          onClick={(event: MouseEvent<HTMLButtonElement>) => compensationsCeoState.updateFilterTerm(event.currentTarget.id)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default observer(CompensationsCeoFilter);
