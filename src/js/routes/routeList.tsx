const BASE_PATH = '/'
const buildPath = (path: string): string => `${BASE_PATH}${path}`
export const path = {
  home: buildPath(''),
  unitMapper: buildPath('test'),
  login: '/login',
  rick: '/rick',
  swap: '/swap',
  distortions: '/distortions',
  signup: '/signup',
  profile: '/profile'
};