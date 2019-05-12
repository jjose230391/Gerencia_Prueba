export const UrlBase = 'http://localhost:808/artsoler/'
export const Urlmain = 'http://slim.php/'
export const userUrl = 'http://localhost/restapi2/v1/index.php/'

export const getHeader = function () {
  if (JSON.parse(window.localStorage.getItem('authUser') !== null)) {
    let authUser = JSON.parse(window.localStorage.getItem('authUser'))
    const tokenData = authUser.access_token
    const headers = {
      'token': tokenData,
      'Content-Type': 'application/json'
    }
    return headers
  }
}

export const getToken = function () {
  if (JSON.parse(window.localStorage.getItem('authUser') !== null)) {
    let authUser = JSON.parse(window.localStorage.getItem('authUser'))
    const tokenData = authUser.access_token
    const headers = {
      'token': tokenData
    }
    return headers
  }
}

export const getAuth = function () {
  const content = 'application/x-www-form-urlencoded'
  const headers = {
    'Authorization': '3d524a53c110e4c22463b10ed32cef9d',
    'Content-Type': content
  }
  return headers
}
