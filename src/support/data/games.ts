import { ResponseGame as Game } from '../../types/apiData'

export const emptyGames: Game[] = []

export const allGames: Game[] = [
  {
    id: 32,
    user_id: 412,
    name: 'My Game 1',
    description: 'This is a game with a description',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 51,
    user_id: 412,
    name: 'My Game 2',
    description: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 77,
    user_id: 412,
    name: 'Game with a really really really really really long name',
    description:
      'Cum audissem Antiochum, Brute, ut solebam, cum M. Pisone in eo gymnasio, quod Ptolomaeum vocatur, unaque nobiscum Q. frater et T. Pomponius postmeridianam conficeremus in Academia',
    created_at: new Date(),
    updated_at: new Date(),
  },
]
