import { CompensationsTypesTips } from './components/CompensationsTypesTips/CompensationsTypesTips';
import { DatePickerCompensations } from './components/DateCompensations/DatePickerCompensations';
import { TableCreateCompensations } from './components/TableCreateCompensations/TableCreateCompensations';

export function CreateCompensationsContent() {
  return (
    <div>
      <CompensationsTypesTips />
      <DatePickerCompensations />
      <TableCreateCompensations />
    </div>
  );
}
