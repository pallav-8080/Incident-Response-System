import _ from 'lodash'

/**
 * Wrap fetch API by adding headers
 * multipart is required due to:
 * https://muffinman.io/uploading-files-using-fetch-multipart-form-data/
 */
const request = async <T = any>(
  url: RequestInfo,
  options?: RequestInit | undefined,
  multipart = false,
) => {
  const fetchOptions = _.merge(
    {
      headers: {
        'Content-Type': 'application/json',
        'x-application-token': localStorage.getItem('token'),
        'x-application-uid': localStorage.getItem('uid'),
      },
    },
    options,
  )

  if (multipart) {
    fetchOptions.headers['Content-Type'] = ''
  }

  return fetch(url, fetchOptions).then(async response => {
    const body = (await response.json()) as Promise<T>

    if (response.ok) {
      return body
    } else {
      // eslint-disable-next-line
      throw { status: response.status, ...body }
    }
  })
}

export default request
