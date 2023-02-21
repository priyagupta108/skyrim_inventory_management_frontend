import { type RelativePath } from '../types/navigation'

interface Paths {
  [i: string]: RelativePath
}

const paths: Paths = {
  home: '/',
  login: '/login',
}

export default paths
