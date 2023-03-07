import { useState, useEffect, type CSSProperties } from 'react'
import { PulseLoader } from 'react-spinners'
import { type Game } from '../../types/games'
import { DONE, LOADING } from '../../utils/loadingStates'
import { YELLOW } from '../../utils/colorSchemes'
import { useGamesContext, useGoogleLogin } from '../../hooks/contexts'
import DashboardLayout from '../../layouts/dashboardLayout/dashboardLayout'
import GameLineItem from '../../components/gameLineItem/gameLineItem'

const loaderStyles: CSSProperties = {
  textAlign: 'center'
}

const GamesPage = () => {
  const { authLoading, requireLogin } = useGoogleLogin()
  const { games, gamesLoadingState } = useGamesContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    requireLogin()
  }, [requireLogin])

  useEffect(() => {
    setLoading(authLoading || gamesLoadingState === LOADING)
  }, [authLoading, gamesLoadingState])

  return (
    <DashboardLayout title='Your Games'>
      <div>
        {loading && <PulseLoader color={YELLOW.schemeColorDark} cssOverride={loaderStyles} data-testid='pulseLoader' />}
        {games.length === 0 && gamesLoadingState === DONE && <p>You have no games.</p>}
        {games.length > 0 && gamesLoadingState === DONE && <>
          {games.map(({ id, name, description }: Game) => <GameLineItem key={id} name={name} description={description} />)}
        </>}
      </div>
    </DashboardLayout>
  )
}

export default GamesPage