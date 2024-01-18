import AllCompensationsActions from './components/AllCompensationsActions/AllCompensationsActions';
import AllCompensationsTable from './components/AllCompensationsTable/AllCompensationsTable';

function AllCompensationsContent() {
  return (
    <section data-cy="compensations-all">
      <AllCompensationsActions />
      <AllCompensationsTable />
    </section>
  );
}

export { AllCompensationsContent };
