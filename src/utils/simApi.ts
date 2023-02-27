import { InternalServerError, UnprocessableEntityError } from './apiErrors'

const baseUri: string =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://sim-api.danascheider.com'

export const identifyUser = (userData: object) => {
  const uri = `${baseUri}/identify_user`

  return fetch(uri, { method: 'POST', body: JSON.stringify(userData) }).then(
    (res) => {
      if (res.status === 201 || res.status === 204) return

      res.json().then((json) => {
        const errorMessage: string | undefined = Array.isArray(json.errors)
          ? json.errors.join(', ')
          : json.errors

        if (res.status === 422) throw new UnprocessableEntityError(errorMessage)
        if (res.status === 500) throw new InternalServerError(errorMessage)
      })
    }
  )
}
