import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { LINK_TO_COMPENSATIONS_SERVICE, LINK_TO_SALARY_SERVICE } from '../../../../../../../../common/config/config';
import { api } from '../../../../../../../../common/api';
import AllCompensationsStateContext from '../../../../state/AllCompensationsStateContext';

function MarkAsPaidButton({
  compensations,
}: {
  compensations: EmployeeAllCompensationsItemType[]
}) {
  const allCompensationsState = useContext(AllCompensationsStateContext);

  return (
    <button
      className="mark-as-paid-button"
      data-cy="mark-as-paid-button-submit"
      type="button"
      onClick={() => {
        allCompensationsState.updateStatus(!allCompensationsState._isChange);
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
}

export default observer(MarkAsPaidButton);
