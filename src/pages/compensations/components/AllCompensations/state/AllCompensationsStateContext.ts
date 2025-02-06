import { createContext } from 'react'
import { AllCompensationsState } from './AllCompensationsState'

export const AllCompensationsStateContext = createContext<AllCompensationsState>(null as unknown as AllCompensationsState)
