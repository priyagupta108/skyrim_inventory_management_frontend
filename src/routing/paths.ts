import { type RelativePath } from '../types/navigation'

interface Paths {
  home: RelativePath
  login: RelativePath
  dashboard: {
    [i: string]: RelativePath
  }
}

const paths: Paths = {
  home: '/',
  login: '/login',
  dashboard: {
    main: '/dashboard',
    games: '/games'
  },
}

export default paths
