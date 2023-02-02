import { UserFull, UserSecure } from '../types'

export const parseSaveUser = (userData: UserFull): UserSecure => {
  return {
    id: userData.id,
    username: userData.username,
    email: userData.email
  }
}
