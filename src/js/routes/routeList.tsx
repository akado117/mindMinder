const BASE_PATH = '/'
const buildPath = (path: string): string => `${BASE_PATH}${path}`
export const path = {
  home: buildPath(''),
  unitMapper: buildPath('test'),
  login: '/login',
  rick: '/rick',
  swap: '/swap',
  signup: '/signup',
  profile: '/profile'
};