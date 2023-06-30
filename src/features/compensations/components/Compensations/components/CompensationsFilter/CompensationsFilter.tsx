import {
  MouseEvent, useContext,
} from 'react';

import { Button } from '@tourmalinecore/react-tc-ui-kit';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import CompensationsStateContext from '../../state/CompensationsStateContext';

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

function CompensationsFilter({
  className = '',
}: {
  className?: string;
}) {
  const compensationsState = useContext(CompensationsStateContext);

  return (
    <div className={`compensations-filter ${className}`} data-cy="compensations-filter-inner">
      {filterElements.map((item) => (
        <Button
          type="button"
          data-cy="compensations-filter"
          className={clsx('compensations-filter__button', {
            'compensations-filter__button--active': item.id === compensationsState.filterTerm,
          })}
          key={item.id}
          id={item.id}
          onClick={(event: MouseEvent<HTMLButtonElement>) => compensationsState.updateFilterTerm(event.currentTarget.id)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
}

export default observer(CompensationsFilter);
