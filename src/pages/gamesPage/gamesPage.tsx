import { useState, useEffect, type CSSProperties } from 'react'
import { PulseLoader } from 'react-spinners'
import { type ResponseGame as Game } from '../../types/apiData'
import { DONE, LOADING, ERROR } from '../../utils/loadingStates'
import { YELLOW } from '../../utils/colorSchemes'
import { useGamesContext, useGoogleLogin } from '../../hooks/contexts'
import DashboardLayout from '../../layouts/dashboardLayout/dashboardLayout'
import GameCreateForm from '../../components/gameCreateForm/gameCreateForm'
import GameLineItem from '../../components/gameLineItem/gameLineItem'

const loaderStyles: CSSProperties = {
  textAlign: 'center',
}

const GamesPage = () => {
  const { authLoading } = useGoogleLogin()
  const { games, gamesLoadingState } = useGamesContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(authLoading || gamesLoadingState === LOADING)
  }, [authLoading, gamesLoadingState])

  return (
    <DashboardLayout title="Your Games">
      <div>
        {loading && (
          <PulseLoader
            color={YELLOW.schemeColorDark}
            cssOverride={loaderStyles}
            data-testid="pulseLoader"
          />
        )}
        {gamesLoadingState === DONE && (
          <GameCreateForm
            disabled={
              gamesLoadingState === LOADING || gamesLoadingState === ERROR
            }
          />
        )}
        {games.length > 0 && gamesLoadingState === DONE && (
          <>
            {games.map(({ id, name, description }: Game) => (
              <GameLineItem
                key={id}
                gameId={id}
                name={name}
                description={description}
              />
            ))}
          </>
        )}
      </div>
    </DashboardLayout>
  )
}

export default GamesPage
