import { createContext } from 'react'
import { CompensationsState } from './CompensationsState'

export const CompensationsStateContext = createContext<CompensationsState>(null as unknown as CompensationsState)
