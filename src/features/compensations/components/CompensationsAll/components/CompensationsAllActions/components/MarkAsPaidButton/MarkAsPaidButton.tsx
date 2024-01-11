import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import CompensationsAllStateContext from '../../../../state/CompensationsAllStateContext';
import { LINK_TO_COMPENSATIONS_SERVICE, LINK_TO_SALARY_SERVICE } from '../../../../../../../../common/config/config';
import { api } from '../../../../../../../../common/api';

function MarkAsPaidButton() {
  const compensationsAllState = useContext(CompensationsAllStateContext);

  return (
    <button
      className="mark-as-paid-button"
      data-cy="mark-as-paid-button-submit"
      type="button"
      onClick={() => markAsPaid()}
    >
      Mark as
      {' '}
      {getStatus()}
    </button>
  );

  function getStatus() {
    const selectedCompensations = compensationsAllState.allSelectedCompensations;

    return selectedCompensations.some((item) => !item.isPaid)
      ? 'paid'
      : 'unpaid';
  }

  async function markAsPaid() {
    const selectedCompensations = compensationsAllState.allSelectedCompensations;

    if (selectedCompensations.length !== 0) {
      try {
        const compensationsIds = selectedCompensations.map((compensation) => compensation.employeeId);

        const status = selectedCompensations.some((item) => !item.isPaid)
          ? 'paid'
          : 'unpaid';

        await api.put(`${LINK_TO_SALARY_SERVICE}${LINK_TO_COMPENSATIONS_SERVICE}admin/update?status=${status}`, compensationsIds);

        compensationsAllState._isChange = true;
        compensationsIds.forEach((element) => compensationsAllState.setIsSelected(false, element));
        document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
          if (checkbox instanceof HTMLInputElement) {
            checkbox.checked = false;
          }
        });
        compensationsAllState._isChange = false;
      } catch (e) {
        console.log('MarkAsPaidButton ', e);
      }
    }
  }
}

export default observer(MarkAsPaidButton);
