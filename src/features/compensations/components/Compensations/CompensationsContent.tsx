import { CompensationsFilter } from './components/CompensationsFilter/CompensationsFilter';
import { CompensationsTable } from './components/CompensationsTable/CompensationsTable';

export function CompensationsContent() {
  return (
    <section data-cy="compensations-content">
      <CompensationsFilter />
      <CompensationsTable />
    </section>
  );
}
