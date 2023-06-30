import {
  MouseEvent, useContext,
} from 'react';

import { Button } from '@tourmalinecore/react-tc-ui-kit';
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

function CompensationsFilter() {
  const compensationsState = useContext(CompensationsStateContext);

  return (
    <div data-cy="compensations-filter-inner">
      {filterElements.map((item) => (
        <Button
          type="button"
          data-cy="compensations-filter"
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
