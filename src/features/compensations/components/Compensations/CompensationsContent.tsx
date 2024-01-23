import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import CompensationsFilter from './components/CompensationsFilter/CompensationsFilter';
import CompensationsTable from './components/CompensationsTable/CompensationsTable';
import { api } from '../../../../common/api';
import { LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';
import CompensationsStateContext from './state/CompensationsStateContext';

function CompensationsContent() {
  const compensationsState = useContext(CompensationsStateContext);

  useEffect(() => {
    loadCompensations();
  }, []);

  return (
    <section data-cy="compensations">
      <CompensationsFilter className="compensations__filter" />
      <CompensationsTable className="compensations__table" />
    </section>
  );

  async function loadCompensations() {
    try {
      const { data } = await api.get(`${LINK_TO_SALARY_SERVICE}compensations/all`);

      compensationsState.initialize({
        loadedCompensations: data,
      });
    } catch (e) {
      console.log('CompensationsContent ', e);
    }
  }
}

export default observer(CompensationsContent);
