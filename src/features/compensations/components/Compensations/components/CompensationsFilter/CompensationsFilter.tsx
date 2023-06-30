import { Button } from '@tourmalinecore/react-tc-ui-kit';

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
  return (
    <div data-cy="compensations-filter-inner">
      {filterElements.map((item) => (
        <Button
          type="button"
          data-cy="compensations-filter"
          key={item.id}
          id={item.id}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
}

export default CompensationsFilter;
