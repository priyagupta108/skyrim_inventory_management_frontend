import { type ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { type RelativePath } from '../../types/navigation'
import { useColorScheme } from '../../hooks/contexts'
import styles from './navigationCard.module.css'

interface NavigationCardProps {
  href: RelativePath
  children: ReactElement | ReactElement[] | string
}

const NavigationCard = ({ href, children }: NavigationCardProps) => {
  const { schemeColorDarkest, hoverColorDark, textColorPrimary } =
    useColorScheme()

  const styleVars = {
    '--background-color': schemeColorDarkest,
    '--hover-color': hoverColorDark,
    '--text-color': textColorPrimary,
  } as React.CSSProperties

  return (
    <Link className={styles.root} to={href} style={styleVars}>
      {children}
    </Link>
  )
}

export default NavigationCard
