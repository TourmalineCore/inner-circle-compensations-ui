import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import CompensationsAllActions from './components/CompensationsAllActions/CompensationsAllActions';
import CompensationsAllTable from './components/CompensationsAllTable/CompensationsAllTable';
import { api } from '../../../../common/api';
import { LINK_TO_COMPENSATIONS_SERVICE, LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';
import CompensationsAllStateContext from './state/CompensationsAllStateContext';

function CompensationsAllContent() {
  const compensationsAllState = useContext(CompensationsAllStateContext);

  useEffect(() => {
    loadCompensations();
  }, [compensationsAllState._dateCompensation]);

  return (
    <section data-cy="compensations-all">
      <CompensationsAllActions />
      <CompensationsAllTable />
    </section>
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
      console.log('CompensationsAllContent ', e);
    }
  }
}

export default observer(CompensationsAllContent);
