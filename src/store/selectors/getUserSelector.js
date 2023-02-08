export const getUserSelector = (store) => store.getUser.user || {}

export const userNameSelector = (store) => getUserSelector(store).name || 'Имя не указано'
export const userSinceSelector = (store) => getUserSelector(store).sells_from || ''
export const userAvatarSelector = (store) => getUserSelector(store).avatar || ''