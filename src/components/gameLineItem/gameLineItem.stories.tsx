import GameLineItem from './gameLineItem'

export default { title: 'GameLineItem' }

export const WithDescription = () => (
  <GameLineItem name='My Game 1' description='This is a custom description created by the user.' />
)

export const WithLongDescription = () => (
  <GameLineItem
    name='De finibus bonorum et malorum'
    description='Cum audissem Antiochum, Brute, ut solebam, cum M. Pisone in eo gymnasio, quod Ptolomaeum vocatur, unaque nobiscum Q. frater et T. Pomponius postmeridianam conficeremus in Academia'
  />
)

export const NoDescription = () => (
  <GameLineItem name='This game has a really really really really really long name for testing purposes' />
)