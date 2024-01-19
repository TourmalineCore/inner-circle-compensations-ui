import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { api } from '../../../../common/api';
import AllCompensationsStateContext from './state/AllCompensationsStateContext';
import { LINK_TO_COMPENSATIONS_SERVICE, LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';
import { AllCompensationsContent } from './AllCompensationsContent';

const AllCompensationsContainer = () => {
  const allCompensationsState = useContext(AllCompensationsStateContext);

  useEffect(() => {
    loadCompensations();
  }, [allCompensationsState._dateCompensation]);

  useEffect(() => {
    loadCompensations();
  }, [allCompensationsState._isChange]);

  return (
    <AllCompensationsContent />
  );

  async function loadCompensations() {
    try {
      const dateCompensation = allCompensationsState._dateCompensation as Date;
      const month = dateCompensation.getMonth();
      const year = dateCompensation.getFullYear();

      const { data } = await api.get(`${LINK_TO_SALARY_SERVICE}//${LINK_TO_COMPENSATIONS_SERVICE}/admin/all?year=${year}&month=${month + 1}`);

      allCompensationsState.initialize({
        loadedCompensations: data,
      });
    } catch (e) {
      console.log('AllCompensationsContainer ', e);
    }
  }
};

const ObservedAllCompensationsContainer = observer(AllCompensationsContainer);

export {
  ObservedAllCompensationsContainer as AllCompensationsContainer,
};
