import { AllCompensationsActions } from './components/AllCompensationsActions/AllCompensationsActions'
import { AllCompensationsTable } from './components/AllCompensationsTable/AllCompensationsTable'

export function AllCompensationsContent() {
  return (
    <section data-cy="all-compensations-content">
      <AllCompensationsActions />
      <AllCompensationsTable />
    </section>
  )
}
