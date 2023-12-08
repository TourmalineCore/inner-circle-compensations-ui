import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import CompensationsCeoActions from './components/CompensationsCeoActions/CompensationsCeoActions';
import CompensationsCeoTable from './components/CompensationsCeoTable/CompensationsCeoTable';
import { api } from '../../../../common/api';
import { LINK_TO_COMPENSATIONS_SERVICE, LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';
import CompensationsCeoStateContext from './state/CompensationsCeoStateContext';

function CompensationsCeoContent() {
  const compensationsCeoState = useContext(CompensationsCeoStateContext);

  useEffect(() => {
    loadCompensations();
  }, []);

  return (
    <section data-cy="compensations-ceo">
      <CompensationsCeoActions />
      <CompensationsCeoTable />
    </section>
  );

  async function loadCompensations() {
    try {
      const { data } = await api.get(`${LINK_TO_SALARY_SERVICE}//${LINK_TO_COMPENSATIONS_SERVICE}all`);

      compensationsCeoState.initialize({
        loadedCompensations: data,
      });
    } catch (e) {
      console.log('CompensationsCeoContent ', e);
    }
  }
}

export default observer(CompensationsCeoContent);
