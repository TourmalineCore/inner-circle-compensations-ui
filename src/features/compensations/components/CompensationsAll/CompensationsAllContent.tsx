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
  }, []);

  return (
    <section data-cy="compensations-all">
      <CompensationsAllActions />
      <CompensationsAllTable />
    </section>
  );

  async function loadCompensations() {
    try {
      const { data } = await api.get(`${LINK_TO_SALARY_SERVICE}//${LINK_TO_COMPENSATIONS_SERVICE}all`);

      compensationsAllState.initialize({
        loadedCompensations: data,
      });
    } catch (e) {
      console.log('CompensationsAllContent ', e);
    }
  }
}

export default observer(CompensationsAllContent);
