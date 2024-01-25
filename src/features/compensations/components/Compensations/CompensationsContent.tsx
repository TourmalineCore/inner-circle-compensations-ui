import { CompensationsFilter } from './components/CompensationsFilter/CompensationsFilter';
import { CompensationsTable } from './components/CompensationsTable/CompensationsTable';

export function CompensationsContent() {
  return (
    <section data-cy="compensations">
      <CompensationsFilter className="compensations__filter" data-cy="compensations-filter" />
      <CompensationsTable className="compensations__table" data-cy="compensations-table" />
    </section>
  );
}
