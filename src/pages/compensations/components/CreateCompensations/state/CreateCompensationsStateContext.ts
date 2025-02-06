import { createContext } from 'react'
import { CreateCompensationsState } from './CreateCompensationsState'

export const CreateCompensationsStateContext = createContext<CreateCompensationsState>(null as unknown as CreateCompensationsState)
