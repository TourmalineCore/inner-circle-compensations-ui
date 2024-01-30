import { DatePickerCompensations } from './components/DateCompensations/DatePickerCompensations';
import { ListTypesCompensations } from './components/ListTypesCompensations/ListTypesCompensations';
import { TableCreateCompensations } from './components/TableCreateCompensations/TableCreateCompensations';

export function CreateCompensationsContent() {
  return (
    <div>
      <ListTypesCompensations />
      <DatePickerCompensations />
      <TableCreateCompensations />
    </div>
  );
}
