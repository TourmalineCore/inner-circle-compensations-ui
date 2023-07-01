import { createContext } from 'react';
import CreateCompensationsState from './CreateCompensationsState';

const CreateCompensationsStateContext = createContext<CreateCompensationsState>(null as unknown as CreateCompensationsState);

export default CreateCompensationsStateContext;
