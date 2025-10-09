export const AllCompensationsTableHeader = () => {
  return (
    <thead>
      <tr className="all-compensations-table-header">
        <th className="column column--employee">Name</th>
        <th className="column column--status">Status</th>
        <th className="column column--action" />
        <th className="column column--unpaid">Unpaid</th>
        <th className="column column--amount">Amount</th>
      </tr>
    </thead>
  )
}
