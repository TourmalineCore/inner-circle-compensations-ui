import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { api } from '../../../../common/api';
import { LINK_TO_COMPENSATIONS_SERVICE, LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';
import { AllCompensationsContent } from './AllCompensationsContent';
import { AllCompensationsStateContext } from './state/AllCompensationsStateContext';

export const AllCompensationsContainer = observer(() => {
  const allCompensationsState = useContext(AllCompensationsStateContext);

  useEffect(() => {
    loadCompensations();
  }, [allCompensationsState.isChange, allCompensationsState.selectedDate]);

  return (
    <AllCompensationsContent />
  );

  async function loadCompensations() {
    const dateCompensation = allCompensationsState.monthYearDate;

    const {
      data,
    } = await api.get(`${LINK_TO_SALARY_SERVICE}//${LINK_TO_COMPENSATIONS_SERVICE}/admin/all?year=${dateCompensation.year}&month=${dateCompensation.month}`);

    allCompensationsState.initialize({
      loadedCompensations: data,
    });
  }
});
