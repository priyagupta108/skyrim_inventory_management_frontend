import { type MouseEventHandler } from 'react'
import GoogleSignInButton from './googleSignInButton'

const onClick: MouseEventHandler = e => e.preventDefault()

export default { title: 'GoogleSignInButton' }

export const Default = () => <GoogleSignInButton onClick={onClick} />