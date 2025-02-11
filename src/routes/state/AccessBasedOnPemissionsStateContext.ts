import { createContext } from 'react'
import AccessBasedOnPemissionsState from './AccessBasedOnPemissionsState'

const AccessBasedOnPemissionsStateContext = createContext<AccessBasedOnPemissionsState>(null as unknown as AccessBasedOnPemissionsState)

// eslint-disable-next-line import/no-default-export
export default AccessBasedOnPemissionsStateContext
