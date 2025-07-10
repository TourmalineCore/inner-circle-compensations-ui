import { AllCompensationsActions } from './components/AllCompensationsActions/AllCompensationsActions'
import { AllCompensationsTable } from './components/AllCompensationsTable/AllCompensationsTable'

export function AllCompensationsContent({
  onDeleteClick,
}: {
  onDeleteClick: OnDeleteClick,
}) {
  return (
    <section data-cy="all-compensations-content">
      <AllCompensationsActions />
      <AllCompensationsTable
        onDeleteClick={onDeleteClick}
      />
    </section>
  )
}
