import { createAuthService } from '@tourmalinecore/react-tc-auth'
import { API_ROOT_AUTH } from './config/config'

export const authService = createAuthService({
  authApiRoot: API_ROOT_AUTH,
  authType: `ls`,
  tokenAccessor: `accessToken`,
  refreshTokenAccessor: `refreshToken`,
  tokenValueAccessor: `value`,
  tokenExpireAccessor: `expiresInUtc`,
})
// eslint-disable-next-line no-console
console.log(`authService1: ${JSON.stringify(authService, null, 2)}`)
// eslint-disable-next-line no-console
console.log(`authService2:`, authService)
