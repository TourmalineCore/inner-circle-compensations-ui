import { useMemo } from 'react';
import CompensationsCeoStateContext from './state/CompensationsCeoStateContext';
import CompensationsCeoState from './state/CompensationsCeoState';
import CompensationsCeoContent from './CompensationsCeoContent';

function CompensationsCeo() {
  const compensationsCeoState = useMemo(
    () => new CompensationsCeoState(),
    [],
  );

  return (
    <CompensationsCeoStateContext.Provider value={compensationsCeoState}>
      <CompensationsCeoContent />
    </CompensationsCeoStateContext.Provider>
  );
}

export default CompensationsCeo;
