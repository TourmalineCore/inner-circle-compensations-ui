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
  }, [allCompensationsState.dateCompensation]);

  useEffect(() => {
    loadCompensations();
  }, [allCompensationsState.isChange]);

  return (
    <AllCompensationsContent />
  );

  async function loadCompensations() {
    const dateCompensation = allCompensationsState.dateCompensation as Date;
    const month = dateCompensation.getMonth();
    const year = dateCompensation.getFullYear();

    const {
      data,
    } = await api.get(`${LINK_TO_SALARY_SERVICE}//${LINK_TO_COMPENSATIONS_SERVICE}/admin/all?year=${year}&month=${month + 1}`);

    allCompensationsState.initialize({
      loadedCompensations: data,
    });

    allCompensationsState.updateStatus(!allCompensationsState.isChange);
  }
});
