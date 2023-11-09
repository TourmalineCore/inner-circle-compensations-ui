import { createContext } from 'react';
import CompensationsState from './CompensationsState';

const CompensationsStateContext = createContext<CompensationsState>(null as unknown as CompensationsState);

export default CompensationsStateContext;
