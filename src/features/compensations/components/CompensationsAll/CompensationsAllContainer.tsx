import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { api } from '../../../../common/api';
import CompensationsAllStateContext from './state/CompensationsAllStateContext';
import { LINK_TO_COMPENSATIONS_SERVICE, LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';
import CompensationsAllContent from './CompensationsAllContent';

function CompensationsAllContainer() {
  const compensationsAllState = useContext(CompensationsAllStateContext);

  useEffect(() => {
    loadCompensations();
  }, [compensationsAllState._dateCompensation]);

  useEffect(() => {
    loadCompensations();
  }, [compensationsAllState._isChange]);

  return (
    <CompensationsAllContent />
  );

  async function loadCompensations() {
    try {
      const dateCompensation = compensationsAllState._dateCompensation as Date;
      const month = dateCompensation.getMonth();
      const year = dateCompensation.getFullYear();

      const { data } = await api.get(`${LINK_TO_SALARY_SERVICE}//${LINK_TO_COMPENSATIONS_SERVICE}/admin/all?year=${year}&month=${month + 1}`);

      compensationsAllState.initialize({
        loadedCompensations: data,
      });
    } catch (e) {
      console.log('CompensationsAllContainer ', e);
    }
  }
}

export default observer(CompensationsAllContainer);
