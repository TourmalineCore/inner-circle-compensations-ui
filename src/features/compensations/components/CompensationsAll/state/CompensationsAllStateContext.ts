import { createContext } from 'react';
import CompensationsAllState from './CompensationsAllState';

const CompensationsAllStateContext = createContext<CompensationsAllState>(null as unknown as CompensationsAllState);

export default CompensationsAllStateContext;
