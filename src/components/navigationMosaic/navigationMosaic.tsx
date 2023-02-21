import { type NavigationMosaicProps } from './types'
import { ColorProvider } from '../../contexts/colorContext'
import NavigationCard from '../navigationCard/navigationCard'
import styles from './navigationMosaic.module.css'

const NavigationMosaic = ({ cardArray }: NavigationMosaicProps) => (
  <div className={styles.root}>
    {cardArray.map(({ colorScheme, href, children, key }) => (
      <div key={key} className={styles.card}>
        <ColorProvider colorScheme={colorScheme}>
          <NavigationCard href={href}>
            {children}
          </NavigationCard>
        </ColorProvider>
      </div>
    ))}
  </div>
)

export default NavigationMosaic