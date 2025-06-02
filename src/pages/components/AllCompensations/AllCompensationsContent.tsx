import { AllCompensationsActions } from './components/AllCompensationsActions/AllCompensationsActions'
import { AllCompensationsTable } from './components/AllCompensationsTable/AllCompensationsTable'

export function AllCompensationsContent({
  onDeleteSelectedCompensation,
}: {
  onDeleteSelectedCompensation: (compensationId: number) => unknown,
}) {
  return (
    <section data-cy="all-compensations-content">
      <AllCompensationsActions />
      <AllCompensationsTable
        onDeleteSelectedCompensation={onDeleteSelectedCompensation}
      />
    </section>
  )
}
