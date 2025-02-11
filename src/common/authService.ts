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
console.log(`authService: ${authService}`)

export async function setLogin(payload: any) {
  // eslint-disable-next-line no-console
  console.log(`payload: ${payload}`)
  const {
    data,
  } = await authService.loginCall(payload)

  authService.setLoggedIn(data)
}
