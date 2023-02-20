export type PathString = `/${string}`

interface Paths {
  [i: string]: PathString
}

const paths: Paths = {
  home: '/',
}

export default paths
