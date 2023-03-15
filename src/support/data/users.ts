import { User } from 'firebase/auth'
import testProfileImg from '../testProfileImg.png'

export const testUser = {
  uid: 'edna',
  displayName: 'Edna St. Vincent Millay',
  email: 'edna@gmail.com',
  photoURL: testProfileImg,
  emailVerified: true,
  getIdtoken: () =>
    new Promise<string>((resolve, _reject) => resolve('xxxxxxx')),
} as unknown as User
