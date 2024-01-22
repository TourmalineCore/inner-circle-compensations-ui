import { observer } from 'mobx-react-lite';
import { LINK_TO_COMPENSATIONS_SERVICE, LINK_TO_SALARY_SERVICE } from '../../../../../../../../common/config/config';
import { api } from '../../../../../../../../common/api';

export const MarkAsPaidButton = observer(({
  compensations,
}: {
  compensations: EmployeeAllCompensationsItemType[]
}) => {
  return (
    <button
      className="mark-as-paid-button"
      data-cy="mark-as-paid-button-submit"
      type="button"
      onClick={() => {
        markAsPaid(compensations);
      }}
    >
      Mark all as paid
    </button>
  );

  async function markAsPaid(list: EmployeeAllCompensationsItemType[]) {
    const compensationsIds = list.map((compensation) => compensation.id);
    await api.put(`${LINK_TO_SALARY_SERVICE}${LINK_TO_COMPENSATIONS_SERVICE}admin/update`, compensationsIds);
  }
});
