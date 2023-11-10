import { createContext } from 'react';
import CompensationsCeoState from './CompensationsCeoState';

const CompensationsCeoStateContext = createContext<CompensationsCeoState>(null as unknown as CompensationsCeoState);

export default CompensationsCeoStateContext;
