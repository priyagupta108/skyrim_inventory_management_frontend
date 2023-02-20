export type PathString = `/${string}`

interface Paths {
  [i: string]: PathString
}

const paths: Paths = {
  home: '/',
  login: '/login'
}

export default paths
