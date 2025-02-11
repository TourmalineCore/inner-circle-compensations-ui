import { Permission } from '../../routes/state/AccessBasedOnPemissionsState'

export function parseJwt(token: string): {
  permissions: Array<keyof typeof Permission>,
  corporateEmail: string,
} {
  // eslint-disable-next-line no-console
  console.log(`parse before: ${token}`)

  const base64Url = token.split(`.`)[1]
  const base64 = base64Url.replace(/-/g, `+`)
    .replace(/_/g, `/`)
  const jsonPayload = decodeURIComponent(window.atob(base64)
    .split(``)
    .map((c) => `%${(`00${c.charCodeAt(0)
      .toString(16)}`).slice(-2)}`)
    .join(``))

  // eslint-disable-next-line no-console
  console.log(`parse after: ${jsonPayload}`)

  return JSON.parse(jsonPayload)
}
