import FlashMessage from './flashMessage'

export default { title: 'FlashMessage' }

const messageString = 'You will be assimilated.'

const messageArray = [
  'You will be assimilated.',
  'Your biological and technological distinctiveness will be added to our own.',
  'Resistance is futile.',
]

export const SuccessWithStringMessage = () => (
  <FlashMessage type="success" message={messageString} hidden={false} />
)

export const SuccessWithStringMessageAndHeader = () => (
  <FlashMessage
    type="success"
    message={messageString}
    hidden={false}
    header="Success!"
  />
)

export const SuccessWithArrayMessage = () => (
  <FlashMessage type="success" message={messageArray} hidden={false} />
)

export const SuccessWithArrayMessageAndHeader = () => (
  <FlashMessage
    type="success"
    message={messageArray}
    hidden={false}
    header="Success!"
  />
)

export const InfoWithStringMessage = () => (
  <FlashMessage type="info" message={messageString} hidden={false} />
)

export const InfoWithStringMessageAndHeader = () => (
  <FlashMessage
    type="info"
    message={messageString}
    hidden={false}
    header="For Your Information:"
  />
)

export const InfoWithArrayMessage = () => (
  <FlashMessage type="info" message={messageArray} hidden={false} />
)

export const InfoWithArrayMessageAndHeader = () => (
  <FlashMessage
    type="info"
    message={messageArray}
    hidden={false}
    header="For Your Information:"
  />
)

export const WarningWithStringMessage = () => (
  <FlashMessage type="warning" message={messageString} hidden={false} />
)

export const WarningWithStringMessageAndHeader = () => (
  <FlashMessage
    type="warning"
    message={messageString}
    hidden={false}
    header="Warning:"
  />
)

export const WarningWithArrayMessage = () => (
  <FlashMessage type="warning" message={messageArray} hidden={false} />
)

export const WarningWithArrayMessageAndHeader = () => (
  <FlashMessage
    type="warning"
    message={messageArray}
    hidden={false}
    header="Warning:"
  />
)

export const ErrorWithStringMessage = () => (
  <FlashMessage type="error" message={messageString} hidden={false} />
)

export const ErrorWithStringMessageAndHeader = () => (
  <FlashMessage
    type="error"
    message={messageString}
    hidden={false}
    header="We are the Borg."
  />
)

export const ErrorWithArrayMessage = () => (
  <FlashMessage type="error" message={messageArray} hidden={false} />
)

export const ErrorWithArrayMessageAndHeader = () => (
  <FlashMessage
    type="error"
    message={messageArray}
    hidden={false}
    header="We are the Borg."
  />
)
